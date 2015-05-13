////Author:Pedro Martins
////Contact:ace.wf.home@gmail.com
////Date: 05/05/2015
////Company:euro-m.pt
///////////// GLOBAL POSITION SYSTEM ////////////////////
/////////////// INIT TOOLS //////////////////
var com = (com)?com=com:null;
////////////////////////////////////////
var AppEngine = function(){
	var instance = this;
};
var StackManage = [];
var totemIsRunning = false;

AppEngine.groupBy = {};	
AppEngine.groupBy.lado = ['left','middle','middle-right','right'];
AppEngine.groupBy.back = ['go-back-right','go-back-left','rotate-right','rotate-left','rotate-down','rotate-right-special','rotate-back-left-special'];
AppEngine.groupBy.rotacao = ['rotate-right','rotate-left','rotate-down','go-back-right','go-back-left'];

AppEngine.nextTweenPoints = function(square,totem,goDownDirection){
	'use strict';
	var rectElement = square.getBoundingClientRect();
	var leftBox = rectElement.left-view.getBoundingClientRect().left;
	var tweenClass = AppEngine.manageNextPositionSystem(leftBox,square,rectElement,goDownDirection);
	var topMove = rectElement.top;
	tweenClass.push({value:topMove,prop:'top',index:boxIndex[square.id].index});
	return {totem:totem,tween:tweenClass,element:square};
};
AppEngine.manageNextPositionSystem = function(leftBox,square,rectElement,goDownDirection){
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
AppEngine.TweenTransition = {};
AppEngine.TweenTransition.end = function(event){
	'use strict';
	var target = event.target;
	AppEngine.scrolledItemID = target.getAttribute('target-index');
	totemIsRunning = false;
	var step = StackManage[0];
	var box = step.box;
	var INFO_CHILDS = $(box).find('.info');
	if(INFO_CHILDS.length>0){
		var elementChild = INFO_CHILDS[0];
		if ($(elementChild).hasClass('apper')) {
			AppEngine.shakeElement(elementChild);
		}
	}
	AppEngine.removeStep(false);
};
AppEngine.TweenTransition.isTheEnd = function(event){
	'use strict';
	var target = event.target;
	if (StackManage.length>0) {
		StackManage[0].totalTransition--;
		if (StackManage[0].totalTransition===0) {
			target.removeEventListener('transitionend',AppEngine.TweenTransition.isTheEnd);
			AppEngine.TweenTransition.end(event);
		}
	} else {

	}		
};
////////////////////////////////////////////////////////////////////////
AppEngine.checkDiference = function(boxsquare){
	'use strict';
	var index = boxIndex[boxsquare.id].index;
	var diferenca = index-AppEngine.scrolledItemID;
	return diferenca;
};
AppEngine.AddOrCheckSteps = function(boxsquare,element){
	'use strict';
	AppEngine.checkStepsToAdd(boxsquare,element);
};
AppEngine.checkStepsToAdd  = function(boxsquare,element){
	'use strict';
	var tempIndexId;
	var square;
	//StackManage = [];
	var enterZone = false;
	var diferenca= AppEngine.checkDiference(boxsquare);
	
	if ((AppEngine.diferenca<0) && (diferenca>0)) {
		enterZone = true;
	} else if ((AppEngine.diferenca>0) && (diferenca<0)) {
		enterZone = true;
	} 
	//if (AppEngine.LastdirectionY!==AppEngine.directionY) {
	if (enterZone) {
		StackManage = [];
		totemIsRunning = false;
		AppEngine.scrolledItemID = element.getAttribute('target-index');
		if (AppEngine.scrolledItemID===null) {
			AppEngine.scrolledItemID = 0;
		}
	}
	if (diferenca===0) {
		return;
	}
	var i = 0;
	var item;
	var StepDif;
	tempIndexId = parseFloat(AppEngine.scrolledItemID);
	if (diferenca>=1) {
		if((boxIndex[boxsquare.id].index-tempIndexId)>8){
			StackManage = [];
			totemIsRunning = false;
			tempIndexId = boxIndex[boxsquare.id].index-8;
		}
		for (i = tempIndexId+1; i <= boxIndex[boxsquare.id].index; i++) {
			square = totalElem[i];
			item = AppEngine.nextTweenPoints(square,element,true);
			AppEngine.addStep(element,item.tween,item.element);
		}
	} else if (diferenca<0) {
		if(diferenca<-8){
			StackManage = [];
			totemIsRunning = false;
			tempIndexId = boxIndex[boxsquare.id].index+8;
		}
		for (i = tempIndexId-1; i >= boxIndex[boxsquare.id].index; i--) {
			square = totalElem[i];
			item = AppEngine.nextTweenPoints(square,element,false);
			AppEngine.addStep(element,item.tween,item.element);
		}
	}
	AppEngine.diferenca = diferenca;
	if ((StepDif>1) || (StepDif<-1) ) {
		return;
	}
	if (!totemIsRunning) {
		AppEngine.stepManager();
	}
};
AppEngine.addStep = function(element,tweens,boxsquare){
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

AppEngine.evaluateRotation = function(element){
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
    //var a = values[0]; // 0.866025
	var b = values[1]; // 0.5
	//var c = values[2]; // -0.5
	//var d = values[3]; // 0.866025
	var angle = Math.round(Math.asin(b) * (180/Math.PI));	

	return angle;
};

AppEngine.stepManager = function(){
	'use strict';
	if((StackManage.length>0)){
		var tweens = StackManage[0].tweens;
		var element = StackManage[0].element;
		var box = StackManage[0].box;
		var angle = 0;
		StackManage[0].totalTransition = 0;
		element.addEventListener('transitionend',AppEngine.TweenTransition.isTheEnd);
		
		for (var i = 0; i < tweens.length; i++) {	
			if (tweens[i].style) {
				if (!($(element).hasClass(tweens[i].style))) {
					if ((tweens[i].style==='rotate-right')){
						if ((tweens[i].style==='rotate-right') && ($(element).hasClass('go-back-left'))) {
								$(element).removeClass('go-back-left');
								element.style.transition = 'initial';
								$(element).addClass('go-back-right');
								angle = AppEngine.evaluateRotation(element);
								element.style.removeProperty('transition');
						}
					}
					if ((tweens[i].style==='go-back-left')){
						if ((tweens[i].style==='go-back-left') && ($(element).hasClass('go-back-right'))) {
								$(element).removeClass('go-back-right');
								element.style.transition = 'initial';
								$(element).addClass('rotate-back-left-special');
								angle = AppEngine.evaluateRotation(element);
								element.style.removeProperty('transition');
						}
						if ((tweens[i].style==='go-back-left') && ($(element).hasClass('rotate-right'))) {
							$(element).removeClass('rotate-right');
							element.style.transition = 'initial';
							$(element).addClass('rotate-right-special');
							angle = AppEngine.evaluateRotation(element);
							element.style.removeProperty('transition');
						}
					}
					$(element).addClass(tweens[i].style);
					StackManage[0].totalTransition++;
					
					if ((tweens[i].style==='rotate-right') || (tweens[i].style==='rotate-left') || (tweens[i].style==='rotate-down')) {
						AppEngine.removeByGroup('rotacao',tweens[i].style);
					} else if ((tweens[i].style==='go-back-right') || (tweens[i].style==='go-back-left')) {
						AppEngine.removeByGroup('back',tweens[i].style);
					} else {
						AppEngine.removeByGroup('lado',tweens[i].style);
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
		element.setAttribute('target-id',box.id);
		element.setAttribute('target-index',boxIndex[box.id].index);
		var INFO_CHILDS = $(box).find('.info');
		if(INFO_CHILDS.length>0){
			var elementChild = INFO_CHILDS[0];
			if (!($(elementChild).hasClass('apper'))) {
				$(elementChild).addClass('apper');
			}
		}
		totemIsRunning = true;
		AppEngine.scrolledItemID = boxIndex[box.id].index;
	} else {
		if (AppEngine.gotoInit) {
			totem.style.top = '-35px';
			AppEngine.removeAllClass();
			$(totem).addClass('left');
			$(totem).addClass('rotate-down');
			AppEngine.scrolledItemID = 0;
			totem.removeAttribute('target-id');
			totem.removeAttribute('target-index');
			totemIsRunning = false;
			StackManage = [];
		}
	}
};
AppEngine.removeStep = function(){
	'use strict';
	if(StackManage.length>0){
		StackManage.shift();
		AppEngine.stepManager();
	}
};

AppEngine.orderElementsByDistance = function(heightView){
	'use strict';
	var tempOrder = [];
	var HalfView = heightView/2;
	for (var i = screenAreas.length - 1; i >= 0; i--) {
		var valueArea = screenAreas[i].class.substring(1,screenAreas[i].class.length);
		var element = document.getElementsByClassName(valueArea);
		var rect = element[0].getBoundingClientRect();
		var spreadVal = (rect.top+(rect.height/2)-HalfView)-20;
		tempOrder.push({order:i,spread:spreadVal,topIndex:Math.sqrt(spreadVal*spreadVal),element:element[0],name:valueArea});
	}
	return tempOrder;
};

AppEngine.removeByGroup = function(group,style){
	'use strict';
	for (var i = 0; i < AppEngine.groupBy[group].length; i++) {
		if (style!==AppEngine.groupBy[group][i]) {
			$(AppEngine.totem).removeClass(AppEngine.groupBy[group][i]);
		}
	}
};

AppEngine.removeAllClass = function(){
	'use strict';
};

AppEngine.shakeElement = function(element){
	'use strict';
	var repeatCount = 5;
	var child = $(element).find('figure img')[0];	
	AppEngine.Keepshake(child,repeatCount);
};
AppEngine.Keepshake = function(child,times){
	'use strict';
	var xGo = 10;
	console.log(child);
	return;
	if (child.style.left==='10px') {
		xGo = -3;
	}
	if (times>0) {
		times--;
		TweenMax.to(child,0.1,{left:xGo, ease:'Bounce',onComplete:AppEngine.Keepshake,onCompleteParams:[child,times]});
	} else {
		TweenMax.to(child,0.1,{left:0, ease:'Bounce'});
	}	
};
