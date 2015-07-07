////Author:Pedro Martins
////Contact:ace.wf.home@gmail.com
////Date: 05/05/2015
////Company:euro-m.pt
//////////////  AREAS DE JOGO  /////////////////////////
define(['appmain','comeuro','stepmanager','TweenMax','appmenu'], function(app,com,appEngine,tweenMax,appmenu) {
	var boxIndex = [];
	var view;
	var totalElem;
	var totem;
	var ToolQuery = new com.euro();

	function MainApp(){
		console.log('APP MAIN [#-#] CONSTRUCTOR');
	}
	MainApp.prototype.init = function(first_argument) {
		console.log('-INIT MAIN APP-');
		this.addEvents();
		appEngine.onLoad();	
		appmenu.closeMenu();
	};

	MainApp.prototype.destroy = function(first_argument) {
		window.onscroll = null;
		console.log('-MAIN APP DESTROY-');
	}

	MainApp.prototype.addEvents = function(first_argument) {
		$('.search input').focusin(function(ev) {
			var target = event.target;
			$(target.parentNode).addClass('open');
		});
		$('.search input').focusout(function() {
		  var target = event.target;
		  $(target.parentNode).removeClass('open');
		});
	};

	
	var boardEng = new appEngine(ToolQuery);
	
	boardEng.addScreensArea({class:'.familia',hash:'familia'});
	boardEng.addScreensArea({class:'.festa',hash:'festa'});
	boardEng.addScreensArea({class:'.especialistas',hash:'especialistas'});
	boardEng.addScreensArea({class:'.classicos',hash:'classicos'});
	boardEng.addScreensArea({class:'.outros',hash:'outros'});
	/////////////// INIT TOOLS //////////////////
	
	////////////// INIT VARIABLES ////////////////////
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
	
	appEngine.addEvents = function(){
		var item = $('button.menu')[0];
		$('.close').click(appmenu.closeMenu);
		$('button.menu').click(appmenu.openMenu);
	}
	appEngine.moveTween = function(){
		'use strict';
		var main = $('.main-container')[0];
		$('.main-container').addClass('overflow');
		tweenMax.set(main, {perspective: 500});
		var d = document.getElementsByClassName('bothpanels')[0];
		var c = document.getElementsByClassName('site-contents')[0];
		TweenMax.to(c, 0, {rotationX:-10,y:$(d).height(), transformOrigin:'top center',ease: Sine.easeInOut});
	};
	appEngine.onLoad = function(){
		'use strict';
		boardEng.totem = totem = document.getElementsByClassName('totem')[0];
		view = document.getElementsByClassName('game-view')[0];
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
		boardEng.updateTotalElem(totalElem);
		boardEng.updateBoxIndex(boxIndex);
		boardEng.applyView(view);
		var scrollme = function (offsetY) {
			if (boardEng.lastOffsetY<offsetY) {
				boardEng.directionY = 0;
			} else {
				boardEng.directionY = 1;
			}
			if(offsetY>250){
				boardEng.gotoInit = false;
				var element;
				tempOrder = boardEng.orderElementsByDistance(h);
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
				boardEng.AddOrCheckSteps(square,totem);
				lastSquare = square;		
			} else {
				boardEng.gotoInit = true;
			}
			boardEng.lastOffsetY = offsetY;
			boardEng.LastdirectionY = boardEng.directionY;
	    };
	    var scrollEvent = function(){
	    	lastScrollPos = window.pageYOffset;
	    	scrollme(window.pageYOffset);   	
	    };
	    var lastScrollPos = window.pageYOffset;
	    scrollme(window.pageYOffset);
	    window.onscroll = scrollEvent;

	    appEngine.removeAllClass = removeAllClass;
	    appEngine.addEvents();
	    appEngine.moveTween();
	};
	///////////////////////////////////////
	//////////// APP EVENTS ADD //////////
	//////    INIT APP ///////////

	var m = new MainApp();
	return m;
});