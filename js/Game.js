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

            var magicSum = 0;
            var usedQ = [];
            var matching_is;

            // I could have used some recursive Coin Change Problem algo but meh
            
            // Put all the matching squares magic weights in an array
            for (const sqr of this.squares) {
                if (sqr.value === this.currentTurn) {
                    usedQ.push(sqr.magicWeight);

                }
            }
            
            var count = [];


            for (const wght_1 of usedQ) {
                count.splice(0, count.length);
                // Add the weight of the first element
                magicSum = wght_1
                // Push it to an array to keep track of the winning squares (to highlight them later)
                count.push(wght_1);
                masterLoop:
                // Loop through the tagged squares to check their sums
                for (const wght_2 of usedQ) {
                    // Ignore if its the same square
                    if (wght_1 != wght_2) {
                        // Sum it 
                        magicSum += wght_2;
                        // Push it to an array to keep track of the winning squares
                        count.push(wght_2);

                        // If we have 3 squares that add up to 15 then we have a winner!
                        if (magicSum === 15 && count.length===3) {

                            this.inProgress = false;
                            this.winner = this.currentTurn;
                            // Highlight the winning squares
                            for (const _sqr of this.squares) {

                                _sqr.isHighlighted = count.includes(_sqr.magicWeight);

                            }
                            break masterLoop;
                           

                        }
                        // Break if sum reached > 15 or squares are more than 3
                        else if (magicSum > 15 || count.length > 3) {
                            break masterLoop;

                        }
                    }
                }
            }
           
            if (this.MovesMade === this.squares.length) {
                this.inProgress = false;
            }
        };


    }

}

Game.O = 'O';
Game.X = 'X';
