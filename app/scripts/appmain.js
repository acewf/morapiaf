////Author:Pedro Martins
////Contact:ace.wf.home@gmail.com
////Date: 05/05/2015
////Company:euro-m.pt
//////////////  AREAS DE JOGO  /////////////////////////
define(['appmain','comeuro','stepmanager','TweenMax','appmenu'], function(app,com,appEngine,tweenMax,appmenu) {

	console.log(appmenu,'[#-#]');
	function MainApp(){

	}
	MainApp.prototype.init = function(first_argument) {
		console.log('-INIT MAIN APP-');
		this.addEvents();
	};

	MainApp.prototype.addEvents = function(first_argument) {
		// body...
		$('.search input').focusin(function(ev) {
			var target = event.target;
			$(target.parentNode).addClass('open');
			
		  console.log('ADD CLASS OPEN');
		});
		$('.search input').focusout(function() {
		  console.log('REMOVE CLASS OPEN');
		  var target = event.target;
		  $(target.parentNode).removeClass('open');
		});
	};

	var boxIndex = [];
	var view;
	var totalElem;
	var totem;
	var ToolQuery = new com.euro();
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

		$('.options-menu a').click(function(){
			var href = $(this).attr('href');
			event.preventDefault();
	     	window.history.pushState('object or string', 'Title', '/'+href);

	     	$('.site-contents').load('includes/'+href+'.php', function(responseTxt, statusTxt, xhr){
	     		console.log(responseTxt);
	     		var elem = $('.site-contents')[0];
	     		elem.innerHTML = responseTxt;
		        if(statusTxt == 'success'){
		        	console.log('External content loaded successfully!');
		        }   
		        if(statusTxt == 'error'){
		            console.log("Error: " + xhr.status + ": " + xhr.statusText);
		        }
		        $('.close').click(appmenu.closeMenu);
				$('button.menu').click(appmenu.openMenu);
		    });
	     	appmenu.closeMenu();
		});
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
	appEngine.onLoad();	

	var m = new MainApp();
	return m;
});