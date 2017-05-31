var Frogr = Frogr || {};
Frogr.game = new Phaser.Game(200, 200, Phaser.AUTO);

WebFontConfig = {
    //active: function() { Frogr.game.time.events.add(Phaser.Timer.SECOND, createText, this); },
    google: {
      families: ['Press Start 2P']
    }
};

Frogr.game.state.add('Boot', Frogr.Boot);
Frogr.game.state.add('Preload', Frogr.Preload);
Frogr.game.state.add('MainMenu', Frogr.MainMenu);
Frogr.game.state.add('Game', Frogr.Game);
Frogr.game.state.add('GameOver', Frogr.GameOver);

Frogr.game.state.start('Boot');
