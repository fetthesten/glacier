
BasicGame.MainMenu = function (game) {

	this.bg;

};

BasicGame.MainMenu.prototype = {

	create: function () 
	{

		this.bg = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'sprites', 0);

		var text = this.add.text(this.game.width * 0.5, this.game.height * 0.5, '[START]', {
			font: '42px Arial', fill: '#ffffff', align: 'center'
		});
		text.anchor.set(0.5);

		this.input.onDown.add(this.startGame, this);


	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	resize: function (width, height) {

		//	If the game container is resized this function will be called automatically.
		//	You can use it to align sprites that should be fixed in place and other responsive display things.

		this.bg.width = width;
		this.bg.height = height;


	},

	startGame: function () 
	{
		this.state.start("Game");
	}

};
