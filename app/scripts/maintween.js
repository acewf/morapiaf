var TweenMax = (TweenMax)?TweenMax=TweenMax:null;
var d = document.getElementsByClassName('blocktest')[0];
var field = $('.wrapblock')[0];
TweenMax.set(field, {perspective: 500});
TweenMax.to(d, 3, {rotationX:360, transformOrigin:'bottom center',delay:1});
TweenMax.to(d, 3, {css: {transform: 'translate3d(100px,0,0)'},delay:1}); 