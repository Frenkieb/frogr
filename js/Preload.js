var Frogr = Frogr || {};

Frogr.Preload = function(){};

Frogr.Preload.prototype = {
    preload: function(){
        //load game assets
        this.load.spritesheet('bat', 'assets/bat.png', 40, 40);
        this.load.spritesheet('ghost', 'assets/ghost.png', 40, 40);
        this.load.spritesheet('skeleton', 'assets/skeleton.png', 40, 40);
        //this.load.image('rat', 'assets/spider.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('background', 'assets/background.jpg')

        this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    },
    create: function(){
        Frogr.game.state.start('MainMenu');
    }
};
