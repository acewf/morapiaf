define(['appgames'], function(app) {
    function AppModule(){

	}

    AppModule.prototype.init = function(){
        console.log('appgames::MENU::INIT::');
    }


    var gameControler = new AppModule();
    return gameControler;
});