"use strict";

class Preloader extends Phaser.Scene{

    constructor(){
        super('preloader');
    }
    preload() {
    
        this.ready = false;

        //	These are the assets we loaded in Boot.js
        //	A nice sparkly background and a loading progress bar
        this.add.sprite(300, 400, 'loading_bar_background').setOrigin(0);
        this.add.sprite(300, 400, 'loading_bar_boarder').setOrigin(0);
        this.preloadBar = this.add.sprite(300, 400, 'loading_bar_fill').setOrigin(0);
    
        //	This sets the preloadBar sprite as a loader sprite.
        //	What that does is automatically crop the sprite from 0 to full-width
        //	as the files below are loaded in.
        this.load.on('progress', n => this.preloadBar.setScale(n,1));
    
        //	Here we load the rest of the assets our game needs.
        //	As this is just a Project Template I've not provided these assets, swap them for your own.
        this.load.image('keytar', 'assets/Keytar.png');
        this.load.image('keyboard', 'assets/Keyboard.png');
        this.load.image('bar', 'assets/Bar.png');
        this.load.audio('#A2', ['assets/^A2.wav']);
        this.load.audio('#A3', ['assets/^A3.wav']);
        this.load.audio('#A4', ['assets/^A4.wav']);
        this.load.audio('#A5', ['assets/^A5.wav']);
        this.load.audio('#C3', ['assets/^C3.wav']);
        this.load.audio('#C4', ['assets/^C4.wav']);
        this.load.audio('#C5', ['assets/^C5.wav']);
        this.load.audio('#D3', ['assets/^D3.wav']);
        this.load.audio('#D4', ['assets/^D4.wav']);
        this.load.audio('#D5', ['assets/^D5.wav']);
        this.load.audio('#F2', ['assets/^F2.wav']);
        this.load.audio('#F3', ['assets/^F3.wav']);
        this.load.audio('#F4', ['assets/^F4.wav']);
        this.load.audio('#F5', ['assets/^F5.wav']);
        this.load.audio('#G2', ['assets/^G2.wav']);
        this.load.audio('#G3', ['assets/^G3.wav']);
        this.load.audio('#G4', ['assets/^G4.wav']);
        this.load.audio('#G5', ['assets/^G5.wav']);
        this.load.audio('A2', ['assets/A2.wav']);
        this.load.audio('A3', ['assets/A3.wav']);
        this.load.audio('A4', ['assets/A4.wav']);
        this.load.audio('A5', ['assets/A5.wav']);
        this.load.audio('B2', ['assets/B2.wav']);
        this.load.audio('B3', ['assets/B3.wav']);
        this.load.audio('B4', ['assets/B4.wav']);
        this.load.audio('B5', ['assets/B5.wav']);
        this.load.audio('C3', ['assets/C3.wav']);
        this.load.audio('C4', ['assets/C4.wav']);
        this.load.audio('C5', ['assets/C5.wav']);
        this.load.audio('C6', ['assets/C6.wav']);
        this.load.audio('D3', ['assets/D3.wav']);
        this.load.audio('D4', ['assets/D4.wav']);
        this.load.audio('D5', ['assets/D5.wav']);
        this.load.audio('E2', ['assets/E2.wav']);
        this.load.audio('E3', ['assets/E3.wav']);
        this.load.audio('E4', ['assets/E4.wav']);
        this.load.audio('E5', ['assets/E5.wav']);
        this.load.audio('F2', ['assets/F2.wav']);
        this.load.audio('F3', ['assets/F3.wav']);
        this.load.audio('F4', ['assets/F4.wav']);
        this.load.audio('F5', ['assets/F5.wav']);
        this.load.audio('G2', ['assets/G2.wav']);
        this.load.audio('G3', ['assets/G3.wav']);
        this.load.audio('G4', ['assets/G4.wav']);
        this.load.audio('G5', ['assets/G5.wav']);
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
            this.scene.start('controls');
        }
    
    }
}

export default Preloader;