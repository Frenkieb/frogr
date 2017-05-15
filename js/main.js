var Frogr = Frogr || {};
Frogr.game = new Phaser.Game(200, 200, Phaser.AUTO);

Frogr.game.state.add('Boot', Frogr.Boot);
Frogr.game.state.add('Preload', Frogr.Preload);
Frogr.game.state.add('MainMenu', Frogr.MainMenu);
Frogr.game.state.add('Game', Frogr.Game);
Frogr.game.state.add('GameOver', Frogr.GameOver);

Frogr.game.state.start('Boot');
