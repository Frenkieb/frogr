var Frogr = Frogr || {};

Frogr.Game = function(){};

class Board{
    constructor() {
        this.board = [
            [0,1,0,0,0],
            [0,0,0,1,0],
            [0,0,1,0,0]
        ];
    }
}

class Enemy extends Board {
    constructor(type, row, sprite) {
        super();

        this.type = type;
        this.timeTilMove = this.getMoveTime();
        this.row = row;
        this.sprite = sprite;
        this.direction = this.getRandomDirection();
        this.moveDistance = 40;
    }

    getMoveTime() {
        return (Math.floor(Math.random() * 2) + 1) * 500;
    }

    getRandomDirection() {
        var value = (Math.floor(Math.random() * 2));
        return (value) ? '>' : '<' ;
    }

    move() {
        if (this.timeTilMove <= 0) {
            // Move enemy
            var pos = this.board[this.row].indexOf(1);
            var end = this.board[this.row].length - 1;

            // move away from the current position;
            this.board[this.row][pos] = 0;
            if (this.direction == '>') {
                if (pos < end ) {
                    this.board[this.row][pos + 1] = 1;
                    this.sprite.x += this.moveDistance;
                } else {
                    this.board[this.row][pos - 1] = 1;
                    this.sprite.x -= this.moveDistance;
                    this.direction = '<';

                    this.sprite.animations.play('left');
                }
            } else {
                if (pos > 0) {
                    this.board[this.row][pos -1] = 1;
                    this.sprite.x -= this.moveDistance;
                } else {
                    this.board[this.row][pos + 1] = 1;
                    this.sprite.x += this.moveDistance;
                    this.direction = '>';

                    this.sprite.animations.play('right');
                }
            }

            // Set new timeTilMove.
            this.timeTilMove = this.getMoveTime();
        } else {
            this.timeTilMove -= 500;
        }
    }
}

Frogr.Game.prototype = {
    create: function() {
        // Add background
        this.game.add.sprite(0, 0, 'background');

        this.game.score = 0;

        var style = { fill: "#fff", align: "right", boundsAlignH: 'right' };
        this.game.scoreLabel = this.game.add.text(143, 5, " 0", style);
        this.game.scoreLabel.font = 'Press Start 2P';

        // Enable cursor keys.
        this.game.cursors = this.game.input.keyboard.createCursorKeys();

        this.board = new Board();

        // Add player.
        this.player = this.game.add.sprite(80, 160, 'player');
        this.player.enableBody = true;
        this.game.physics.enable(this.player, Phaser.Physics.ARCADE);

        // Add enemies.
        this.batSprite = this.game.add.sprite(80, 120, 'bat');
        this.ghostSprite = this.game.add.sprite(40, 40, 'ghost');
        this.skeletonSprite = this.game.add.sprite(120, 80, 'skeleton');

        // Add animations
        this.batSprite.animations.add('left', [3,4,5], 5, true);
        this.batSprite.animations.add('right', [0,1,2], 5, true);
        this.batSprite.animations.play('right');

        this.ghostSprite.animations.add('left', [3,4,5], 5, true);
        this.ghostSprite.animations.add('right', [0,1,2], 5, true);
        this.ghostSprite.animations.play('right');

        this.skeletonSprite.animations.add('left', [4,5,6], 5, true);
        this.skeletonSprite.animations.add('right', [0,1,2,3], 5, true);
        this.skeletonSprite.animations.play('right');

        this.ghost = new Enemy('ghost', 0, this.ghostSprite);
        this.skeleton = new Enemy('skeleton', 1, this.skeletonSprite);
        this.bat = new Enemy('bat', 2, this.batSprite);

        // Add enemies to a group to make collision easier.
        this.enemies = this.game.add.group();
        this.enemies.enableBody = true;
        this.enemies.add(this.ghostSprite);
        this.enemies.add(this.skeletonSprite);
        this.enemies.add(this.batSprite);

        // Move every x seconds.
        this.game.time.events.loop(500, this.move, this);

        // Move player up just once per keypress.
        keyUp = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        keyUp.onDown.add(function() {
            if ( this.player.y > 0 ) {
                this.player.y -= 40;
            }
        }, this);

        // Move player down just once per keypress.
        keyDown = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        keyDown.onDown.add(function() {
            if ( this.player.y < 160 ) {
                this.player.y += 40;
            }
        }, this);
    },
    update: function() {
        this.game.physics.arcade.collide(this.player, this.enemies, this.gameOver);

        if (this.player.y == 0) {
            this.addScore();
            this.player.y = 160;
        }
    },
    move: function() {
        this.ghost.move();
        this.skeleton.move();
        this.bat.move();
    },
    addScore: function() {
        this.game.score += 1;
        this.game.scoreLabel.text = ( this.game.score >= 10 ) ? this.game.score : ' ' + this.game.score;
    },
    gameOver: function() {
        Frogr.game.state.start('GameOver');
    }
}
