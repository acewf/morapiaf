////Author:Pedro Martins
////Contact:ace.wf.home@gmail.com
////Date: 05/05/2015
////Company:euro-m.pt
//////////////  AREAS DE JOGO  /////////////////////////
var com = (com)?com=com:null;
var TweenMax = (TweenMax)?TweenMax=TweenMax:null;
var AppEngine = (AppEngine)?AppEngine=AppEngine:null;
var screenAreas = [];
screenAreas.push({class:'.familia',hash:'familia'});
screenAreas.push({class:'.festa',hash:'festa'});
screenAreas.push({class:'.especialistas',hash:'especialistas'});
screenAreas.push({class:'.classicos',hash:'classicos'});
screenAreas.push({class:'.outros',hash:'outros'});
/////////////// INIT TOOLS //////////////////
var ToolQuery = new com.euro();
////////////// INIT VARIABLES ////////////////////
var boxIndex = [];
var view;
var totalElem;
var totem;
AppEngine.gotoInit = false;
AppEngine.diferenca = 0;
AppEngine.lastOffsetY = 0;
AppEngine.directionY = 0;
AppEngine.LastdirectionY = 0;
AppEngine.scrolledItemID = 0;
AppEngine.totem = null;


var removeAllClass = function(){
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

AppEngine.closeMenu = function(){
	'use strict';
	//var target = event.target;
	var d = document.getElementsByClassName('nav-site-menu')[0];
	TweenMax.to(d, 1, {rotationX:30,y:-$(d).height(), transformOrigin:'bottom center',ease: Sine.easeInOut});

	var c = document.getElementsByClassName('site-contents')[0];
	TweenMax.to(c, 1, {rotationX:0,y:0, transformOrigin:'top center',ease: Sine.easeInOut});
	$('.main-container').removeClass('overflow');
};
AppEngine.openMenu = function(){
	'use strict';
	var d = document.getElementsByClassName('nav-site-menu')[0];
	TweenMax.to(d, 1, {rotationX:0,y:0, transformOrigin:'bottom center',ease: Sine.easeInOut});

	var c = document.getElementsByClassName('site-contents')[0];
	TweenMax.to(c, 1, {rotationX:-30,y:$(d).height(), transformOrigin:'top center',ease: Sine.easeInOut});
	$('.main-container').addClass('overflow');
};
AppEngine.addEvents = function(){
	var item = $('button.menu')[0];
	$('.close').click(AppEngine.closeMenu);
	$('button.menu').click(AppEngine.openMenu);
}
AppEngine.moveTween = function(){
	'use strict';
	 var main = $('.main-container')[0];
	 $('.main-container').addClass('overflow');
	TweenMax.set(main, {perspective: 500});
	var d = document.getElementsByClassName('bothpanels')[0];
	var c = document.getElementsByClassName('site-contents')[0];
	//TweenMax.to(d, 0, {rotationX:50,y:-$(d).height(), transformOrigin:'top center',ease: Sine.easeInOut});
	TweenMax.to(c, 0, {rotationX:-10,y:$(d).height(), transformOrigin:'top center',ease: Sine.easeInOut});
};
AppEngine.onLoad = function(){
	'use strict';
	AppEngine.totem = totem = document.getElementsByClassName('totem')[0];
	view = document.getElementsByClassName('first-view')[0];
	var tempOrder = [];
	var rect;
	var i;
	var lastSquare = null;
	var h = window.innerHeight;
	
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
			AppEngine.gotoInit = false;
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
			AppEngine.AddOrCheckSteps(square,totem);
			lastSquare = square;		
		} else {
			AppEngine.gotoInit = true;
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
    window.onscroll = scrollEvent;

    AppEngine.removeAllClass = removeAllClass;
    AppEngine.addEvents();
    console.log(AppEngine.moveTween);
    AppEngine.moveTween();
};
///////////////////////////////////////
//////////// APP EVENTS ADD //////////

//////    INIT APP ///////////
AppEngine.onLoad();