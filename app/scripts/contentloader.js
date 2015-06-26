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
function ContentLoader(res){
    'use strict';
    //Uses extras in here.
    var instance = this;
    this.data = null;
    Object.defineProperties(this, {
        defaultType: {
            value: "realtime",
            writable: true
        },
        load: {
            value: function(type) {
              console.log(type);
            },
            enumerable: true
        }
    });
    var baseURL = null;
    if (window.location.origin) {
        baseURL = window.location.origin;
    } else {
        baseURL = window.location.host;
    }
    this.loaded = function(data){  
        var evt = new Event('complete');
        this.dispatchEvent(evt);
    }
    this.loadAllContent = function(endereco){
        var baseURL = null;
        if (window.location.origin) {
            baseURL = window.location.origin;
        } else {
            baseURL = window.location.host;
        }
        if (baseURL.indexOf("http://")===-1) {
            baseURL = 'http://'+baseURL
        };
        var maddress = baseURL+'/includes/'+endereco+'.php?';
        $.ajax({
            cache: false,
            url: maddress,
            success: function(data) {
                console.log('LOADED DATA');
                console.log(data);
                /*
                var newDiv = $("<div>");
                $(newDiv).html(data).imagesLoaded().then(function(){
                    var pageC = $('.page-content');
                    var msnode = pageC[0].parentNode;                        
                    if (pageC)
                    pageC.remove();
                    try{
                        $(msnode).append(newDiv[0].innerHTML);
                    }catch(err) {
                        console.log(err.message);
                    } 
                });
                */
            }
        });
    }
    this.loadAHeader= function(endereco){
        var baseURL = null;
        if (window.location.origin) {
            baseURL = window.location.origin;
        } else {
            baseURL = window.location.host;
        }
        if (baseURL.indexOf("http://")===-1) {
            baseURL = 'http://'+baseURL
        };
        var maddress = baseURL+'/includes/head/'+endereco+'.php?';
        $.ajax({
            cache: false,
            url: maddress,
            success: function(data) {
                $('head title').remove();
                $('head meta').remove();
                $('head').append(data);
            }
        });
    }
    this.complete = function(){
        console.log('complete load');
    }
    this.click = function(scope){
        var href = $(scope).attr('href');
        console.log(href,'..-...-.....--....');
        event.preventDefault();
        return;

        console.log(href,'..DONT DO REST.');

        
        var datarooms = $(this).attr('data-rooms');
        
        var baseURL = null;
        if (window.location.origin) {
            baseURL = window.location.origin;
        } else {
            baseURL = window.location.host;
        }
        if (baseURL.indexOf("http://")===-1) {
            baseURL = 'http://'+baseURL
        };
        var n = href.indexOf(baseURL);
        var res = href.substring(n+baseURL.length+1, href.length);
        
        if(window.history && window.history.pushState){
            console.log('USE PUSH STATE');
            console.log('Enderecos',res);
            window.history.pushState('', 'Title', '/'+res);
        } else {
            console.log('USE LOCATION...',href);
            window.location.href = href;
        }
        
        var mcontent;
        var m = new Loader(baseURL+'/includes/address-filter-output.php?url='+res);
        function completeload(ev){
            var data = JSON.parse(m.data);
            //loadContent(data.path);
            instance.loadAllContent(data.path);
            //instance.addEventListener('complete',instance.complete);
            //instance.loadAHeader(data.headfile);
            m.removeEventListener('complete',completeload);
            m = null;
        }        
        m.addEventListener('complete',completeload);
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
            return false;
        }
    }
};

ContentLoader.prototype.addEventListener =function(a,b){
  'use strict';
    if(this.addEventListener){
        this[a] = b;
        //this.addEventListener(a,b,false);
    }else if(this.attachEvent && htmlEvents['on'+a]){// IE < 9
        this.attachEvent('on'+a,b);
    }else{
        this['on'+a]=b;
    }
    //this[a] = b;
};
ContentLoader.prototype.removeEventListener = function(a,b){
    'use strict';
  this[a] = null;
  b = null;
};
ContentLoader.prototype.dispatchEvent = function(eventName){
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