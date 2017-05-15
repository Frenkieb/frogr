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
                }
            } else {
                if (pos > 0) {
                    this.board[this.row][pos -1] = 1;
                    this.sprite.x -= this.moveDistance;
                } else {
                    this.board[this.row][pos + 1] = 1;
                    this.sprite.x += this.moveDistance;
                    this.direction = '>';
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
        // Enable cursor keys.
        this.game.cursors = this.game.input.keyboard.createCursorKeys();

        this.board = new Board();

        // Add player.
        this.player = this.game.add.sprite(80, 160, 'player');
        this.player.enableBody = true;
        this.game.physics.enable(this.player, Phaser.Physics.ARCADE);

        // Add enemies.
        this.spiderSprite = this.game.add.sprite(40, 40, 'spider');
        //this.spiderSprite.enableBody = true;

        this.snakeSprite = this.game.add.sprite(120, 80, 'snake');
        //this.snakeSprite.enableBody = true;

        this.ratSprite = this.game.add.sprite(80, 120, 'rat');
        //this.ratSprite.enableBody = true;

        this.spider = new Enemy('spider', 0, this.spiderSprite);
        this.snake = new Enemy('snake', 1, this.snakeSprite);
        this.rat = new Enemy('rat', 2, this.ratSprite);

        // Add enemies to a group to make collision easier.
        this.enemies = this.game.add.group();
        this.enemies.enableBody = true;
        this.enemies.add(this.spiderSprite);
        this.enemies.add(this.snakeSprite);
        this.enemies.add(this.ratSprite);

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
    },
    move: function() {
        this.spider.move();
        this.snake.move();
        this.rat.move();
    },
    gameOver: function() {
        Frogr.game.state.start('GameOver');
    }
}
