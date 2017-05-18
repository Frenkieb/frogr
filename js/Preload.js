var Frogr = Frogr || {};

Frogr.Preload = function(){};

Frogr.Preload.prototype = {
    preload: function(){
        //load game assets
        this.load.spritesheet('bat', 'assets/bat-fly.png', 40, 40);
        this.load.image('spider', 'assets/spider.png');
        this.load.image('snake', 'assets/spider.png');
        this.load.image('rat', 'assets/spider.png');
        this.load.image('player', 'assets/player.png');
    },
    create: function(){
        Frogr.game.state.start('MainMenu');
    }
};
