var Frogr = Frogr || {};

Frogr.Boot = function(){};

Frogr.Boot.prototype = {
    preload: function() {
        //this.load.image('logo', 'assets/logo.png');
    },
    create: function(){
        this.game.stage.backgroundColor = '#333438';

        //physics system for movement
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.game.state.start('Preload');
    }
};
