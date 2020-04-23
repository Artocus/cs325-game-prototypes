"use strict";

class Score extends Phaser.Scene{
    constructor(){
        super("score");
    }

    create(){
        var game = this.scene.get('playsong');
        console.log("here");
        this.add.bitmapText(400, 300, 'atari', `Score: ${(game.score/game.currentNote * 100).toFixed(2)}%\nPress F5 to play again!`, 24).setOrigin(0.5);
    }
}

export default Score;