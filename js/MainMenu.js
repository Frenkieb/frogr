var Frogr = Frogr || {};

Frogr.MainMenu = function(){};

Frogr.MainMenu.prototype = {
    preload: function(){
        //show logo in loading screen
        //this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY - 200, 'logo');
        //this.splash.anchor.setTo(0.5);
    },
    create: function(){
        //start game text
        var text = "Press space to begin";
        var style = { font: "10px Arial", fill: "#fff", align: "center" };
        var t = this.game.add.text(this.game.width/2, this.game.height/2, text, style);
        t.anchor.set(0.5);

        this.game.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },
    update: function(){
        if (this.game.spaceKey.isDown) {
            Frogr.game.state.start('Game');
        }
    }
};
