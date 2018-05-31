var BasicGame = {};

BasicGame.Boot = function (game) {

};

BasicGame.Boot.prototype = {

    init: function () {

        //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
        this.input.maxPointers = 1;

        //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
        this.stage.disableVisibilityChange = true;

        //  This tells the game to resize the renderer to match the game dimensions (i.e. 100% browser width / height)
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;

        //this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
        //this.game.scale.setUserScale(3, 3);
        this.game.renderer.renderSession.roundPixels = true;
        Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
    },

    preload: function () {

        //  Here we load the assets required for our preloader (in this case a background and a loading bar)
        //this.load.image('preloaderBackground', 'assets/images/preloader_background.jpg');
        this.load.image('preloaderBar', 'assets/images/preloadr_bar.png');

    },

    create: function () {

        //  By this point the preloader assets have loaded to the cache, we've set the game settings
        //  So now let's start the real preloader going
        this.state.start('Preloader');
        this.stage.smoothed = false;

    }

};
