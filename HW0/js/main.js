var config = {
    width: 800,
    height: 600,
    type: Phaser.AUTO,
    parent: 'game',
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);
var clickCountText;
var height;
var width;
var squares;
var verticleCutButtons;
var horizontalCutButtons;
var badX;
var badY;
var playerTurn;
var playerTurnText;

function preload() {
    this.load.image( 'square', 'assets/square.png' );
    this.load.image( 'bad_square', 'assets/bad_square.png' );
}

function create() {
    height = 15 //Phaser.Math.Between(1, 20);
    width =  15 //Phaser.Math.Between(1, 20);

    badX = Phaser.Math.Between(0, height-1);
    badY = Phaser.Math.Between(0, width-1);

    squares = [];
    for(var i = 0; i < width; i++){
        squares[i] = [];
        for(var j = 0; j < height; j++){
            if(i == badX && j == badY){
                squares[i][j] = this.add.image(i*20+200, j*20+100, 'bad_square').setOrigin(0,0);
            }else{
                squares[i][j] = this.add.image(i*20+200, j*20+100, 'square').setOrigin(0,0);
            }
        }
    }

    verticleCutButtons = [];
    for(var i = 0; i < width-1; i++){
        const column = i;
        verticleCutButtons[i] = this.add.text(220+20*i, 510, 'C')
            .setInteractive()
            .on('pointerdown', () => verticleCut(column))
            .setOrigin(0.5);
    }

    horizontalCutButtons = [];
    for(var i = 0; i < height-1; i++){
        const row = i;
        horizontalCutButtons[i] = this.add.text(610, 120+20*i, 'C')
            .setInteractive()
            .on('pointerdown', () => horizontalCut(row))
            .setOrigin(0.5);
    }

    playerTurn = 0;
    playerTurnText = this.add.text(400, 50, `Player ${playerTurn+1}\'s turn`).setOrigin(0.5);
}

function verticleCut(column){
    if(column < badX){
        for(var j = 0; j <= column; j++){
            for(var i = 0; i < height; i++){
                squares[j][i].destroy();
            }
        }
        for(var i = 0; i <= column; i++){
            verticleCutButtons[i].destroy();
        }
    }else{
        for(var j = column+1; j < width; j++){
            for(var i = 0; i < height; i++){
                squares[j][i].destroy();
            }
        }
        for(var i = column; i < width-1; i++){
            verticleCutButtons[i].destroy();
        }
    }

    if(checkIfWin()){
            playerTurnText.setText(`Player ${playerTurn+1} wins!`);
            return;
    }

    playerTurn = (playerTurn+1)%2;
    playerTurnText.setText(`Player ${playerTurn+1}\'s turn`);

    if(playerTurn == 1){
        ai_turn();
    }
}

function horizontalCut(row){
    if(row < badY){
        for(var j = 0; j <= row; j++){
            for(var i = 0; i < width; i++){
                squares[i][j].destroy();
            }
        }
        for(var i = 0; i <= row; i++){
            horizontalCutButtons[i].destroy();
        }
    }else{
        for(var j = row+1; j < height; j++){
            for(var i = 0; i < width; i++){
                squares[i][j].destroy();
            }
        }
        for(var i = row; i < height-1; i++){
            horizontalCutButtons[i].destroy();
        }
    }

    if(checkIfWin()){
            playerTurnText.setText(`Player ${playerTurn+1} wins! F5 to play again!`);
            return;
    }

    playerTurn = (playerTurn+1)%2;
    playerTurnText.setText(`Player ${playerTurn+1}\'s turn`);
    
    if(playerTurn == 1){
        ai_turn();
    }
}

function checkIfWin(){
    if(squares[badX+1] != undefined && squares[badX+1][badY] != undefined){
        if(squares[badX+1][badY].scene != undefined){
            return false;
        }
    }
    if(squares[badX-1] != undefined && squares[badX-1][badY] != undefined){
        if(squares[badX-1][badY].scene != undefined){
            return false;
        }
    }
    if(squares[badX][badY+1] != undefined){
        if(squares[badX][badY+1].scene != undefined){
            return false;
        }
    }
    if(squares[badX][badY-1] != undefined){
        if(squares[badX][badY-1].scene != undefined){
            return false;
        }
    }
    return true;
}

function ai_turn(){
    var lowerX, lowerY, upperX, upperY;

    lowerX = 0;
    for(var i = badX-1; i >= 0; i--){
        if(squares[i][badY].scene == undefined)
            break;
        lowerX++;
    }

    lowerY = 0;
    for(var i = badY-1; i >= 0; i--){
        if(squares[badX][i].scene == undefined)
            break;
        lowerY++;
    }

    upperX = 0;
    for(var i = badX+1; i < width; i++){
        if(squares[i][badY].scene == undefined)
            break;
        upperX++;
    }

    upperY = 0;
    for(var i = badY+1; i < height; i++){
        if(squares[badX][i].scene == undefined)
            break;
        upperY++;
    }

    console.log(`lowerX ${lowerX}, lowerY ${lowerY}, upperX ${upperX}, upperY ${upperY}`);

    var sum = nimSum(lowerX, lowerY, upperX, upperY);

    console.log(sum);

    var comparisonSum;
    if(sum == 0){
        while(true){
            var side = Phaser.Math.Between(1,4);
            switch(side){
                case 1:
                    if(lowerX != 0){
                        var amount = Phaser.Math.Between(1, lowerX);
                        verticleCut(badX-1);
                        return;
                    }
                case 2:
                    if(lowerY != 0){
                        var amount = Phaser.Math.Between(1, lowerY);
                        horizontalCut(badY-1);
                        return;
                    }
                case 3:
                    if(upperX != 0){
                        var amount = Phaser.Math.Between(1, upperX);
                        verticleCut(badX);
                        return;
                    }
                case 4:
                    if(upperY != 0){
                        var amount = Phaser.Math.Between(1, upperY);
                        horizontalCut(badX);
                        return;
                    }
            }
        }
    }else if((comparisonSum = nimSum(lowerX, sum)) < lowerX){
        console.log(`Cut Column ${badX-1 -comparisonSum}, ${comparisonSum}`);
        verticleCut(badX-1 -comparisonSum);
    }else if((comparisonSum = nimSum(lowerY, sum)) < lowerY){
        console.log(`Cut Row ${badY-1 -comparisonSum}, ${comparisonSum}`);
        horizontalCut(badY-1 - comparisonSum);
    } else if((comparisonSum = nimSum(upperX, sum)) < upperX){
        console.log(`Cut Column ${badX + comparisonSum}, ${comparisonSum}`);
        verticleCut(badX + comparisonSum);
    } else if((comparisonSum = nimSum(upperY, sum)) < upperY){
        console.log(`Cut Row ${badY + comparisonSum}, ${comparisonSum}`);
        horizontalCut(badY + comparisonSum);
    }else{
        playerTurnText.setText("Something went wrong 2.woh");
    }
}

function nimSum(){
    var sum = 0;
    var max = Math.log2(Math.max(...arguments))+1;
    for(var i = 0; i < max; i++){
        var paridy = 0;
        for(var j = 0; j < arguments.length; j++){
            paridy += (arguments[j]>>i)%2;
        }
        paridy %= 2;
        sum += paridy<<i;
    }
    return sum;
}