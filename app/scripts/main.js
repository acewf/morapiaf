////Author:Pedro Martins
////Contact:ace.wf.home@gmail.com
////Date: 05/05/2015
////Company:euro-m.pt
//////////////  AREAS DE JOGO  /////////////////////////
var screenAreas = [];
screenAreas.push({class:'.familia',hash:'familia'});
screenAreas.push({class:'.festa',hash:'festa'});
screenAreas.push({class:'.especialistas',hash:'especialistas'});
screenAreas.push({class:'.classicos',hash:'classicos'});
screenAreas.push({class:'.outros',hash:'outros'});
/////////////// INIT TOOLS //////////////////
var com = (com)?com=com:null;
var ToolQuery = new com.euro();
////////////// INIT VARIABLES ////////////////////
var AppEngine = {};
var StackManage = [];
var boxIndex = [];
var totemIsRunning = false;
var view;
var totalElem;
var totem;
var GenericTimeOut;
var MainCssRules = {};
AppEngine.diferenca = 0;
AppEngine.lastOffsetY = 0;
AppEngine.directionY = 0;
AppEngine.LastdirectionY = 0;
AppEngine.scrolledItemID = 0;
///////////// GLOBAL POSITION SYSTEM ////////////////////
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
		tweenClass.push({style:'middle-right',prop:'side'});
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
	clearTimeout(GenericTimeOut);
	AppEngine.removeStep(false);
	//GenericTimeOut = setTimeout(AppEngine.removeStep,30,false);
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
		console.log('Deu Coco');
	}		
};
////////////////////////////////////////////////////////////////////////
AppEngine.checkDiference = function(boxsquare){
	'use strict';
	var index = boxIndex[boxsquare.id].index;
	var diferenca = index-AppEngine.scrolledItemID;
	return diferenca;
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
		AppEngine.scrolledItemID = totem.getAttribute('target-index');
		console.log('******* troca direcao ************');
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
		console.log(StackManage);
		return;
	};
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
				console.log('Push',boxsquare.id);
				StackManage.push({element:element,tweens:tweens,box:boxsquare,counter:0,totalTransition:0});
			} else {
				console.log('Add To Existent ',NR_EXIST,boxsquare.id);
				//StackManage[NR_EXIST] = {element:element,tweens:tweens,box:boxsquare,counter:0,totalTransition:0};
			}
		}
	} else {
		if (element.getAttribute('target-id')!==boxsquare.id) {	
			console.log('Push line 202',boxsquare.id);
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
			if ($(elementChild).hasClass('apper')) {
				AppEngine.shakeElement(elementChild);
			} else {
				$(elementChild).addClass('apper');
			}
			
			//elementChild.id = temp[0].name+'_'+responseIndex;
		}
		if (!totemIsRunning) {
			//AppEngine.removeAllClass();
		}
		totemIsRunning = true;
		//console.log("-----------END STEP---------------");
		AppEngine.scrolledItemID = boxIndex[box.id].index;
	} else {
		console.log("[END ALL STEPS TRANSITION]")
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
AppEngine.groupBy = {};	
AppEngine.groupBy.lado = ['left','middle','middle-right','right'];
AppEngine.groupBy.back = ['go-back-right','go-back-left','rotate-right','rotate-left','rotate-down','rotate-right-special','rotate-back-left-special'];
AppEngine.groupBy.rotacao = ['rotate-right','rotate-left','rotate-down','go-back-right','go-back-left'];
AppEngine.removeByGroup = function(group,style){
	'use strict';
	for (var i = 0; i < AppEngine.groupBy[group].length; i++) {
		if (style!==AppEngine.groupBy[group][i]) {
			$(totem).removeClass(AppEngine.groupBy[group][i]);
		}
	}
};
AppEngine.removeAllClass = function(){
	'use strict';
	$(totem).removeClass('middle');
	$(totem).removeClass('left');
	$(totem).removeClass('right');
	$(totem).removeClass('middle-right');
	$(totem).removeClass('rotate-right');
	$(totem).removeClass('rotate-left');
	$(totem).removeClass('go-back-right');
	$(totem).removeClass('go-back-left');
};

AppEngine.enableSideBoard = function(square){
	'use strict';
	var INFO_CHILDS = $(square).find('.info');
	if(INFO_CHILDS.length>0){
		var elementChild = INFO_CHILDS[0];
		$(elementChild).addClass('apper');
		//elementChild.id = temp[0].name+'_'+responseIndex;
	}
};
AppEngine.clickedMe = function(){
	'use strict';
	console.log("_click_",event);
	var target = event.target;
	var d = document.getElementsByClassName('right-panel')[0];
	TweenMax.to(d, 8, {rotationX:30,translateZ:-800,translateY:800})
};
AppEngine.shakeElement = function(element){
	'use strict';


};
AppEngine.onLoad = function(){
	'use strict';
	totem = document.getElementsByClassName('totem')[0];
	view = document.getElementsByClassName('first-view')[0];
	var tempOrder = [];
	var rect;
	var i;
	var lastSquare = null;
	var h = window.innerHeight;
	/*
	var reference = null
	for (var i = 0; i < document.styleSheets.length; i++) {
		var href = document.styleSheets[i].href;
		var varib = href.substring(href.length-8,href.length-4);
		if ('main'===varib) {
			reference = i;
			break;
		};
	};
	console.log(reference,"---",document.styleSheets[reference])
	
	for (i = 0; i < document.styleSheets[reference].cssRules.length; i++) {
		var itemRule = document.styleSheets[reference].cssRules[i];
		MainCssRules[itemRule.selectorText] = itemRule.style;
	}
	*/
	totalElem = $('.piece-block');
	for (i = 0; i < totalElem.length; i++) {
		totalElem[i].id = 'npeca-'+i;
		boxIndex[totalElem[i].id] = {element:totalElem[i],index:i};
	}
	var scrollme = function (offsetY) {
		if (AppEngine.lastOffsetY<offsetY) {
			AppEngine.directionY = 0;
		} else {
			AppEngine.directionY = 1;
		}
		if(offsetY>250){
			var element;
			tempOrder = AppEngine.orderElementsByDistance(h);
			var temp = tempOrder.sort(ToolQuery.sortByCondition());
			element = temp[0].element;
			var responseTotalElements = $(element).find('.piece-block');
			rect = element.getBoundingClientRect();
			var rHeight = rect.height;
			var middlePoint = rect.top+(rect.height/2);
			var dif = h/2-(rect.height/2);
			var inViewPercent;
			var invertVal = ((h-dif*2)-middlePoint+dif)+45;
			if (invertVal>0 && invertVal<rect.height) {
				inViewPercent = invertVal/rect.height;
			} else {
				if (invertVal>rHeight/2) {
					inViewPercent = 1;
				} else {
					inViewPercent = 0;
				}
			}
			var responseIndex = Math.round((responseTotalElements.length-1)*inViewPercent);
			var square = responseTotalElements[responseIndex];
			AppEngine.checkStepsToAdd(square,totem);
			lastSquare = square;		
		} else {
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
		AppEngine.lastOffsetY = offsetY;
		AppEngine.LastdirectionY = AppEngine.directionY;
    };
    var scrollEvent = function(){
    	lastScrollPos = window.pageYOffset;
    	scrollme(window.pageYOffset);
    };
    var lastScrollPos = window.pageYOffset;
    scrollEvent();
    //setTimeout(simulateScroll,3000);
    window.onscroll = scrollEvent;


    $('.close').click(AppEngine.clickedMe);
};
AppEngine.onLoad();