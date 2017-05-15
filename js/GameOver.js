var Frogr = Frogr || {};

Frogr.GameOver = function() {};

Frogr.GameOver.prototype = {
    create: function(){
        //Game Over text
        var text = "Game over!" ;
        var style = { font: "10px Arial", fill: "#fff", align: "center" };
        var t = this.game.add.text(this.game.width/2, this.game.height/2, text, style);
    },
    update: function(){
        if (this.game.spaceKey.isDown) {
            Frogr.game.state.start('MainMenu');
        }
    }
};
