
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	init: function () {
		this.preloadBar = null;
	},

	preload: function () {

		//	These are the assets we loaded in Boot.js				
		this.preloadBar = this.add.sprite(this.game.width / 2, this.game.height / 2, 'preloaderBar');		
		this.preloadBar.anchor.setTo(0.5);

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.

		this.load.setPreloadSprite(this.preloadBar);
		this.load.spritesheet('sprites', 'assets/images/trap_spr_01.png', 8, 8);
		this.load.image('logo', 'assets/images/logo.png');
		this.load.tilemap('map01', 'assets/maps/map01.json', null, Phaser.Tilemap.TILED_JSON);
	},

	create: function () {
	},
	update: function () 
	{
		if (this.load.hasLoaded) 
		{
			this.state.start('MainMenu');
		}
	}

};
