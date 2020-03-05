"use strict";

class MainMenu extends Phaser.Scene{

    constructor(){
        super("mainmenu");
    }

    create(){
        this.background = this.add.sprite(0, 0, 'preloaderBackground').setOrigin(0);

        this.text = this.add.bitmapText(400, 100, 'atari', 'Cock Fighting', 58).setOrigin(0.5, 0);

        this.button = this.add.sprite(300, 400, 'start_button').setOrigin(0);
        this.button.setInteractive();
        this.button.on('pointerdown', () => this.pointerDown());
        this.button.on('pointerover', () => this.pointerOver());
        this.button.on('pointerout', () => this.pointerOut());
    }

    pointerOver(){
        this.button.setTexture('start_button_over');
    }

    pointerOut(){
        this.button.setTexture('start_button');
    }

    pointerDown(){
        this.scene.launch('music');
        this.scene.start('game');
    }
}

export default MainMenu;