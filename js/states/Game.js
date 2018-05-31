
BasicGame.Game = function (game) {

	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;    //  the tween manager
    this.state;	    //	the state manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator

    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

    // game objects

    // player stuffs
    this.player;
    this.playerSpeed=100;
    this.jump;          // current jump accel amount
    this.jumpHeight=80; // initial jump accel amount
    this.jumpBoost=20;  // immediate boost when pressing jump
    this.jumpDecel=25;  // amount of jump boost to subtract from this.jump each tick the button is held

    // map stuffs
    this.bg;
    this.map;
    this.layer;
    this.currentLevel;
    this.levelWidth;
    this.keys;
};

BasicGame.Game.prototype = {

    create: function () 
    {
        this.bg = this.add.tileSprite(0, 0, this.game.width, this.game.height, 'sprites', 0);

        this.map = this.game.add.tilemap('map01');
        this.map.addTilesetImage('sprites', 'sprites');
        this.map.setCollisionBetween(1, 2);
        this.layer = this.map.createLayer(0);
        this.layer.resizeWorld();
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 400;
        
        this.player = this.add.sprite(96, -8, 'sprites', 3);
        this.player.anchor.setTo(.5,.5);
        this.game.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = true;
        this.player.animations.add('stand', [3], 10, false);
        this.player.animations.add('run', [4, 3, 5, 3], 20, false);
        this.player.animations.add('jump', [6], 10, false);
        
        this.keys = this.input.keyboard.createCursorKeys();
	},

    update: function () 
    {
        this.game.physics.arcade.collide(this.player, this.layer, this.mapCollide, null, this);
        this.player.body.velocity.x = 0;

        if (this.keys.left.isDown)
            this.player.body.velocity.x = -this.playerSpeed;
        if (this.keys.right.isDown)
            this.player.body.velocity.x = this.playerSpeed;
        
        if (!this.keys.up.isDown)
        {
            this.keys.up.repeats = 0;
            this.jump = 0;
        }
        if (this.jump > 0)
            this.jump-= Math.min(this.jumpDecel, this.jump);
        if (this.keys.up.isDown && this.keys.up.repeats ==0 && (this.player.body.onFloor() || this.player.body.touching.down))
        {
            this.jump = this.jumpHeight;
            this.player.body.velocity.y = -this.jumpBoost;
        }
        this.player.body.velocity.y -= this.jump;
        if (this.player.body.velocity.y !==0)
            this.player.play('jump');
        else if (this.player.body.velocity.x === 0)
            this.player.play('stand');
        else
            this.player.play('run');
        if (this.player.body.velocity.x < 0)
            this.player.scale.x = -1;
        else if (this.player.body.velocity.x > 0)
            this.player.scale.x = 1;
        this.game.debug.text('mousex' + Math.floor(this.input.activePointer.x) + 'mousey' + Math.floor(this.input.activePointer.y), 4,10);
    },
    mapCollide: function(player, map)
    {
        if (map.index == 2)
            this.game.debug.text('you died', 64, 120);
    },
	quitGame: function (pointer) {

		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.

		//	Then let's go back to the main menu.
		this.state.start('MainMenu');

    }
};
