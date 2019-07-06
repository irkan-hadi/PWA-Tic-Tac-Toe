class Game {
    constructor() {


        this.initGame = function () {
            this.inProgress = true;
            this.winner = null;
            this.currentTurn = Game.X;
            this.MovesMade = 0;
            this.squares = new Array(9).fill().map(s => new Square());

            // This is gonna be used to 
            // determine who the winner is, 
            // using Magic Square design instaed 
            // of a predefined winning combinations
            this.squares[0].magicWeight = 2;
            this.squares[1].magicWeight = 7;
            this.squares[2].magicWeight = 6;
            this.squares[3].magicWeight = 9;
            this.squares[4].magicWeight = 5;
            this.squares[5].magicWeight = 1;
            this.squares[6].magicWeight = 4;
            this.squares[7].magicWeight = 3;
            this.squares[8].magicWeight = 8;
        }

        this.makeMove = function (i) {
            if (this.inProgress && !this.squares[i].value) {
                this.squares[i].value = this.currentTurn;

                this.MovesMade++;
                this.checkForWinner();
                this.currentTurn = (this.currentTurn === Game.X) ? Game.O : Game.X;

            }
        };

        this.checkForWinner = function () {

            var PlayerMoves = [];

            // Put all player moves magic weights in an array
            for (const sqr of this.squares) {
                if (sqr.value === this.currentTurn) {
                    PlayerMoves.push(sqr.magicWeight);
                }
            }
            // I could have used some recursive Coin Change Problem algo but meh

            // check if any 3 distinct magic weight numbers combinations amounts to 15 (Magic Number)
            masterLoop:
            for (let i = 0; i < PlayerMoves.length; i++)
                for (let x = 0; x < PlayerMoves.length && i != x; x++)
                    for (let y = 0; y < PlayerMoves.length && x != y && i != y; y++)
                        if (PlayerMoves[i] + PlayerMoves[x] + PlayerMoves[y] === 15) {
                            // found a winner!
                            for (const _sqr of this.squares)
                                if (_sqr.magicWeight === PlayerMoves[i] ||
                                    _sqr.magicWeight === PlayerMoves[x] ||
                                    _sqr.magicWeight === PlayerMoves[y]) {
                                    _sqr.isHighlighted = true;
                                }
                            this.inProgress = false;
                            this.winner = this.currentTurn;

                            break masterLoop;

                        }

            if (this.MovesMade === this.squares.length) {
                this.inProgress = false;
            }
        };
    }
}

Game.O = 'O';
Game.X = 'X';
