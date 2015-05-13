var TweenMax = (TweenMax)?TweenMax=TweenMax:null;
var d = document.getElementsByClassName('blocktest')[0];
var field = $('.wrapblock')[0];
var field2 = $('.wrapblock')[1];
var main = $('.main-container')[0];
//TweenMax.set(main, {perspective: 1000});

function function_name (argument) {
	field.style.transform = 'rotateX(150deg)';
	//TweenMax.to(field, 10, {rotationX:50,y:-$(d).height(), transformOrigin:'bottom center',delay:1});
	//TweenMax.to(field2, 0, {rotationX:-50,y:$(d).height(), transformOrigin:'top center'});
	//TweenMax.to(field2, 10, {rotationX:0,y:0, transformOrigin:'top center',delay:1});
}
function_name();