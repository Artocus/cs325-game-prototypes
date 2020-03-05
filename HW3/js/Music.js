"use strict";
class Music extends Phaser.Scene{
    
    constructor(){
        super("music");
    }

    create() {
    
        //	We've already preloaded our assets, so let's kick right into the Main Menu itself.
        //	Here all we're doing is playing some music and adding a picture and button
        //	Naturally I expect you to do something significantly better :)
    
        this.music = this.sound.add('march_of_the_white_knights');
        this.music.play();
        this.music.setVolume(0.25);
        this.music.setLoop(true);
    }
}

export default Music;