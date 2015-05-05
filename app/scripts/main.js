var com = {};
com.euro = {};
com.euro.getNextElement = function(baseClass,elementTest){
	'use strict';
	var allElements = document.getElementsByClassName(baseClass);
	var icounter = -1;
	var nextElement;
	for (var i = 0; i < allElements.length; i++) {
		if(icounter>0){
			nextElement = allElements[i];
			return nextElement;
		}
		if(allElements[i]===elementTest){
			icounter = i;
		}
	}
	return null;
};
com.euro.getPrevElement = function(baseClass,elementTest){
	'use strict';
	var allElements = document.getElementsByClassName(baseClass);
	var icounter = allElements.length+1;
	var nextElement;
	for (var i = allElements.length-1; i > 0; i--) {
		if(icounter<allElements.length){
			nextElement = allElements[i];
			return nextElement;
		}
		if(allElements[i]===elementTest){
			icounter = i;
		}
	}
	return null;
};
////////////////////////////////////////////////////////////////////////
var AppEngine = {};
var screenAreas = [];
var animationManager = [];
var boxIndex = [];
screenAreas.push({class:'.familia',hash:'familia'});
screenAreas.push({class:'.festa',hash:'festa'});
screenAreas.push({class:'.especialistas',hash:'especialistas'});
screenAreas.push({class:'.classicos',hash:'classicos'});
screenAreas.push({class:'.outros',hash:'outros'});
AppEngine.lastOffsetY = 0;
AppEngine.directionY = 0;
AppEngine.scrolledItemID = 0;
var totemIsRunning = false;
var view;
var totalElem;
var totem;
var GenericTimeOut;
var MainCssRules = {};

AppEngine.sortByCondition = function(){
	'use strict';
	var sortByIndex = function (a, b) {
		  if (a.topIndex > b.topIndex){
		    return 1;
		  }
		  if (a.topIndex < b.topIndex) {
		    return -1;
		  }
		  // a must be equal to b
		  return 0;
	};
	return sortByIndex;
};

AppEngine.bindTransitions = function(){
	'use strict';
	$('section figure').bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function(event){
		var target = event.target;
		//if (animationManager[0].counter==animationManager[0].tweens.length) {
		//console.log(event.originalEvent.propertyName!="transform");
		if (event.originalEvent.propertyName!="transform") {
			AppEngine.scrolledItemID = target.getAttribute('target-index');
			var elemTarget = boxIndex[target.getAttribute('target-id')];
			target.setAttribute("target-end-id",elemTarget.element.id);
			totemIsRunning = false;
			clearTimeout(GenericTimeOut);
			console.log(target,"time:",Math.floor(Date.now() / 1000))
			if (target.getAttribute('target-end-id')==animationManager[0].box.id) {
				console.log([].concat(animationManager));
				animationManager.shift();
				console.log("FOI REMOVIDO shift animationManager");
			};		
			console.log("ACABOU TRANSICAO");
			GenericTimeOut = setTimeout(AppEngine.removeStep,30,false);
		}
	});
};


AppEngine.nextTweenPoints = function(square,totem,goDownDirection){
	'use strict';
	var rectElement = square.getBoundingClientRect();
	var leftBox = rectElement.left-view.getBoundingClientRect().left;
	var tweenClass = AppEngine.manageNextPositionSystem(leftBox,square,rectElement,goDownDirection);
	var topMove = rectElement.top;
	tweenClass.push({value:topMove,prop:'top',index:boxIndex[square.id].index});
	return {totem:totem,tween:tweenClass,element:square};
};
AppEngine.checkDiference = function(boxsquare,element){
	'use strict';
	var index = boxIndex[boxsquare.id].index;
	var diferenca = index-AppEngine.scrolledItemID;
	console.log(AppEngine.scrolledItemID,"##ID SCROLL,",index,", ITEM#,",diferenca,element);
	var tempIndexId;
	var square;
	//console.log(AppEngine.directionY,"_direction_");
	animationManager = [];
	var i = 0;
	var item;
	if (diferenca>=1) {
		tempIndexId = AppEngine.scrolledItemID;
		if((boxIndex[boxsquare.id].index-tempIndexId)>8){
			tempIndexId = boxIndex[boxsquare.id].index-8;
		}
		for (i = tempIndexId; i < boxIndex[boxsquare.id].index; i++) {
			square = totalElem[i];
			item = AppEngine.nextTweenPoints(square,element,true);
			AppEngine.addStep(element,item.tween,item.element);
		}
		item = AppEngine.nextTweenPoints(boxsquare,element,true);
		AppEngine.addStep(element,item.tween,item.element);
	} else if (diferenca<0) {
		tempIndexId = AppEngine.scrolledItemID;
		for (i = tempIndexId-1; i >= boxIndex[boxsquare.id].index; i--) {
			square = totalElem[i];
			item = AppEngine.nextTweenPoints(square,element,false);
			AppEngine.addStep(item.totem,item.tween,item.element);
		}
	}
	if (diferenca===0) {
		item = AppEngine.nextTweenPoints(boxsquare,element,true);
		AppEngine.addStep(item.totem,item.tween,item.element);
		return null;
	}
	console.log("totemIsRunning:>>:",totemIsRunning);
	AppEngine.stepManager();
};
AppEngine.stepManager = function(){
	'use strict';
	if((animationManager.length>0)){
		var tweens = animationManager[0].tweens;
		var element = animationManager[0].element;
		var box = animationManager[0].box;

		console.log(element.getAttribute('target-id'),"===",box);
		if (!totemIsRunning) {
			AppEngine.removeAllClass();
		};

		
		for (var i = 0; i < tweens.length; i++) {
			if (tweens[i].style) {
				$(element).addClass(tweens[i].style);
			} else {
				element.style.top = box.offsetTop+75+'px';
				element.setAttribute('target-id',box.id);
				element.setAttribute('target-index',boxIndex[box.id].index);
			}			
		}
		totemIsRunning = true;
	} else {
		console.log("[END STEP TRANSITION]")
	}
};
AppEngine.addStep = function(element,tweens,boxsquare){
	'use strict';
	var exist = false;
	var NR_EXIST = null;
	if (animationManager.length>0) {	
		for (var i = 0; i < animationManager.length; i++) {
			if (animationManager[i]===undefined) {
				return null;
			}
			if (animationManager[i].box===boxsquare) {
				exist = true;
				NR_EXIST = i;
				break;
			}
		}
		//console.log("WHERE TARGET",element.getAttribute('target-id'));
		//console.log(boxsquare)
		if (element.getAttribute('target-id')!==boxsquare.id) {
			if (!exist) {		
				animationManager.push({element:element,tweens:tweens,box:boxsquare,counter:0});
				console.log("Push>>>",boxsquare.id);
			} else {
				animationManager[NR_EXIST] = {element:element,tweens:tweens,box:boxsquare,counter:0};	
				console.log("ADD EXISTENT>>>",boxsquare.id);

			}
		}
		//console.log([].concat(animationManager));
	} else {	
		if (element.getAttribute('target-id')!==boxsquare.id) {	
			animationManager.push({element:element,tweens:tweens,box:boxsquare,counter:0});
		}
	}
	if (animationManager.length>=1) {
		AppEngine.stepManager();
	}
};
AppEngine.removeStep = function(){
	'use strict';
	if(animationManager.length>0){
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
		var spreadVal = (rect.top+(rect.height/2)-HalfView);
		tempOrder.push({order:i,spread:spreadVal,topIndex:Math.sqrt(spreadVal*spreadVal),element:element[0],name:valueArea});
	}
	return tempOrder;
};
AppEngine.manageNextPositionSystem = function(leftBox,square,rectElement,goDownDirection){
	'use strict';
	var rElement;
	if (goDownDirection) {
		rElement = com.euro.getNextElement('piece-block',square);
	} else if(!goDownDirection){
		rElement = com.euro.getPrevElement('piece-block',square);
	}
	var rectNextElement;
	if (rElement) {
		rectNextElement = rElement.getBoundingClientRect();
	} else {
		rectNextElement = {top:0,left:0};
	}
	var tweenClass = [];
	if (leftBox<100) {
		tweenClass.push({style:'left',prop:'side'});
	} else if (leftBox>200) {
		tweenClass.push({style:'right',prop:'side'});
	} else if(square.getBoundingClientRect().width>200){
		tweenClass.push({style:'middle-right',prop:'side'});
	} else {
		tweenClass.push({style:'middle',prop:'side'});
	}
	var actualElement = square.getBoundingClientRect();
	if ((!goDownDirection) && (rectNextElement.top<actualElement.top) ) {
		if (actualElement.left<rectNextElement.left) {
			tweenClass.push({style:'go-back-right',prop:'side'});
		} else {
			tweenClass.push({style:'go-back-left',prop:'side'});
		}
	}  
	if (rElement) {
		if (actualElement.left<rectNextElement.left) {
			tweenClass.push({style:'rotate-right',prop:'transform'});
		} else if ((actualElement.left>rectNextElement.left)) {
			tweenClass.push({style:'rotate-left',prop:'transform'});
		} 
	}
	return tweenClass;
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
AppEngine.clickedMe = function(info){
	console.log("_click_",event)
}

AppEngine.onLoad = function(){
	'use strict';
	totem = document.getElementsByClassName('totem')[0];
	view = document.getElementsByClassName('first-view')[0];
	var tempOrder = [];
	var translateY = 208//308;
	var rect;
	var i;
	var lastSquare = null;
	var h = window.innerHeight;
	for (i = 0; i < document.styleSheets[3].cssRules.length; i++) {
		var itemRule = document.styleSheets[3].cssRules[i];
		MainCssRules[itemRule.selectorText] = itemRule.style;
	}
	totalElem = $('.piece-block');
	for (i = 0; i < totalElem.length; i++) {
		totalElem[i].id = 'npeca-'+i;
		boxIndex[totalElem[i].id] = {element:totalElem[i],index:i};
	}
	var scrollme = function (offsetY) {
		if(offsetY>250){
			if (AppEngine.lastOffsetY<offsetY) {
				AppEngine.directionY = 0;
			} else {
				AppEngine.directionY = 1;
			}
			var element;
			tempOrder = AppEngine.orderElementsByDistance(h);
			var temp = tempOrder.sort(AppEngine.sortByCondition());
			element = temp[0].element;
			var responseTotalElements = $(element).find('.piece-block');
			rect = element.getBoundingClientRect();
			var rHeight = rect.height;
			var middlePoint = rect.top+(rect.height/2);
			var dif = h/2-(rect.height/2);
			var inViewPercent
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
			console.log("Percent_",inViewPercent,"__in:",element.className);
			AppEngine.checkDiference(square,totem);			
		} else {
			totem.style.top = '0px';
			AppEngine.scrolledItemID = 0;
			animationManager = [];
			AppEngine.removeAllClass();
		}
		lastSquare = square;
		AppEngine.lastOffsetY = offsetY;
    };
    var scrollEvent = function(event){
    		scrollme(window.pageYOffset);
    }
    window.onscroll = scrollEvent;
    AppEngine.bindTransitions();
};
AppEngine.onLoad();