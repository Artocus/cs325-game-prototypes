"use strict";

class Game extends Phaser.Scene{

    constructor(){
        super("game");
    }

    create(){
        this.punchSound = this.sound.add('punch');
        this.punchSound.setVolume(0.25);

        this.add.image(400, 300, 'preloaderBackground');
        this.add.image(400, 500, 'moveBox');

        this.chickenBody = this.add.image(200, 250, 'chicken_body_100');
        this.chickenLegs = this.add.image(200, 362, 'chicken_legs_100');
        this.chickenLArm = this.add.image(125, 282, 'chicken_larm_100');
        this.chickenRArm = this.add.image(275, 282, 'chicken_rarm_100');

        this.chickenEBody = this.add.image(600, 250, 'chicken_body_100_e');
        this.chickenELegs = this.add.image(600, 362, 'chicken_legs_100');
        this.chickenELArm = this.add.image(675, 282, 'chicken_rarm_100');
        this.chickenERArm = this.add.image(525, 282, 'chicken_larm_100');

        this.tipText = this.add.bitmapText(400, 100, 'atari', 'Use the Mouse', 32).setOrigin(0.5);

        this.moveOne = this.add.bitmapText(350, 450, 'atari', 'Right Hook', 24).setOrigin(1, 0);
        this.moveOne.setInteractive();
        this.moveOne.on('pointerover', () => this.overMove(this.moveOne));
        this.moveOne.on('pointerout', () => this.outMove(this.moveOne));
        this.moveOne.on('pointerdown', () => this.downMove(1));

        this.moveTwo = this.add.bitmapText(700, 450, 'atari', 'Left Hook', 24).setOrigin(1, 0);
        this.moveTwo.setInteractive();
        this.moveTwo.on('pointerover', () => this.overMove(this.moveTwo));
        this.moveTwo.on('pointerout', () => this.outMove(this.moveTwo));
        this.moveTwo.on('pointerdown', () => this.downMove(2));

        this.moveThree = this.add.bitmapText(325, 550, 'atari', 'Low Kick', 24).setOrigin(1, 0);
        this.moveThree.setInteractive();
        this.moveThree.on('pointerover', () => this.overMove(this.moveThree));
        this.moveThree.on('pointerout', () => this.outMove(this.moveThree));
        this.moveThree.on('pointerdown', () => this.downMove(3));

        this.moveFour = this.add.bitmapText(725, 550, 'atari', 'Reconfigure', 24).setOrigin(1, 0);
        this.moveFour.setInteractive();
        this.moveFour.on('pointerover', () => this.overMove(this.moveFour));
        this.moveFour.on('pointerout', () => this.outMove(this.moveFour));
        this.moveFour.on('pointerdown', () => this.downMove(4));

        this.playerBody = 100;
        this.playerRArm = 100;
        this.playerLArm = 100;
        this.playerLegs = 100;

        this.enemyBody = 100;
        this.enemyRArm = 100;
        this.enemyLArm = 100;
        this.enemyLegs = 100;

        this.playerStats = this.add.bitmapText(30, 30, 'atari', `Body: ${this.playerBody}\nRArm: ${this.playerRArm}\nLArm: ${this.playerLArm}\nLegs: ${this.playerLegs}`, 12).setOrigin(0);
        this.enemyStats = this.add.bitmapText(770, 30, 'atari', `Body: ${this.enemyBody}\nRArm: ${this.enemyRArm}\nLArm: ${this.enemyLArm}\nLegs: ${this.enemyLegs}`, 12).setOrigin(1, 0);

        this.turn = 0;

        this.moveTimer = this.time.addEvent({
            delay: 750,                // ms
            callback: this.endMove,
            //args: [],
            callbackScope: this,
            loop: true
        });
        this.moveTimer.paused = true;
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

    downMove(moveNumber){
        this.moveOne.disableInteractive();
        this.moveTwo.disableInteractive();
        this.moveThree.disableInteractive();
        this.moveFour.disableInteractive();

        switch(moveNumber){
            case(1):
                this.punchSound.play();
                if(this.enemyLArm == 0){
                    this.enemyBody -= this.playerRArm;
                }else{
                    this.enemyBody -= Math.round(this.playerRArm*0.125);
                    this.enemyLArm -= Math.round(this.playerRArm*0.375);
                }
                break;
            case(2):
                this.punchSound.play();
                if(this.enemyRArm == 0){
                    this.enemyBody -= this.playerLArm;
                }else{
                    this.enemyBody -= Math.round(this.playerLArm*0.125);
                    this.enemyRArm -= Math.round(this.playerLArm*0.375);
                }
                break;
            case(3):
                this.punchSound.play();
                if(this.enemyLegs == 0){
                    this.enemyBody -= this.playerLegs;
                }else{
                    this.enemyBody -= Math.round(this.playerLegs*0.125);
                    this.enemyLegs -= Math.round(this.playerLegs*0.375);
                }
                break;
            case(4):
                this.scene.launch('reconfigure');
                break;
        }

        if(this.enemyBody <= 0){
            this.enemyBody = 0;
            this.add.bitmapText(400, 100, 'atari', 'You Win!', 32).setOrigin(0.5);
            this.updateImages();
            this.enemyStats.setText(`Body: ${this.enemyBody}\nRArm: ${this.enemyRArm}\nLArm: ${this.enemyLArm}\nLegs: ${this.enemyLegs}`);
            return;
        }
        if(this.enemyRArm < 0){
            this.enemyRArm = 0;
        }
        if(this.enemyLArm < 0){
            this.enemyLArm = 0;
        }
        if(this.enemyLegs < 0){
            this.enemyLegs = 0;
        }

        this.updateImages();

        this.enemyStats.setText(`Body: ${this.enemyBody}\nRArm: ${this.enemyRArm}\nLArm: ${this.enemyLArm}\nLegs: ${this.enemyLegs}`);

        this.moveTimer.paused = false;
    }

    endMove(){
        this.moveTimer.paused = true;
        if(this.turn == 0){
            var enemyMove = Phaser.Math.Between(1, 3);

            if(this.enemyRArm == 0 || this.enemyLArm == 0 || this.enemyLegs == 0){
                enemyMove = 4;
            }else if(this.playerRArm <= this.playerLArm && this.playerRArm <= this.playerLegs){
                enemyMove = 2;
            }else if(this.playerLArm <= this.playerRArm && this.playerLArm <= this.playerLegs){
                enemyMove = 1;
            }else if(this.playerLegs <= this.playerLArm && this.playerLegs <= this.playerRegs){
                enemyMove = 3;
            }

            switch(enemyMove){
                case(1):
                    this.punchSound.play();
                    if(this.playerLArm == 0){
                        this.playerBody -= this.enemyRArm;
                    }else{
                        this.playerBody -= Math.round(this.enemyRArm*0.125);
                        this.playerLArm -= Math.round(this.enemyRArm*0.375);
                    }
                    break;
                case(2):
                    this.punchSound.play();
                    if(this.playerRArm == 0){
                        this.playerBody -= this.enemyLArm;
                    }else{
                        this.playerBody -= Math.round(this.enemyLArm*0.125);
                        this.playerRArm -= Math.round(this.enemyLArm*0.375);
                    }
                    break;
                case(3):
                    this.punchSound.play();
                    if(this.playerLegs == 0){
                        this.playerBody -= this.enemyLegs;
                    }else{
                        this.playerBody -= Math.round(this.enemyLegs*0.125);
                        this.playerLegs -= Math.round(this.enemyLegs*0.375);
                    }
                    break;
                case(4):
                    var amount;
                    if(this.enemyRArm >= this.enemyLArm && this.enemyRArm >= this.enemyLegs){
                        amount = Math.round(this.enemyRArm/2);
                        this.enemyRArm -= amount;
                    }else if(this.enemyLArm >= this.enemyRArm && this.enemyLArm >= this.enemyLegs){
                        amount = Math.round(this.enemyLArm/2);
                        this.enemyLArm -= amount;
                    }else if(this.enemyLegs >= this.enemyLArm && this.enemyLegs >= this.enemyRArm){
                        amount = Math.round(this.enemyLegs/2);
                        this.enemyLegs -= amount;
                    }
                    if(this.enemyRArm == 0){
                        this.enemyRArm += amount;
                    }else if(this.enemyLArm == 0){
                        this.enemyLArm += amount;
                    }else if(this.enemyLegs == 0){
                        this.enemyLegs += amount;
                    }
                    this.enemyStats.setText(`Body: ${this.enemyBody}\nRArm: ${this.enemyRArm}\nLArm: ${this.enemyLArm}\nLegs: ${this.enemyLegs}`);
                    break;
            }
    
            if(this.playerBody <= 0){
                this.playerBody = 0;
                this.add.bitmapText(400, 100, 'atari', 'You Loose!', 32).setOrigin(0.5);
                this.updateImages();
                this.playerStats.setText(`Body: ${this.playerBody}\nRArm: ${this.playerRArm}\nLArm: ${this.playerLArm}\nLegs: ${this.playerLegs}`);
                return;
            }
            if(this.playerRArm < 0){
                this.playerRArm = 0;
            }
            if(this.playerLArm < 0){
                this.playerLArm = 0;
            }
            if(this.playerLegs < 0){
                this.playerLegs = 0;
            }

            this.updateImages();
    
            this.playerStats.setText(`Body: ${this.playerBody}\nRArm: ${this.playerRArm}\nLArm: ${this.playerLArm}\nLegs: ${this.playerLegs}`);
    
            this.turn = 1;
            this.moveTimer.paused = false;
        }else{
            this.turn = 0
            this.moveOne.setInteractive();
            this.moveTwo.setInteractive();
            this.moveThree.setInteractive();
            this.moveFour.setInteractive();
        }
    }

    updateImages(){
        if(this.playerBody > 66){
            this.chickenBody.setTexture('chicken_body_100');
        }else if(this.playerBody > 33){
            this.chickenBody.setTexture('chicken_body_66');
        }else if(this.playerBody >= 0){
            this.chickenBody.setTexture('chicken_body_33');
        }

        if(this.playerLegs > 66){
            this.chickenLegs.setTexture('chicken_legs_100');
        }else if(this.playerLegs > 33){
            this.chickenLegs.setTexture('chicken_legs_66');
        }else if(this.playerLegs > 0){
            this.chickenLegs.setTexture('chicken_legs_33');
        }else if(this.playerLegs <= 0){
            this.chickenLegs.setTexture();
        }

        if(this.playerLArm > 66){
            this.chickenLArm.setTexture('chicken_larm_100');
        }else if(this.playerLArm > 33){
            this.chickenLArm.setTexture('chicken_larm_66');
        }else if(this.playerLArm > 0){
            this.chickenLArm.setTexture('chicken_larm_33');
        }else if(this.playerLArm <= 0){
            this.chickenLArm.setTexture();
        }

        if(this.playerRArm > 66){
            this.chickenRArm.setTexture('chicken_rarm_100');
        }else if(this.playerRArm > 33){
            this.chickenRArm.setTexture('chicken_rarm_66');
        }else if(this.playerRArm > 0){
            this.chickenRArm.setTexture('chicken_rarm_33');
        }else if(this.playerRArm <= 0){
            this.chickenRArm.setTexture();
        }

        if(this.enemyBody > 66){
            this.chickenEBody.setTexture('chicken_body_100_e');
        }else if(this.enemyBody > 33){
            this.chickenEBody.setTexture('chicken_body_66_e');
        }else if(this.enemyBody >= 0){
            this.chickenEBody.setTexture('chicken_body_33_e');
        }

        if(this.enemyLegs > 66){
            this.chickenELegs.setTexture('chicken_legs_100');
        }else if(this.enemyLegs > 33){
            this.chickenELegs.setTexture('chicken_legs_66');
        }else if(this.enemyLegs > 0){
            this.chickenELegs.setTexture('chicken_legs_33');
        }else if(this.enemyLegs <= 0){
            this.chickenELegs.setTexture();
        }

        if(this.enemyLArm > 66){
            this.chickenELArm.setTexture('chicken_rarm_100');
        }else if(this.enemyLArm > 33){
            this.chickenELArm.setTexture('chicken_rarm_66');
        }else if(this.enemyLArm > 0){
            this.chickenELArm.setTexture('chicken_rarm_33');
        }else if(this.enemyLArm <= 0){
            this.chickenELArm.setTexture();
        }

        if(this.enemyRArm > 66){
            this.chickenERArm.setTexture('chicken_larm_100');
        }else if(this.enemyRArm > 33){
            this.chickenERArm.setTexture('chicken_larm_66');
        }else if(this.enemyRArm > 0){
            this.chickenERArm.setTexture('chicken_larm_33');
        }else if(this.enemyRArm <= 0){
            this.chickenERArm.setTexture();
        }
    }
}
export default Game;