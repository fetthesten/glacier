
BasicGame.MainMenu = function (game) {

	this.bg;
	this.logo;
	this.text = [];

	// logo anim
	this.slices;
	this.waveform;
	this.yl;
	this.cy = 0;
};

BasicGame.MainMenu.prototype = {

	create: function () 
	{

		this.bg = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'sprites', 0);

		// set up logo
		var motion = { y: 0};
		var tween = this.add.tween(motion).to({y: 32}, 500, 'Bounce.easeInOut', true, 0, -1, true);
		this.waveform = tween.generateData(238);
		this.yl = this.waveform.length -1;
		var sprites = this.add.spriteBatch();
		this.slices = [];

		var logoWidth = this.cache.getImage('logo').width;
		var logoHeight = this.cache.getImage('logo').height;
		var xs = 4;
		for (var x=0;x<Math.floor(logoWidth/xs); x++)
		{
			var bit = this.make.sprite(8+(x*xs),32, 'logo');
			bit.crop(new Phaser.Rectangle(x*xs,0,xs,logoHeight));
			bit.oy=bit.y;
			bit.cy=this.math.wrap(x*2, 0, this.yl);
			bit.anchor.set(0.5);
			sprites.addChild(bit);
			this.slices.push(bit);
		}

		this.text[0] = this.add.text(this.game.width * 0.5, (this.game.height * 0.5), 'press smth to start', {
			font: '18px Impact', fill: '#ffffff', align: 'center', stroke: '#aa0000', strokeThickness: 2
		});
		for (var t = 0; t < this.text.length; t++)
			this.text[t].anchor.set(0.5);

		this.input.onDown.add(this.startGame, this);
		this.input.keyboard.addCallbacks(this, null, null, this.startGame);

	},

	update: function () 
	{
		for (var i = 0, len = this.slices.length; i<len; i++)
		{
			this.slices[i].y = this.slices[i].oy + this.waveform[this.slices[i].cy].y;
			this.slices[i].cy++;
			if (this.slices[i].cy > this.yl)
			{
				this.slices[i].cy = 0;
			}
		}
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
