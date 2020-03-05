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
        this.add.sprite(300, 400, 'loading_bar_background').setOrigin(0);
        this.add.sprite(300, 400, 'loading_bar_boarder').setOrigin(0);
        this.preloadBar = this.add.sprite(300, 400, 'loading_bar_fill').setOrigin(0);
    
        //	This sets the preloadBar sprite as a loader sprite.
        //	What that does is automatically crop the sprite from 0 to full-width
        //	as the files below are loaded in.
        this.load.on('progress', n => this.preloadBar.setScale(n,1));
    
        //	Here we load the rest of the assets our game needs.
        //	As this is just a Project Template I've not provided these assets, swap them for your own.
        this.load.image('moveBox', 'assets/Move_Box.png');
        this.load.image('chicken_body_100', 'assets/Chicken_Body_100.png');
        this.load.image('chicken_body_66', 'assets/Chicken_Body_66.png');
        this.load.image('chicken_body_33', 'assets/Chicken_Body_33.png');
        this.load.image('reconfigureBox', 'assets/Reconfigure_Box.png');
        this.load.image('chicken_legs_100', 'assets/Chicken_Legs_100.png');
        this.load.image('chicken_legs_66', 'assets/Chicken_Legs_66.png');
        this.load.image('chicken_legs_33', 'assets/Chicken_Legs_33.png');
        this.load.image('chicken_larm_100', 'assets/Chicken_LArm_100.png');
        this.load.image('chicken_larm_66', 'assets/Chicken_LArm_66.png');
        this.load.image('chicken_larm_33', 'assets/Chicken_LArm_33.png');
        this.load.image('chicken_rarm_100', 'assets/Chicken_RArm_100.png');
        this.load.image('chicken_rarm_66', 'assets/Chicken_RArm_66.png');
        this.load.image('chicken_rarm_33', 'assets/Chicken_RArm_33.png');
        this.load.image('chicken_body_100_e', 'assets/Chicken_Body_100_e.png');
        this.load.image('chicken_body_66_e', 'assets/Chicken_Body_66_e.png');
        this.load.image('chicken_body_33_e', 'assets/Chicken_Body_33_e.png');
        this.load.image('start_button', 'assets/Start_Button.png');
        this.load.image('start_button_over', 'assets/Start_Button_Over.png');
        this.load.audio('march_of_the_white_knights', ['assets/march_of_the_white_knights.ogg']);
        this.load.audio('punch', ['assets/punch_or_whack_-Vladimir-403040765.wav']);
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
            this.scene.start('mainmenu');
        }
    
    }
}

export default Preloader;