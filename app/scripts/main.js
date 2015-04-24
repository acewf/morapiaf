var AppEngine = new Object();
var screenAreas = new Array();
var animationManager = new Array();
var boxIndex = new Array();
screenAreas.push({class:'.familia',hash:'familia'});
screenAreas.push({class:'.festa',hash:'festa'});
screenAreas.push({class:'.especialistas',hash:'especialistas'});
screenAreas.push({class:'.classicos',hash:'classicos'});
screenAreas.push({class:'.outros',hash:'outros'});
AppEngine.lastOffsetY = 0;
AppEngine.directionY = 0;
AppEngine.scrolledItemID = 0;


var totemIsRunning = false;

AppEngine.sortByCondition = function(){
	var sortByIndex = function (a, b) {
		  if (a.topIndex > b.topIndex) {
		    return 1;
		  }
		  if (a.topIndex < b.topIndex) {
		    return -1;
		  }
		  // a must be equal to b
		  return 0;
	}
	return sortByIndex;
}

AppEngine.bindTransitions = function(){
	$("section figure").bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(event){
		//console.log(event,"#--#finish#--#");
		var target = event.target;
		if (event.originalEvent.propertyName!="transform") {
			AppEngine.scrolledItemID = target.getAttribute("target-index");
			totemIsRunning = false;
			setTimeout(AppEngine.removeStep,500,false)
		};
	});
}

AppEngine.stepManager = function(){
// && (!totemIsRunning)
	if((animationManager.length>0)){
		var topWindowY = (window.pageYOffset-window.innerHeight);
		var tweens = animationManager[0].tweens;
		var element = animationManager[0].element;
		var box = animationManager[0].box;
		var str = "section figure."+animationManager[0].tweens[0].style;
		if ((box.offsetTop==element.offsetTop) && (parseFloat(MainCssRules[str].left)==element.offsetLeft)) {
			animationManager.shift();
			AppEngine.removeStep(true);
			return;	
		};
		$(element).removeClass("middle");
		$(element).removeClass("left");
		$(element).removeClass("right");
		$(element).removeClass("middle-right");
		$(element).removeClass("rotate-right");
		$(element).removeClass("rotate-left");
		$(".totem").removeClass("go-back");

		for (var i = 0; i < tweens.length; i++) {
			//console.log("Counter;",i,"_Box:",box.id,tweens[i]," time:",Math.floor(Date.now() / 1000));
			if (tweens[i].style) {
				$(element).addClass(tweens[i].style);
			} else {
				//topWindowY+120+tweens[i].value
				element.style.top = box.offsetTop+"px";
				element.setAttribute("target-id",box.id);
				element.setAttribute("target-index",boxIndex[box.id].index);
			}			
		};
		totemIsRunning = true;
	}
}
AppEngine.nextTweenPoints = function(square,totem){
	var rectElement = square.getBoundingClientRect();
	var leftBox = rectElement.left-view.getBoundingClientRect().left;
	var tweenClass = AppEngine.manageNextPositionSystem(leftBox,square,rectElement);
	var topMove = rectElement.top;
	tweenClass.push({value:topMove,prop:"top",index:boxIndex[square.id].index});
	return {totem:totem,tween:tweenClass,element:square};
}
AppEngine.checkDiference = function(boxsquare,element){
	var diferenca = boxIndex[boxsquare.id].index-AppEngine.scrolledItemID;
	if (diferenca>1) {
		var tempIndexId = AppEngine.scrolledItemID
		if((boxIndex[boxsquare.id].index-tempIndexId)>8){
			tempIndexId = boxIndex[boxsquare.id].index-8;
		}
		for (var i = tempIndexId; i <= boxIndex[boxsquare.id].index; i++) {
			var square = totalElem[i];
			var item = AppEngine.nextTweenPoints(square,element);
			AppEngine.addStep(item.totem,item.tween,item.element,2);
		};			
	};
}
AppEngine.addStep = function(element,tweens,boxsquare,level){
	if (animationManager.length>0) {
		var exist = false;
		var nr_exist = null;
		for (var i = 0; i < animationManager.length; i++) {
			if (animationManager[i].box==boxsquare) {
				exist = true;
				nr_exist = i;
				break;
			};
		};
		var diferenca = boxIndex[boxsquare.id].index-AppEngine.scrolledItemID;
		//AppEngine.checkDiference(boxsquare,element);
		if (!exist) {
			animationManager.push({element:element,tweens:tweens,box:boxsquare});
		} else {
			animationManager[nr_exist] = {element:element,tweens:tweens,box:boxsquare};
		}
	} else {
		if(level==1){
			AppEngine.checkDiference(boxsquare,element);
		}		
		animationManager.push({element:element,tweens:tweens,box:boxsquare});
	}
	if (animationManager.length>=1) {
		AppEngine.stepManager();
	};
}
AppEngine.removeStep = function(del){
	if(animationManager.length>0){
		if (del) {
			//animationManager.shift();
		};
		AppEngine.stepManager();
	}
}

AppEngine.orderElementsByDistance = function(translateY){
	var tempOrder = new Array();
	for (var i = screenAreas.length - 1; i >= 0; i--) {
		var valueArea = screenAreas[i].class.substring(1,screenAreas[i].class.length);
		element = document.getElementsByClassName(valueArea);
		var rect = element[0].getBoundingClientRect();
		tempOrder.push({order:i,topIndex:Math.sqrt((rect.top-translateY)*(rect.top-translateY)),element:element[0],name:valueArea});
	};
	return tempOrder;
}
AppEngine.manageNextPositionSystem = function(leftBox,square,rectElement){
	var tweenClass = [];
	if (leftBox<100) {
		tweenClass.push({style:"left",prop:"side"});
	} else if (leftBox>200) {
		tweenClass.push({style:"right",prop:"side"});
	} else if(square.getBoundingClientRect().width>200){
		tweenClass.push({style:"middle-right",prop:"side"});
	} else {
		tweenClass.push({style:"middle",prop:"side"});
	}
	var rElement = getNextElement("piece-block",square);
	if(AppEngine.directionY==1){

	}
	if (rElement) {
		var rectNextElement = rElement.getBoundingClientRect();
		if (rectElement.left<rectNextElement.left) {
			tweenClass.push({style:"rotate-right",prop:"transform"});
		} else if (rectElement.left>rectNextElement.left) {
			tweenClass.push({style:"rotate-left",prop:"transform"});
		} 
	};

	return tweenClass;
}

var getNextElement = function(baseClass,elementTest){
	var allElements = document.getElementsByClassName(baseClass);
	var icounter = -1;
	var nextElement
	for (var i = 0; i < allElements.length; i++) {
		if(icounter>0){
			nextElement = allElements[i];
			return nextElement;
		}
		if(allElements[i]==elementTest){
			icounter = i;
		}
	};
	return null;
}
var getPrevElement = function(baseClass,elementTest){
	var allElements = document.getElementsByClassName(baseClass);
	var icounter = -1;
	var nextElement
	for (var i = 0; i < allElements.length; i++) {
		if(icounter>0){
			nextElement = allElements[i];
			return nextElement;
		}
		if(allElements[i]==elementTest){
			icounter = i;
		}
	};
	return null;
}
var view
var totalElem
var MainCssRules = {};
AppEngine.onLoad = function(){
	var totem = document.getElementsByClassName("totem")[0];
	view = document.getElementsByClassName("first-view")[0];
	var tempOrder = new Array();
	var visibleInfo = new Array();
	var translateY = 308;
	for (var i = 0; i < document.styleSheets[3].cssRules.length; i++) {
		var itemRule = document.styleSheets[3].cssRules[i];
		MainCssRules[itemRule.selectorText] = itemRule.style;
	};
	totalElem = $(".piece-block");
	for (var i = 0; i < totalElem.length; i++) {
		totalElem[i].id = "npeca-"+i;
		boxIndex[totalElem[i].id] = {element:totalElem[i],index:i};
	};
	//
	window.onscroll = function (event) {
		var bodyRect = document.body.getBoundingClientRect();	
		var topWindowY = (window.pageYOffset-window.innerHeight);
		if(window.pageYOffset>200){
			//console.log(window.pageYOffset,"..offset");
			if (AppEngine.lastOffsetY<window.pageYOffset) {
				AppEngine.directionY = 0;
				$(totem).removeClass("go-back");
			} else {
				AppEngine.directionY = 1;
				$(totem).addClass("go-back");
			}
			var element;
			tempOrder = AppEngine.orderElementsByDistance(translateY);
			var temp = tempOrder.sort(AppEngine.sortByCondition());
			element = temp[0].element;
			var responseTotalElements = $(element).find(".piece-block");
			rect = element.getBoundingClientRect();
			var rHeight = rect.height;
			var miid = rHeight/2;
			var rtopY = rect.top-translateY;
			var increment = 0;
			//////////////////////////////////////////////////////////////////
			if (rtopY>=-miid && rtopY<=miid) {
				var refY = (rtopY+miid)-rHeight;
				refY = Math.sqrt(refY*refY);
				var perc = refY/rHeight;
				if (perc>1) {
					perc = 1;
				};
				if (perc<0) {
					perc = 0;
				};
				var responseTotalElements = $(element).find(".piece-block");
				var responseIndex = Math.round((responseTotalElements.length-1)*perc);
				var square = responseTotalElements[responseIndex];
				var item = AppEngine.nextTweenPoints(square,totem);
				AppEngine.addStep(item.totem,item.tween,item.element,1);

				var info_childs = $(square).find(".info");
				if(info_childs.length>0){
					var elementChild = info_childs[0];
					$(elementChild).addClass("apper");
					elementChild.id = temp[0].name+"_"+responseIndex;
				}
			} else if (window.pageYOffset<250) {
				totem.style.top = "0px";
			};
		} else {
			totem.style.top = "-50px";
			$(totem).removeClass("rotate-right");
			$(totem).removeClass("rotate-left");
			$(totem).removeClass("go-back");
		}
		AppEngine.lastOffsetY = window.pageYOffset;
    }
    AppEngine.bindTransitions();
}
AppEngine.onLoad();