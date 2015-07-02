require(['app', 'jquery','picturefill'], function (app) {
    'use strict';
    // use app here
    
     var pagModulesRef = [];
    pagModulesRef['main-content-ui'] = {module:'appmain'};
    pagModulesRef['games-ui'] = {module:'appgames'};
    pagModulesRef['items-ui'] = {module:'appitems'};

     $(function () {
        $.fn.imagesLoaded = function () {
            var imgs = this.find('img[src!=""]');
            // if there's no images, just return an already resolved promise
            if (!imgs.length) {
                return $.Deferred().resolve().promise();
            }
            // for each image, add a deferred object to the array which resolves when the image is loaded
            var dfds = [];  
            imgs.each(function(){
                var dfd = $.Deferred();
                dfds.push(dfd);
                var img = new Image();
                img.onload = function(){
                    dfd.resolve();
                }
                img.src = this.src;

            });
            // return a master promise object which will resolve when all the deferred objects have resolved
            // IE - when all the images are loaded
            return $.when.apply($,dfds);
        }        
    });

    app.init();    
     if (typeof requirejs === 'function') {
        
	    requirejs(['appmenu'],function(appmenu){
            appmenu.init();
        });
	    if (contentmodule) {
	    	console.log('modulo a carregar:',contentmodule);
            console.log(pagModulesRef[contentmodule].module);
            
	    	requirejs([pagModulesRef[contentmodule].module],function(module){
                if(module){
                    module.init();
                } 
            });
            
	    } else {
	    	console.log('module missing');
	    }    
	}
    
});