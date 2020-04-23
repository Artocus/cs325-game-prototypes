"use strict";

class Boot extends Phaser.Scene{

    constructor(){
        super('boot');
    }
    
    
    preload () {    
        //  Here we load the assets required for our Preloader state (in this case a background and a loading bar)
        this.load.image('loading_bar_background', 'assets/Loading_Box_Background.png');  
        this.load.image('loading_bar_fill', 'assets/Loading_Box_Fill.png');  
        this.load.image('loading_bar_boarder', 'assets/Loading_Box_Boarder.png');    
    }
    
    create () {
    
        //  By this point the preloader assets have loaded to the cache, we've set the game settings
        //  So now let's start the real preloader going
        this.scene.start('preloader');
    }
}

export default Boot;