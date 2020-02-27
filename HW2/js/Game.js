"use strict";

class Game extends Phaser.Scene{

    constructor(){
        super("game");
    }

    changeGhostColor(){
        if(this.keyDown){
            return;
        }
        this.keyDown = true;
        this.startText.destroy();
        this.run = true;
        this.beep.play();
        this.ghostColor = (this.ghostColor+1)%4;
        switch(this.ghostColor){
            case 0:
                this.ghost.setTexture('red_ghost');
                break;
            case 1:
                this.ghost.setTexture('blue_ghost');
                break;
            case 2:
                this.ghost.setTexture('pink_ghost');
                break;
            case 3:
                this.ghost.setTexture('orange_ghost');
                break;
        }
    }

    changeBlockColor(){
        this.blockTopColor = Phaser.Math.Between(0, 3);
        this.blockBottomColor = Phaser.Math.Between(0, 3);
        switch(this.blockTopColor){
            case 0:
                this.blocks[0].setTexture('red_block');
                this.blocks[1].setTexture('red_block');
                break;
            case 1:
                this.blocks[0].setTexture('blue_block');
                this.blocks[1].setTexture('blue_block');
                break;
            case 2:
                this.blocks[0].setTexture('pink_block');
                this.blocks[1].setTexture('pink_block');
                break;
            case 3:
                this.blocks[0].setTexture('orange_block');
                this.blocks[1].setTexture('orange_block');
        }
        switch(this.blockBottomColor){
            case 0:
                this.blocks[2].setTexture('red_block');
                this.blocks[3].setTexture('red_block');
                break;
            case 1:
                this.blocks[2].setTexture('blue_block');
                this.blocks[3].setTexture('blue_block');
                break;
            case 2:
                this.blocks[2].setTexture('pink_block');
                this.blocks[3].setTexture('pink_block');
                break;
            case 3:
                this.blocks[2].setTexture('orange_block');
                this.blocks[3].setTexture('orange_block');
        }
    }

    checkGhostColor(){
        this.rotation = (this.rotation+1)%2
        if(this.rotation == 0){
            if(this.blockTopColor != this.ghostColor){
                this.scene.restart();
            }
        }else{
            if(this.blockBottomColor != this.ghostColor){
                this.scene.restart();
            }
        }
    }
    
    create() {
        this.run = false;
        this.time = 0;
        this.rotation = 1;
        this.checked = false;
        this.score = 0;
        this.keyDown = false;

        this.beep = this.sound.add('beep').setRate(1.5);

        this.add.image(0, 0, 'preloaderBackground').setOrigin(0,0);

        this.ghostColor = 0;
        this.ghost = this.add.sprite(0, 225+300, 'red_ghost').setOrigin(0, 0.5);

        var keyObj = this.input.keyboard.addKey('SPACE');  // Get key object
        keyObj.on('down', () => this.changeGhostColor());
        keyObj.on('up', () => this.keyDown = false);

        this.blocks = [];
        this.blockTopColor = 1;
        this.blockBottomColor = 1;
        for(var i = 0; i < 4; i++){
            this.blocks[i] = this.add.sprite(900, i*159, 'blue_block').setOrigin(0);
        }

        this.scoreText = this.add.bitmapText(15, 15, 'atari', `Score: ${this.score}m`, 24);
        this.startText = this.add.bitmapText(400, 300, 'atari', 'Press SPACE to Start', 32).setOrigin(0.5);
    }

    test(){
        console.log("test");
    }
    
    update(timestep, dt) {
        if(!this.run){
            return;
        }
        this.time += dt;
        this.score += dt/200;

        this.scoreText.setText(`Score: ${Math.round(this.score)}m`);

        this.ghost.y = Math.cos(this.time/750)*225+300;

        var blocksX = this.blocks[0].x;
        blocksX -= dt * 1.4005634992/3;
        if(blocksX <= -200){
            this.checked = false;
            this.changeBlockColor();
            blocksX = 900;
        }else if(this.checked == false && blocksX <= 160 && blocksX >= 0){
            this.checked = true;
            this.checkGhostColor();
        }

        for(var i = 0; i < 4; i++){
            this.blocks[i].x = blocksX;
        }
    }
}
export default Game;