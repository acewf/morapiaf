define(['appgames','appmenu','TweenMax'], function(app,appmenu,tweenMax) {
	console.log(appmenu,'[#-game-#]');

    function AppModule(){

	}

    AppModule.prototype.init = function(){
        console.log('appgames::MENU::INIT::');
        this.addEvents();
        this.moveTween();
    }

    AppModule.prototype.addEvents = function(){
		var item = $('button.menu')[0];
		console.log('addEvents::APP GAMES::INIT::');
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
	}

	AppModule.prototype.moveTween = function(){
		'use strict';
		var main = $('.main-container')[0];
		$('.main-container').addClass('overflow');
		tweenMax.set(main, {perspective: 500});
		var d = document.getElementsByClassName('bothpanels')[0];
		var c = document.getElementsByClassName('site-contents')[0];
		TweenMax.to(c, 0, {rotationX:-10,y:$(d).height(), transformOrigin:'top center',ease: Sine.easeInOut});
	};


    var gameControler = new AppModule();
    return gameControler;
});