////Author:Pedro Martins
////Contact:ace.wf.home@gmail.com
////Date: 05/05/2015
////Company:euro-m.pt
///////////// GLOBAL POSITION SYSTEM ////////////////////
/////////////// INIT TOOLS //////////////////
////////////////////////////////////////
define(function() {
	var StackManage = [];
	var totemIsRunning = false;
	var ToolQuery = null;
	var tempInsta = null;

	var staticFunc = function(event){
		tempInsta.isTheEnd(event);
	}

	function AppEngine(ToolQueryItem){
		var instance = this;
		tempInsta = this;
		ToolQuery = ToolQueryItem;
		instance.boxIndex = null;
		instance.totalElem = null;
		instance.gotoInit = false;
		instance.diferenca = 0;
		instance.lastOffsetY = 0;
		instance.directionY = 0;
		instance.LastdirectionY = 0;
		instance.scrolledItemID = 0;
		instance.totem = null;
		this.screenAreas = [];
		this.view = null;
		this.groupBy = {};

		this.applyView = function(value){
			instance.view = value;
		}

		this.updateTotalElem = function(value){
			instance.totalElem = value;
		}
		this.updateBoxIndex = function(value){
			instance.boxIndex = value;
		}
		/*
		this.orderElementsByDistance = function(value){
			console.log(value);
		}
		*/
		this.groupBy.lado = ['left','middle','middle-right','right'];
		this.groupBy.back = ['go-back-right','go-back-left','rotate-right','rotate-left','rotate-down','rotate-right-special','rotate-back-left-special'];
		this.groupBy.rotacao = ['rotate-right','rotate-left','rotate-down','go-back-right','go-back-left'];
	};

	AppEngine.prototype.addScreensArea = function(objScreen){
		this.screenAreas.push(objScreen);
	}

	AppEngine.prototype.nextTweenPoints = function(square,totem,goDownDirection){
		'use strict';
		var rectElement = square.getBoundingClientRect();
		var leftBox = rectElement.left-this.view.getBoundingClientRect().left;
		var tweenClass = this.manageNextPositionSystem(leftBox,square,rectElement,goDownDirection);
		var topMove = rectElement.top;
		tweenClass.push({value:topMove,prop:'top',index:this.boxIndex[square.id].index});
		return {totem:this.totem,tween:tweenClass,element:square};
	};
	AppEngine.prototype.manageNextPositionSystem = function(leftBox,square,rectElement,goDownDirection){
		'use strict';
		var rElement;
		var tweenClass = [];
		var rectNextElement;
		var actualElement = square.getBoundingClientRect();
		if (goDownDirection) {
			rElement = ToolQuery.getNextElement('piece-block',square);
		} else {
			rElement = ToolQuery.getPrevElement('piece-block',square);
		}
		if (rElement===null) {
			if (!goDownDirection) {
				tweenClass.push({style:'left',prop:'side'});
				tweenClass.push({style:'go-back-left',prop:'transform'});
			} else {
				tweenClass.push({style:'middle',prop:'side'});
				tweenClass.push({style:'rotate-down',prop:'transform'});
			}
			
			return tweenClass;
		}
		rectNextElement = rElement.getBoundingClientRect();
			
		if ((!goDownDirection) && (rectNextElement.top<actualElement.top) ) {
			if (actualElement.left<rectNextElement.left) {
				tweenClass.push({style:'go-back-right',prop:'side'});
			} else {
				tweenClass.push({style:'go-back-left',prop:'side'});
			}
		} else if (rElement) {
			if (actualElement.left<rectNextElement.left) {
				tweenClass.push({style:'rotate-right',prop:'transform'});
			} else if ((actualElement.left>rectNextElement.left)) {
				tweenClass.push({style:'rotate-left',prop:'transform'});
			} else if (actualElement.top<rectNextElement.top) {
				tweenClass.push({style:'rotate-down',prop:'transform'});
			}
		}
		/////////////////  CHECK FOR POSITION //////////////
		if (leftBox<100) {
			tweenClass.push({style:'left',prop:'side'});
		} else if (leftBox>200) {
			tweenClass.push({style:'right',prop:'side'});
		} else if(square.getBoundingClientRect().width>200){
			tweenClass.push({style:'right',prop:'side'});
		} else {
			tweenClass.push({style:'middle',prop:'side'});
		}
		return tweenClass;
	};
	////////////////////////////////////  TRANSITION LISTNERS ////////////////////////////////////
	AppEngine.prototype.TweenEnd = function(){
		'use strict';
		var instance = this;
		var target = event.target;
		instance.scrolledItemID = target.getAttribute('target-index');
		totemIsRunning = false;
		var step = StackManage[0];
		var box = step.box;
		var INFO_CHILDS = $(box).find('.info-game');
		if(INFO_CHILDS.length>0){
			var elementChild = INFO_CHILDS[0];
			if ($(elementChild).hasClass('show-up')) {
				instance.shakeElement(elementChild);
			}
		}
		instance.removeStep(false);
	}
	AppEngine.prototype.isTheEnd = function(event){
		'use strict';
		var instance = this;
		var target = event.target;
		if (StackManage.length>0) {
			if (StackManage[0].totalTransition>0) {
				StackManage[0].totalTransition--;
			};				
			if (StackManage[0].totalTransition===0) {
				target.removeEventListener('transitionend',staticFunc);
				instance.TweenEnd(event);
			}
		} 	
	}
	////////////////////////////////////////////////////////////////////////
	AppEngine.prototype.checkDiference = function(boxsquare){
		'use strict';
		var instance = this;
		var index = this.boxIndex[boxsquare.id].index;
		var diferenca = index-instance.scrolledItemID;
		return diferenca;
	};
	AppEngine.prototype.AddOrCheckSteps = function(boxsquare,element){
		'use strict';
		var instance = this;
		this.checkStepsToAdd(boxsquare,element);
	};
	AppEngine.prototype.checkStepsToAdd  = function(boxsquare,element){
		'use strict';
		var instance = this;
		var tempIndexId;
		var square;
		//StackManage = [];
		var enterZone = false;
		var diferenca= instance.checkDiference(boxsquare);
		
		if ((instance.diferenca<0) && (diferenca>0)) {
			enterZone = true;
		} else if ((instance.diferenca>0) && (diferenca<0)) {
			enterZone = true;
		} 
		//if (AppEngine.LastdirectionY!==AppEngine.directionY) {
		if (enterZone) {
			StackManage = [];
			totemIsRunning = false;
			instance.scrolledItemID = element.getAttribute('target-index');
			if (instance.scrolledItemID===null) {
				instance.scrolledItemID = 0;
			}
		}
		if (diferenca===0) {
			return;
		}
		var i = 0;
		var item;
		var StepDif;
		tempIndexId = parseFloat(instance.scrolledItemID);
		if (diferenca>=1) {
			if((instance.boxIndex[boxsquare.id].index-tempIndexId)>8){
				StackManage = [];
				totemIsRunning = false;
				tempIndexId = instance.boxIndex[boxsquare.id].index-8;
			}
			for (i = tempIndexId+1; i <= instance.boxIndex[boxsquare.id].index; i++) {
				square = instance.totalElem[i];
				item = instance.nextTweenPoints(square,element,true);
				instance.addStep(element,item.tween,item.element);
			}
		} else if (diferenca<0) {
			if(diferenca<-8){
				StackManage = [];
				totemIsRunning = false;
				tempIndexId = instance.boxIndex[boxsquare.id].index+8;
			}
			for (i = tempIndexId-1; i >= instance.boxIndex[boxsquare.id].index; i--) {
				square = instance.totalElem[i];
				item = instance.nextTweenPoints(square,element,false);
				instance.addStep(element,item.tween,item.element);
			}
		}
		instance.diferenca = diferenca;
		if ((StepDif>1) || (StepDif<-1) ) {
			return;
		}
		if (StackManage.length>3) {
			var m = StackManage;
		};
		if (!totemIsRunning) {
			instance.stepManager();
		}
	};
	AppEngine.prototype.addStep = function(element,tweens,boxsquare){
		'use strict';
		var exist = false;
		var NR_EXIST = null;
		if (StackManage.length>0) {	
			for (var i = 0; i < StackManage.length; i++) {
				if (StackManage[i]===undefined) {
					return null;
				}
				if (StackManage[i].box===boxsquare) {
					exist = true;
					NR_EXIST = i;
					break;
				}
			}
			if (element.getAttribute('target-id')!==boxsquare.id) {
				if (!exist) {
					//console.log('Push',boxsquare.id);
					StackManage.push({element:element,tweens:tweens,box:boxsquare,counter:0,totalTransition:0});
				}
			}
		} else {
			if (element.getAttribute('target-id')!==boxsquare.id) {	
				StackManage.push({element:element,tweens:tweens,box:boxsquare,counter:0,totalTransition:0});
			}
		}
	};

	AppEngine.prototype.evaluateRotation = function(element){
		'use strict';
		var st = window.getComputedStyle(element, null);
		var tr = st.getPropertyValue('-webkit-transform') ||
	   	st.getPropertyValue('-moz-transform') ||
	   	st.getPropertyValue('-ms-transform') ||
	   	st.getPropertyValue('-o-transform') ||
	   	st.getPropertyValue('transform');

	    var values = tr.split('(')[1];
	    values = values.split(')')[0];
	    values = values.split(',');
		var b = values[1];
		var angle = Math.round(Math.asin(b) * (180/Math.PI));	

		return angle;
	};

	AppEngine.prototype.stepManager = function(){
		'use strict';
		var instance = this;
		if((StackManage.length>0)){
			var tweens = StackManage[0].tweens;
			var element = StackManage[0].element;
			var box = StackManage[0].box;
			var angle = 0;
			StackManage[0].totalTransition = 0;
			
			
			for (var i = 0; i < tweens.length; i++) {	
				if (tweens[i].style) {
					if (!($(element).hasClass(tweens[i].style))) {
						if ((tweens[i].style==='rotate-right')){
							if ((tweens[i].style==='rotate-right') && ($(element).hasClass('go-back-left'))) {
									$(element).removeClass('go-back-left');
									element.style.transition = 'initial';
									$(element).addClass('go-back-right');
									angle = instance.evaluateRotation(element);
									element.style.removeProperty('transition');
							}
						}
						if ((tweens[i].style==='go-back-left')){
							if ((tweens[i].style==='go-back-left') && ($(element).hasClass('go-back-right'))) {
									$(element).removeClass('go-back-right');
									element.style.transition = 'initial';
									$(element).addClass('rotate-back-left-special');
									angle = instance.evaluateRotation(element);
									element.style.removeProperty('transition');
							}
							if ((tweens[i].style==='go-back-left') && ($(element).hasClass('rotate-right'))) {
								$(element).removeClass('rotate-right');
								element.style.transition = 'initial';
								$(element).addClass('rotate-right-special');
								angle = instance.evaluateRotation(element);
								element.style.removeProperty('transition');
							}
						}
						$(element).addClass(tweens[i].style);
						StackManage[0].totalTransition++;
						
						if ((tweens[i].style==='rotate-right') || (tweens[i].style==='rotate-left') || (tweens[i].style==='rotate-down')) {
							instance.removeByGroup('rotacao',tweens[i].style);
						} else if ((tweens[i].style==='go-back-right') || (tweens[i].style==='go-back-left')) {
							instance.removeByGroup('back',tweens[i].style);
						} else {
							instance.removeByGroup('lado',tweens[i].style);
						}
					}			
				} else {
					var yGo = box.offsetTop+10+'px';
					if (element.style.top!==yGo) {
						element.style.top = yGo;
						StackManage[0].totalTransition++;
					}				
				}			
			}
			element.addEventListener('transitionend',staticFunc);
			element.setAttribute('target-id',box.id);
			element.setAttribute('target-index',instance.boxIndex[box.id].index);
			var INFO_CHILDS = $(box).find('.info-game');
			if(INFO_CHILDS.length>0){
				var elementChild = INFO_CHILDS[0];
				if (!($(elementChild).hasClass('show-up'))) {
					$(elementChild).addClass('show-up');
				}
			}
			totemIsRunning = true;
			instance.scrolledItemID = instance.boxIndex[box.id].index;
		} else {
			if (instance.gotoInit) {
				instance.totem.style.top = '-35px';
				instance.removeAllClass();
				$(instance.totem).addClass('left');
				$(instance.totem).addClass('rotate-down');
				instance.scrolledItemID = 0;
				instance.totem.removeAttribute('target-id');
				instance.totem.removeAttribute('target-index');
				totemIsRunning = false;
				StackManage = [];
			}
		}
	};
	AppEngine.prototype.removeStep = function(){
		'use strict';
		var instance = this;
		if(StackManage.length>0){
			StackManage.shift();
			instance.stepManager();
		}
	};

	AppEngine.prototype.orderElementsByDistance = function(heightView){
		'use strict';
		var instance = this;
		var tempOrder = [];
		var HalfView = heightView/2;
		for (var i = this.screenAreas.length - 1; i >= 0; i--) {
			var valueArea = this.screenAreas[i].class.substring(1,this.screenAreas[i].class.length);
			var element = document.getElementsByClassName(valueArea);
			var rect = element[0].getBoundingClientRect();
			var spreadVal = (rect.top+(rect.height/2)-HalfView)-20;
			tempOrder.push({order:i,spread:spreadVal,topIndex:Math.sqrt(spreadVal*spreadVal),element:element[0],name:valueArea});
		}
		return tempOrder;
	};

	AppEngine.prototype.removeByGroup = function(group,style){
		'use strict';
		var instance = this;
		for (var i = 0; i < instance.groupBy[group].length; i++) {
			if (style!==instance.groupBy[group][i]) {
				$(instance.totem).removeClass(instance.groupBy[group][i]);
			}
		}
	};

	AppEngine.prototype.removeAllClass = function(){
		'use strict';
		console.log('----',this.totem);
		$(this.totem).removeClass('left');
		$(this.totem).removeClass('rotate-down');
		$(this.totem).removeClass('go-back-left');
		$(this.totem).removeClass('go-back-right');

	};

	AppEngine.prototype.shakeElement = function(element){
		'use strict';
		var instance = this;
		var repeatCount = 5;
		var child = $(element).find('img')[0];
		instance.Keepshake(child,repeatCount);
	};
	AppEngine.prototype.Keepshake = function(child,times){
		'use strict';
		var instance = this;
		var xGo = 10;
		if (child.style.left==='10px') {
			xGo = -3;
		}
		if (times>0) {
			times--;
			TweenMax.to(child,0.1,{left:xGo, ease:'Bounce',onComplete:instance.Keepshake,onCompleteParams:[child,times]});
		} else {
			TweenMax.to(child,0.1,{left:0, ease:'Bounce'});
		}	
	};	

	return AppEngine;
});
