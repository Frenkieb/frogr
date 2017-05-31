var Frogr = Frogr || {};

Frogr.GameOver = function() {};

Frogr.GameOver.prototype = {
    create: function() {
        // Add background
        this.game.add.sprite(0, 0, 'background');

        //Game Over text
        var style = { font: "17px", fill: "#fff" };
        var gameOverTitle = this.game.add.text(this.game.width/2, this.game.height/2, "Game over!", style);
        gameOverTitle.font = 'Press Start 2P';
        gameOverTitle.anchor.set(0.5);
    },
    update: function(){
        if (this.game.spaceKey.isDown) {
            Frogr.game.state.start('MainMenu');
        }
    }
};
