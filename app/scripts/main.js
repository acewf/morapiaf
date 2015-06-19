require(['app', 'jquery','picturefill'], function (app) {
    'use strict';
    // use app here


     var pagModulesRef = [];
    pagModulesRef['main-content-ui'] = {module:'appmain'};
    pagModulesRef['games-ui'] = {module:'appgames'};
    pagModulesRef['items-ui'] = {module:'appitems'};

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