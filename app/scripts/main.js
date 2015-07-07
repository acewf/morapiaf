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
                var promiseImg = dfd.promise();
                promiseImg.progress(function(){
                    /*
                    console.log('progress img....');
                    */
                }); 
                img.onload = function(){
                    dfd.notify();
                    dfd.resolve();
                }
                img.src = this.src;
            });
            var itemLoader =$.when.apply($,dfds);         
            // return a master promise object which will resolve when all the deferred objects have resolved
            // IE - when all the images are loaded
            return {promi:itemLoader,length:imgs.length,progress:0};
        }      
    });
    app.init();    
     if (typeof requirejs === 'function') {
        var appM = null;
	    requirejs(['appmenu'],function(appmenu){
            appmenu.init();
            appM = appmenu;
        });
	    if (contentmodule) {
	    	console.log('modulo a carregar:',contentmodule);
            console.log(pagModulesRef[contentmodule].module);
            
	    	requirejs([pagModulesRef[contentmodule].module],function(module){
                if(module){
                    appM.addModule(module);
                    module.init();
                } 
            });
            
	    } else {
	    	console.log('module missing');
	    }    
	}
    
});