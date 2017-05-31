var Frogr = Frogr || {};

Frogr.MainMenu = function(){};

Frogr.MainMenu.prototype = {
    preload: function(){

    },
    create: function() {
        // Add background
        this.game.add.sprite(0, 0, 'background');

        var style = {font: "40px", fill: "#fff"};
        var gameTitle = this.game.add.text(this.game.width/2, this.game.height/2, "Crossr", style);
        gameTitle.font = 'Press Start 2P';
        gameTitle.anchor.set(0.5);

        var style = { font: "15px", fill: "#fff" };
        var startTitle = this.game.add.text(this.game.width/2, this.game.height * 0.65, "Press space to begin", style);
        startTitle.anchor.set(0.5);
        startTitle.font = 'Press Start 2P';

        this.game.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },
    update: function(){
        if (this.game.spaceKey.isDown) {
            Frogr.game.state.start('Game');
        }
    }
};
