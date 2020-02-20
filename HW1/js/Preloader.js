"use strict";

class Preloader extends Phaser.Scene{

    constructor(){
        super('preloader');
    }
    preload() {
    
        this.ready = false;

        //	These are the assets we loaded in Boot.js
        //	A nice sparkly background and a loading progress bar
        this.background = this.add.sprite(0, 0, 'preloaderBackground').setOrigin(0);
        this.preloadBar = this.add.sprite(300, 400, 'preloaderBar').setOrigin(0);
    
        //	This sets the preloadBar sprite as a loader sprite.
        //	What that does is automatically crop the sprite from 0 to full-width
        //	as the files below are loaded in.
        this.load.on('progress', n => this.preloadBar.setScale(n,1));
    
        //	Here we load the rest of the assets our game needs.
        //	As this is just a Project Template I've not provided these assets, swap them for your own.
        this.load.image('red_ghost', 'assets/red_ghost.png');
        this.load.image('blue_ghost', 'assets/blue_ghost.png');
        this.load.image('orange_ghost', 'assets/orange_ghost.png');
        this.load.image('pink_ghost', 'assets/pink_ghost.png');
        this.load.image('red_block', 'assets/red_block.png');
        this.load.image('blue_block', 'assets/blue_block.png');
        this.load.image('orange_block', 'assets/orange_block.png');
        this.load.image('pink_block', 'assets/pink_block.png');
        this.load.audio('out_of_orbit', ['assets/out_of_orbit.ogg']);
        this.load.audio('beep', ['assets/ES_Beep_Glitch_-_SFX_Producer.mp3']);
        this.load.bitmapFont('atari', 'assets/atari-classic.png', 'assets/atari-classic.xml');
    }
    
    create() {
    
        //	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
        this.preloadBar.cropEnabled = false;
    }
    
    update() {
    
        //	You don't actually need to do this, but I find it gives a much smoother game experience.
        //	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
        //	You can jump right into the menu if you want and still play the music, but you'll have a few
        //	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
        //	it's best to wait for it to decode here first, then carry on.
            
        //	If you don't have any music in your game then put the game.state.start line into the create function and delete
        //	the update function completely.
            
        if (this.ready == false)
        {
            this.ready = true;
            this.scene.launch('music');
            this.scene.start('game');
        }
    
    }
}

export default Preloader;