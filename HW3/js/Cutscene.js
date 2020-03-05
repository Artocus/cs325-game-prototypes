"user strict";

class Cutscene extends Phaser.Scene{
    constructor(){
        super("cutscene");
    }

    create(){
        this.text = this.add.text(400, 100, "zero");

        this.step = 0;

        var timer = this.time.addEvent({
            delay: 500,
            callback: this.advanceCutscene,
            callbackScope: this,
            repeat: 4
        });
    }

    advanceCutscene(){
        this.step++;

        this.text.setText(`${this.step}`);

        if(this.step == 5){
            this.scene.start('game');
        }
    }
}

export default Cutscene;