var d = document.getElementsByClassName('blocktest')[0];
var field = $(".wrapblock")[0];
console.log(field);
TweenLite.set(field, {perspective: 500});
TweenMax.to(d, 3, {rotationX:360, transformOrigin:"bottom center",delay:1});