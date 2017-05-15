var Frogr = Frogr || {};

Frogr.Boot = function(){};

Frogr.Boot.prototype = {
    preload: function() {
        //this.load.image('logo', 'assets/logo.png');
    },
    create: function(){
        //loading screen will have a white background
        this.game.stage.backgroundColor = '#317873';

        //physics system for movement
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.game.state.start('Preload');
    }
};
