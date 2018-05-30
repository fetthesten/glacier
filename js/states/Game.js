
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
    this.renderTexture;
    this.player;
    this.jump;
    this.map;
    this.levels = { 0: null };
    this.layer;
    this.keys;
};

BasicGame.Game.prototype = {

    create: function () 
    {
        

        this.map = this.game.add.tilemap();
        this.game.cache.addTilemap('level1', null, this.getLevel(0), Phaser.Tilemap.CSV);
        this.levels[0] = this.add.tilemap('level1', 8, 8);
        this.levels[0].addTilesetImage('sprites', 'sprites', 8, 8);
        this.levels[0].setCollisionBetween(1, 2);
        this.layer = this.levels[0].createLayer(0);
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
            this.player.body.velocity.x = -150;
        if (this.keys.right.isDown)
            this.player.body.velocity.x = 150;
        
        if (!this.keys.up.isDown)
        {
            this.keys.up.repeats = 0;
            this.jump = 0;
        }
        if (this.jump > 0)
            this.jump-=5;
        if (this.keys.up.isDown && this.keys.up.repeats ==0 && (this.player.body.onFloor() || this.player.body.touching.down))
        {
            this.jump = 40;
            this.player.body.velocity.y = -10;
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
        this.game.debug.text('clientx' + this.input.activePointer.clientX + 'clienty' + this.input.activePointer.clientY, 16,16);
        this.game.debug.text('mousex' + Math.floor(this.input.activePointer.x) + 'mousey' + Math.floor(this.input.activePointer.y), 16,32);
        this.game.debug.text('repeats' + this.keys.up.repeats, 16, 40);
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

    },
    getLevel: function(level)
    {
        var levels = ['','','','','',''];
        levels[0] += '1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1\n';
        levels[0] += '1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1\n';
        levels[0] += '1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1\n';
        levels[0] += '1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1\n';
        levels[0] += '1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1\n';
        levels[0] += '1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1\n';
        levels[0] += '1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1\n';
        levels[0] += '1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1\n';
        levels[0] += '1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1\n';
        levels[0] += '1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1\n';
        levels[0] += '1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1\n';
        levels[0] += '1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1\n';
        levels[0] += '1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1\n';
        levels[0] += '1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1\n';
        levels[0] += '1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1\n';
        levels[0] += '1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1\n';
        levels[0] += '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0\n';
        levels[0] += '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0\n';
        levels[0] += '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0\n';
        levels[0] += '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0\n';
        levels[0] += '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0\n';
        levels[0] += '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0\n';
        levels[0] += '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0\n';
        levels[0] += '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0\n';
        levels[0] += '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0\n';
        levels[0] += '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0\n';
        levels[0] += '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0\n';
        levels[0] += '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,2,2,2,2,1,1,1,1,1,1\n';
        levels[0] += '1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1\n';
        levels[0] += '1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1\n';

        return levels[level];
    }

};
