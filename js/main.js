document.addEventListener("deviceready", onDeviceReady, false);
//	100% of the browser window - see Boot.js for additional configuration
var game = new Phaser.Game(320, 240, Phaser.AUTO);
game.global = {
    //Global Vars 
}

//	Add the States your game has.
	//	You don't have to do this in the html, it could be done in your Boot state too, but for simplicity I'll keep it here.
	game.state.add('Boot', BasicGame.Boot);
	game.state.add('Preloader', BasicGame.Preloader);
	game.state.add('MainMenu', BasicGame.MainMenu);
	game.state.add('Game', BasicGame.Game);
	game.antialias = false;

function onDeviceReady() {
    // Now safe to use device APIs    
	//	Now start the Boot state.
	game.state.start('Boot');
}


