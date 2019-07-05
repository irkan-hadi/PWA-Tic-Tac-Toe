class Game {
    constructor() {
      

        this.initGame = function () {
            this.inProgress = true;
            this.winner = null;
            this.currentTurn = Game.X;
            this.MovesMade = 0;
            this.squares = new Array(9).fill().map(s => new Square());
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


            for (const sqr of this.squares) {
                if (sqr.value === this.currentTurn) {
                    usedQ.push(sqr.magicWeight);

                }
            }
            //usedQ= usedQ.sort(function(a, b){return a - b});
            var count = [];

            for (const wght_1 of usedQ) {
                count.splice(0, count.length);

                magicSum = wght_1
                
                count.push(wght_1);
                masterLoop:
                for (const wght_2 of usedQ) {
                    if (wght_1 != wght_2) {

                        magicSum += wght_2;
                        count.push(wght_2);

                        
                        if (magicSum === 15 && count.length===3) {

                            this.inProgress = false;
                            this.winner = this.currentTurn;
                            for (const _sqr of this.squares) {

                                _sqr.isHighlighted = count.includes(_sqr.magicWeight);

                            }
                            break masterLoop;
                            //sqA.isHighlighted = sqb.isHighlighted = sqc.isHighlighted = true;


                        }
                        else if (magicSum > 15 || count > 3) {
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
