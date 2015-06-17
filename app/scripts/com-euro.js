////Author:Pedro Martins
////Contact:ace.wf.home@gmail.com
////Date: 05/05/2015
////Company:euro-m.pt
define(['eurom'], function() {
	var com = {};
	com.euro = function(){
		'use strict';
		/*
		var instance = this;
		var version = function(){
			console.log('--version');
		};
		*/
	};
	com.euro.prototype.getNextElement = function(baseClass,elementTest){
		'use strict';
		var allElements = document.getElementsByClassName(baseClass);
		var icounter = -1;
		var nextElement;
		for (var i = 0; i < allElements.length; i++) {
			if(icounter>=0){
				nextElement = allElements[i];
				return nextElement;
			}
			if(allElements[i]===elementTest){
				icounter = i;
			}
		}
		return null;
	};
	com.euro.prototype.getPrevElement = function(baseClass,elementTest){
		'use strict';
		var allElements = document.getElementsByClassName(baseClass);
		var icounter = allElements.length+1;
		var nextElement;
		for (var i = allElements.length-1; i >= 0; i--) {
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

	com.euro.prototype.sortByCondition = function(){
		'use strict';
		var sortByIndex = function (a, b) {
			  if (a.topIndex > b.topIndex){
			    return 1;
			  }
			  if (a.topIndex < b.topIndex) {
			    return -1;
			  }
			  return 0;
		};
		return sortByIndex;
	};


	return com;
});