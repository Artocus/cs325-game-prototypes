"use strict";

class Controls extends Phaser.Scene{

    constructor(){
        super("controls");
    }

    create(){
        this.keyboardText = this.add.bitmapText(200, 175, 'atari', 'Keyboard', 32).setOrigin(0.5, 0);
        //this.keytarText = this.add.bitmapText(600, 175, 'atari', 'Keytar', 32).setOrigin(0.5, 0);
        this.keyboard = this.add.sprite(200, 300, 'keyboard').setOrigin(0.5);
        this.keyboard.setScale(0.35);
        //this.keytar = this.add.sprite(600, 300, 'keytar').setOrigin(0.5);
        //this.keytar.setScale(0.35);
        this.keyboard.setInteractive();
        //this.keytar.setInteractive();
        this.keyboard.on('pointerdown', () => this.pointerDown(1));
        //this.keytar.on('pointerdown', () => this.pointerDown(0));
    }

    pointerOver(){
        this.button.setTexture('start_button_over');
    }

    pointerOut(){
        this.button.setTexture('start_button');
    }

    pointerDown(c){
        this.controls = c;
        this.scene.start('loadsong');
    }
}

export default Controls;