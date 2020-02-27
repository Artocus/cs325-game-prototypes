"use strict";
class Music extends Phaser.Scene{
    
    constructor(){
        super("music");
    }

    create() {
    
        //	We've already preloaded our assets, so let's kick right into the Main Menu itself.
        //	Here all we're doing is playing some music and adding a picture and button
        //	Naturally I expect you to do something significantly better :)
    
        this.music = this.sound.add('out_of_orbit');
        this.music.play();
        this.music.setVolume(0.25);
        this.music.setLoop(true);

        console.log(this.cache.text.get('canon_in_d'));

        this.highscore = 0;
        this.highscoreText = this.add.bitmapText(800-15, 15, 'atari', `Highscore: ${Math.round(this.highscore)}m`, 24).setOrigin(1, 0);
    }

    update(){
        var score = this.scene.get('game').score;
        if(score > this.highscore){
            this.highscore = score;
            this.highscoreText.setText(`Highscore: ${Math.round(this.highscore)}m`);
        }
    }
}

export default Music;