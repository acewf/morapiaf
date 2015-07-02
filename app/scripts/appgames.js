define(['appgames','appmenu','TweenMax'], function(app,appmenu,tweenMax) {
	var relatedIconClass = [];
	relatedIconClass['familia'] = 'icon-family';
	relatedIconClass['festa'] = 'icon-party';
	relatedIconClass['especialistas'] = 'icon-especialistas';
	relatedIconClass['classicos'] = 'icon-pacman';
	relatedIconClass['outros'] = 'icon-puzzle';
	relatedIconClass['all'] = 'icon-notepad';

    function AppModule(){
    	console.log('GAME MODULE INIT');
    	this.gametype = 'all';
    	this.filters = [];
	}

    AppModule.prototype.init = function(){
        console.log('appgames::MENU::INIT::');
        this.addEvents();
        this.moveTween();
        $('#games-items').mixItUp();
    }

    AppModule.prototype.addEvents = function(){
    	var instance = this;
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
		});
		$('.search input').focusout(function() {
		  var target = event.target;
		  $(target.parentNode).removeClass('open');
		});

		$('.select-filter-option ul li').click(function(){
			instance.applyFilter(this);
		});
		$('.select-filter-option button').click(function(){
			instance.clearFilter(this);
		});
		$('.group-type .filter-type').click(instance.openType);
		$('.group-type ul li').click(function(){
			instance.changeType(this);
		});
	}
	AppModule.prototype.openType = function(){
		console.log('run openType');
		$('.group-type').find('.filter-type').addClass('hide');
		$('.group-type').find('ul').removeClass('hide');
	}
	AppModule.prototype.changeType = function(scope){
		console.log('CHANGE TYPE....');

		$('.group-type ul li').removeClass('active');
		$('.group-type .filter-type').html(scope.innerHTML+'<span></span>');
		$('.group-type ul').addClass('hide');
		$('.coluna-two .type-game').removeClass('familia');
		$('.coluna-two .type-game').removeClass('festa');
		$('.coluna-two .type-game').removeClass('especialistas');
		$('.coluna-two .type-game').removeClass('classicos');
		$('.coluna-two .type-game').removeClass('outros');
		$('.coluna-two .type-game').addClass(scope.getAttribute('data-type'));

		$('.coluna-two .type-game .icon').removeClass(relatedIconClass['familia']);
		$('.coluna-two .type-game .icon').removeClass(relatedIconClass['festa']);
		$('.coluna-two .type-game .icon').removeClass(relatedIconClass['especialistas']);
		$('.coluna-two .type-game .icon').removeClass(relatedIconClass['classicos']);
		$('.coluna-two .type-game .icon').removeClass(relatedIconClass['outros']);
		$('.coluna-two .type-game .icon').addClass(relatedIconClass[scope.getAttribute('data-type')]);

		$('.coluna-two .type-game span').html(scope.innerHTML);
		this.gametype = scope.getAttribute('data-type');

		$(scope).addClass('active');

		var mergeFilters = "";
		if (this.gametype!=='all') {
			mergeFilters +='.category-'+this.gametype;
		} else {
			mergeFilters = '.mix';	
		}
		for (var prop in this.filters) {
			mergeFilters +=this.filters[prop];
		};
		this.applyFilterToView(mergeFilters);		
		$('.group-type .filter-type').removeClass('hide');

		event.preventDefault();
		return true;
	}
	AppModule.prototype.clearFilter = function(scope){
		$(scope.parentNode.parentNode).removeClass('active');	
		$(scope.parentNode).find('li').removeClass('checked');
		var element = $(scope.parentNode).find('input[type="radio"]');
		element.removeAttr('checked');		
		var filterslug = element.attr('name');
		var lastQueu = [];//.concat(this.filters);
		for (var prop in this.filters) {
			if (prop!=filterslug) {
				lastQueu[prop] = this.filters[prop];
			};			
		};
		this.filters = lastQueu;
		var mergeFilters = '';
		if (this.gametype!=='all') {
			mergeFilters +='.category-'+this.gametype;
		} else {
			mergeFilters = '.mix';	
		}	
		for (var prop in this.filters) {
			mergeFilters +=this.filters[prop]+' ';
		};
		this.applyFilterToView(mergeFilters);
		event.preventDefault();
		return true;
	}

	AppModule.prototype.applyFilter = function(scope){
		$(scope.parentNode.parentNode.parentNode).addClass('active');		
		$(scope).removeClass('checked');
		$(scope).addClass('checked');
		$(scope.parentNode).find('input[type="radio"]').removeAttr('checked');
		$(scope).find('input[type="radio"]').prop("checked",true);

		var element = $(scope).find('input[type="radio"]');
		var filterslug = element.attr('name');
		var filtervalue = element.attr('data-filter');
		this.filters[filterslug] = filtervalue;
		var mergeFilters = "";
		if (this.gametype!=='all') {
			mergeFilters +='.category-'+this.gametype;
		} else {
			mergeFilters = '.mix';		
		}
		for (var prop in this.filters) {
			mergeFilters +=this.filters[prop];
		};
		this.applyFilterToView(mergeFilters);
	}

	AppModule.prototype.applyFilterToView = function(filters){
		console.log('filters----',filters);
		$('.featured-box').show();
		$('#games-items').mixItUp('filter',filters, function(state){
			var allshow = false;
			
			var items = $('.featured-box .featured-item');
			console.log(items);
			for (var i = 0; i < items.length; i++) {
				console.log(items[i].style.display);
				if (items[i].style.display==='inline-block') {
					allshow = true;
				};
			};
			if (allshow) {
				$('.featured-box').show();
			} else {
				$('.featured-box').hide();
			}
			
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