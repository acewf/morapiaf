var htmlEvents = {// list of real events
    //<body> and <frameset> Events
    onload:1,
    onunload:1,
    //Form Events
    onblur:1,
    onchange:1,
    onfocus:1,
    onreset:1,
    onselect:1,
    onsubmit:1,
    //Image Events
    onabort:1,
    //Keyboard Events
    onkeydown:1,
    onkeypress:1,
    onkeyup:1,
    //Mouse Events
    onclick:1,
    ondblclick:1,
    onmousedown:1,
    onmousemove:1,
    onmouseout:1,
    onmouseover:1,
    onmouseup:1
};

function Loader(res){
    'use strict';
    //Uses extras in here.
    Object.defineProperties(this, {
        defaultType: {
            value: 'realtime',
            writable: true
        },
        load: {
            value: function(type) {
              console.log(type);
            },
            enumerable: true
        },
        data: {
            value:null,
            writable: true,
            enumerable: true
        },
        instance:{
            value:this,
            writable:false
        }
    });
    this.data =null;
    var instance = this.instance;
    this.loaded = function(data){
        //console.log('LOADED:>:',instance,this);
        if (instance) {
            instance.handler(data);
        }
    };
    this.client = new XMLHttpRequest();
    this.client.onload = this.loaded;
    var url = res;
    console.log(url.indexOf("http://"))
    if (url.indexOf("http://")===-1) {
        url = 'http://'+url
    };
    console.log('url:>>',url);
    $.ajax({
        url: url,
        type: 'GET',
        success: function(data) {
            instance.loaded(data);
        },
        error: function(jqXHR, textStatus) {
            console.log(jqXHR.statusText,textStatus);
        }
    });    
    
}
Loader.prototype.processData = function(data){
    'use strict';
    this.data = data;//data.target.response;
    var event;
    var eventName = 'complete';
    this.dispatchEvent(eventName);
};
Loader.prototype.handler = function(data){
    'use strict';
    this.processData(data);
};

Loader.prototype.addEventListener = function(a,b){
  'use strict';
    if(this.addEventListener){
        this[a] = b;
        //this.addEventListener(type,handler,false);
    }else if(this.attachEvent && htmlEvents['on'+a]){// IE < 9
        this.attachEvent('on'+a,b);
    }else{
        this['on'+a]=b;
    }
    //this[a] = b;
};
Loader.prototype.removeEventListener = function(a,b){
    'use strict';
  this[a] = null;
  b = null;
};
Loader.prototype.dispatchEvent = function(eventName){
    'use strict';
    var event;
    if(document.createEvent){
        event = document.createEvent('HTMLEvents');
        event.initEvent(eventName,true,true);
    }else if(document.createEventObject){// IE < 9
        event = document.createEventObject();
        event.eventType = eventName;
    } else {
        console.log('c');
    }
    event.eventName = eventName;
    if(this.dispatchEvent){
        var callFunctionOn = this[event.eventName];
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