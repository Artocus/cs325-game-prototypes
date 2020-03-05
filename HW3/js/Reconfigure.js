"user strict";

class Reconfigure extends Phaser.Scene{
    constructor(){
        super("reconfigure");
    }


    create(){
        this.scene.pause('game');
        
        var game = this.scene.get('game');

        this.add.image(400, 250, 'reconfigureBox');

        this.bodyText = this.add.bitmapText(475, 100, 'atari', 'Body', 32).setOrigin(1);
        this.bodyText.setInteractive().on('pointerover', () => this.overMove(this.bodyText));
        this.bodyText.on('pointerout', () => this.outMove(this.bodyText));
        this.bodyText.on('pointerdown', () => this.selectPart(0));
        this.bodyText.on('pointerup', () => this.upMove());

        this.bodyStat = this.add.bitmapText(475, 125, 'atari', `${game.playerBody}`, 32).setOrigin(1);

        this.rArmText = this.add.bitmapText(675, 200, 'atari', 'RArm', 32).setOrigin(1);
        this.rArmText.setInteractive().on('pointerover', () => this.overMove(this.rArmText));
        this.rArmText.on('pointerout', () => this.outMove(this.rArmText));
        this.rArmText.on('pointerdown', () => this.selectPart(1));
        this.rArmText.on('pointerup', () => this.upMove());

        this.rArmStat = this.add.bitmapText(675, 225, 'atari', `${game.playerRArm}`, 32).setOrigin(1);

        this.lArmText = this.add.bitmapText(275, 200, 'atari', 'LArm', 32).setOrigin(1);
        this.lArmText.setInteractive().on('pointerover', () => this.overMove(this.lArmText));
        this.lArmText.on('pointerout', () => this.outMove(this.lArmText));
        this.lArmText.on('pointerdown', () => this.selectPart(2));
        this.lArmText.on('pointerup', () => this.upMove());

        this.lArmStat = this.add.bitmapText(275, 225, 'atari', `${game.playerLArm}`, 32).setOrigin(1);

        this.legsText = this.add.bitmapText(475, 400, 'atari', 'Legs', 32).setOrigin(1);
        this.legsText.setInteractive().on('pointerover', () => this.overMove(this.legsText));
        this.legsText.on('pointerout', () => this.outMove(this.legsText));
        this.legsText.on('pointerdown', () => this.selectPart(3));
        this.legsText.on('pointerup', () => this.upMove());

        this.legsStat = this.add.bitmapText(475, 425, 'atari', `${game.playerLegs}`, 32).setOrigin(1);

        this.backText = this.add.bitmapText(250, 400, 'atari', 'Back', 20).setOrigin(1);
        this.backText.setInteractive().on('pointerover', () => this.overMove(this.backText));
        this.backText.on('pointerout', () => this.outMove(this.backText));
        this.backText.on('pointerdown', () => this.returnToGame());

        this.transferTimer = this.time.addEvent({
            delay: 50,                // ms
            callback: this.transfer,
            //args: [],
            callbackScope: this,
            loop: true
        });
        this.transferTimer.paused = true;
    }

    overMove(move){
        if(this.tipText){
            this.tipText.destroy();
        }
        move.setText(">" + move.text);
    }

    outMove(move){
        move.setText(move.text.substring(1, move.text.length));
    }

    upMove(){
        this.transferTimer.paused = true;
    }

    selectPart(part){
        if(this.from == null){
            this.from = part;
            switch(this.from){
                case 0:
                    this.bodyText.setTint(0x00ff00);
                    this.bodyText.disableInteractive();
                    break;
                case 1:
                    this.rArmText.setTint(0x00ff00);
                    this.rArmText.disableInteractive();
                    break;
                case 2:
                    this.lArmText.setTint(0x00ff00);
                    this.lArmText.disableInteractive();
                    break;
                case 3:
                    this.legsText.setTint(0x00ff00);
                    this.legsText.disableInteractive();
                    break;
            }
        }else{
            this.to = part;
            switch(this.to){
                case 0:
                    this.rArmText.disableInteractive();
                    this.lArmText.disableInteractive();
                    this.legsText.disableInteractive();
                    break;
                case 1:
                    this.bodyText.disableInteractive();
                    this.lArmText.disableInteractive();
                    this.legsText.disableInteractive();
                    break;
                case 2:
                    this.bodyText.disableInteractive();
                    this.rArmText.disableInteractive();
                    this.legsText.disableInteractive();
                    break;
                case 3:
                    this.bodyText.disableInteractive();
                    this.rArmText.disableInteractive();
                    this.lArmText.disableInteractive();
                    break;
            }

            this.transferTimer.paused = false;
        }
    }

    transfer(){
        var game = this.scene.get('game');

        switch(this.from){
            case 0:
                if(game.playerBody == 0){
                    return;
                }
                game.playerBody--;
                break;
            case 1:
                if(game.playerRArm == 0){
                    return;
                }
                game.playerRArm--;
                break;
            case 2:
                if(game.playerLArm == 0){
                    return;
                }
                game.playerLArm--;
                break;
            case 3:
                if(game.playerLegs == 0){
                    return;
                }
                game.playerLegs--;
                break;
        }
        switch(this.to){
            case 0:
                game.playerBody++;
                break;
            case 1:
                game.playerRArm++;
                break;
            case 2:
                game.playerLArm++;
                break;
            case 3:
                game.playerLegs++;
                break;
        }
        game.updateImages();
        this.bodyStat.setText(`${game.playerBody}`);
        this.rArmStat.setText(`${game.playerRArm}`);
        this.lArmStat.setText(`${game.playerLArm}`);
        this.legsStat.setText(`${game.playerLegs}`);
        game.playerStats.setText(`Body: ${game.playerBody}\nRArm: ${game.playerRArm}\nLArm: ${game.playerLArm}\nLegs: ${game.playerLegs}`);
    }

    returnToGame(){
        this.from = null;
        this.to = null;
        this.scene.resume('game');
        this.scene.stop();
    }
}

export default Reconfigure;