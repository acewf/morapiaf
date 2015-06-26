define(['appmenu','contentloader'], function(app,contentloader) {
    function Menu(){

	}

    Menu.prototype.init = function(){
        console.log('appmenu::MENU::INIT::');


        var handler = new ContentLoader();
        $('.nav-site-menu ul a').click(function(ev){
            console.log(this,event);
            console.log(ev)
            /*
            if (event.preventDefault) {
                event.preventDefault();
                return false;
            } else {
                event.returnValue = false;
                return false;
            };
            */
           //handler.click(this);
        });
    }

	Menu.prototype.addEventListener = function(a,b){
        'use strict';
        if(this.addEventListener){
            this[a] = b;
            //this.addEventListener(a,b,false);
        }else if(this.attachEvent && htmlEvents['on'+a]){// IE < 9
            this.attachEvent('on'+a,b);
        }else{
            this['on'+a]=b;
        }
    };
    Menu.prototype.removeEventListener = function(a){
      'use strict';
      this[a] = null;
      b = null;
    };
    Menu.prototype.dispatchEvent = function(event){
        'use strict';
        var event;
        if(document.createEvent){
            event = document.createEvent('HTMLEvents');
            event.initEvent(eventName,true,true);
        }else if(document.createEventObject){// IE < 9
            event = document.createEventObject();
            event.eventType = eventName;
        } else {
        }
        event.eventName = eventName;
        if(this.dispatchEvent){
            var callFunctionOn = this[event.eventName];
            if (!(typeof description === 'function')) {
                return;
            };
            try{
              callFunctionOn(event);
            }
            catch(err){
              console.log('Error:',err);
            }
            //this.dispatchEvent(event);
        }else if(this.fireEvent && htmlEvents['on'+eventName]){// IE < 9
            this.fireEvent('on'+event.eventType,event);// can trigger only real event (e.g. 'click')
        }else if(this[eventName]){
            this[eventName]();
        }else if(el['on'+eventName]){
            this['on'+eventName]();
        }    
    };

    var menuControler = new Menu();
    return menuControler;
});