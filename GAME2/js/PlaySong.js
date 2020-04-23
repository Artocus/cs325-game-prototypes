"use strict";

class PlaySong extends Phaser.Scene{

    constructor(){
        super("playsong");
    }

    create(){
        this.song = this.scene.get('loadsong');
        this.i = 0;
        console.log(this.song.notes.length);
        console.log(this.song.time);

        this.timeInScene = 0;

        this.songEnded = false;

        this.bar = [];

        this.bar[0] = this.add.sprite(200, 0, 'bar').setOrigin(0.5, 0);
        this.bar[1] = this.add.sprite(350, 0, 'bar').setOrigin(0.5, 0);
        this.bar[2] = this.add.sprite(500, 0, 'bar').setOrigin(0.5, 0);
        this.bar[3] = this.add.sprite(650, 0, 'bar').setOrigin(0.5, 0);

        this.keys = this.input.keyboard.addKeys({
            key1: 'D',
            key2: 'F',
            key3: 'J',
            key4: 'K'
        });

        this.keyTime = [0, 0, 0, 0];

        this.keys.key1.on("down", () => this.activateKey(0));
        this.keys.key2.on("down", () => this.activateKey(1));
        this.keys.key3.on("down", () => this.activateKey(2));
        this.keys.key4.on("down", () => this.activateKey(3));

        this.$A2 = this.sound.add('#A2');
        this.$A3 = this.sound.add('#A3');
        this.$A4 = this.sound.add('#A4');
        this.$A5 = this.sound.add('#A5');
        this.$C3 = this.sound.add('#C3');
        this.$C4 = this.sound.add('#C4');
        this.$C5 = this.sound.add('#C5');
        this.$D3 = this.sound.add('#D3');
        this.$D4 = this.sound.add('#D4');
        this.$D5 = this.sound.add('#D5');
        this.$F2 = this.sound.add('#F2');
        this.$F3 = this.sound.add('#F3');
        this.$F4 = this.sound.add('#F4');
        this.$F5 = this.sound.add('#F5');
        this.$G2 = this.sound.add('#G2');
        this.$G3 = this.sound.add('#G3');
        this.$G4 = this.sound.add('#G4');
        this.$G5 = this.sound.add('#G5');
        this.A2 = this.sound.add('A2');
        this.A3 = this.sound.add('A3');
        this.A4 = this.sound.add('A4');
        this.A5 = this.sound.add('A5');
        this.B2 = this.sound.add('B2');
        this.B3 = this.sound.add('B3');
        this.B4 = this.sound.add('B4');
        this.B5 = this.sound.add('B5');
        this.C3 = this.sound.add('C3');
        this.C4 = this.sound.add('C4');
        this.C5 = this.sound.add('C5');
        this.C6 = this.sound.add('C6');
        this.D3 = this.sound.add('D3');
        this.D4 = this.sound.add('D4');
        this.D5 = this.sound.add('D5');
        this.E2 = this.sound.add('E2');
        this.E3 = this.sound.add('E3');
        this.E4 = this.sound.add('E4');
        this.E5 = this.sound.add('E5');
        this.F2 = this.sound.add('F2');
        this.F3 = this.sound.add('F3');
        this.F4 = this.sound.add('F4');
        this.F5 = this.sound.add('F5');
        this.G2 = this.sound.add('G2');
        this.G3 = this.sound.add('G3');
        this.G4 = this.sound.add('G4');
        this.G5 = this.sound.add('G5');

        this.noteIndex = -1;
        this.currentNote = 0;
        this.noteBlocks = [];

        var notePos = 0;
        for(var i = 0; i < this.song.notes.length; i++){
            for(var j = 0; j < this.song.notes[i].note.length; j++){
                if(this.song.notes[i].note[j].includes('Z')){
                    continue;
                }
                var x;
                if(this.song.notes[i].note[j].includes('2')){
                    x = 200;
                }else if(this.song.notes[i].note[j].includes('3')){
                    x = 350;
                }else if(this.song.notes[i].note[j].includes('4')){
                    x = 500;
                }else if(this.song.notes[i].note[j].includes('5') || this.song.notes[i].note[j].includes('6')){
                    x = 650
                }else{
                    continue;
                }
                this.noteBlocks.push(this.add.sprite(x, -notePos * 0.4, 'loading_bar_fill').setOrigin(0.5, 1).setScale(0.5, 0.25));
            }
            notePos += this.song.notes[i].length[0] * 1000;
        }

        this.timeText = this.add.bitmapText(20, 20, 'atari', `${this.song.time}`, 24);

        this.score = 0;
        this.scoreText = this.add.bitmapText(20, 40, 'atari', `100%`, 24);

        this.noteTimer = this.time.addEvent({
            delay: 1500,                // ms
            callback: this.playNextNote,
            //args: [],
            callbackScope: this,
            loop: true
        });
    }

    activateKey(i){
        this.keyTime[i]=0;
        this.bar[i].setTintFill(0, 0, 0xffffff, 0xffffff);
    }

    playNextNote(){
        this.noteTimer.paused = true;
        this.$A2.stop();
        this.$A3.stop();
        this.$A4.stop();
        this.$A5.stop();
        this.$C3.stop();
        this.$C4.stop();
        this.$C5.stop();
        this.$D3.stop();
        this.$D4.stop();
        this.$D5.stop();
        this.$F2.stop();
        this.$F3.stop();
        this.$F4.stop();
        this.$F5.stop();
        this.$G2.stop();
        this.$G3.stop();
        this.$G4.stop();
        this.$G5.stop();
        this.A2.stop();
        this.A3.stop();
        this.A4.stop();
        this.A5.stop();
        this.B2.stop();
        this.B3.stop();
        this.B4.stop();
        this.B5.stop();
        this.C3.stop();
        this.C4.stop();
        this.C5.stop();
        this.D3.stop();
        this.D4.stop();
        this.D5.stop();
        this.E2.stop();
        this.E3.stop();
        this.E4.stop();
        this.E5.stop();
        this.F2.stop();
        this.F3.stop();
        this.F4.stop();
        this.F5.stop();
        this.G2.stop();
        this.G3.stop();
        this.G4.stop();
        this.G5.stop();
        this.noteIndex++;
        if(this.noteIndex == this.song.notes.length){
            this.songEnded = true;
            console.log("Ended");
            this.scene.launch('score');
            this.scene.sleep();
            return;
        }
        this.noteTimer.delay = this.song.notes[this.noteIndex].length[0] * 1000;
        //console.log("Length: " + this.song.notes[this.noteIndex].length[0] * 1000);
        for(var i = 0; i < this.song.notes[this.noteIndex].note.length; i++){
            if(this.song.notes[this.noteIndex].note[i].includes('Z')){
                //console.log("Note: " + i + " Z");
                continue;
            }
            while(this.song.notes[this.noteIndex].note[i].includes("##")){
                this.song.notes[this.noteIndex].note[i] = this.song.notes[this.noteIndex].note[i].substring(2);
                var note = this.song.notes[this.noteIndex].note[i];
                while("ABCDEFG".includes(note.charAt(0))){
                    note = note.substring(1);
                }
                switch(note.charAt(0)){
                    case 'A':
                        this.song.notes[this.noteIndex].note[i] = this.song.notes[this.noteIndex].note[i].substring(0, this.song.notes[this.noteIndex].note[i].indexOf("A")) + "B" + this.song.notes[this.noteIndex].note[i].substring(this.song.notes[this.noteIndex].note[i].indexOf("A")+1);
                        break;
                    case 'B':
                        this.song.notes[this.noteIndex].note[i] = this.song.notes[this.noteIndex].note[i].substring(0, this.song.notes[this.noteIndex].note[i].indexOf("B")) + "C" + parseInt(this.song.notes[this.noteIndex].note[i].charAt(this.song.notes[this.noteIndex].note[i].indexOf("B")+1))+1 + this.song.notes[this.noteIndex].note[i].substring(this.song.notes[this.noteIndex].note[i].indexOf("B")+2);
                        break;
                    case 'C':
                        this.song.notes[this.noteIndex].note[i] = this.song.notes[this.noteIndex].note[i].substring(0, this.song.notes[this.noteIndex].note[i].indexOf("C")) + "D" + this.song.notes[this.noteIndex].note[i].substring(this.song.notes[this.noteIndex].note[i].indexOf("C")+1);
                        break;
                    case 'D':
                        this.song.notes[this.noteIndex].note[i] = this.song.notes[this.noteIndex].note[i].substring(0, this.song.notes[this.noteIndex].note[i].indexOf("D")) + "E" + this.song.notes[this.noteIndex].note[i].substring(this.song.notes[this.noteIndex].note[i].indexOf("D")+1);
                        break;
                    case 'E':
                        this.song.notes[this.noteIndex].note[i] = this.song.notes[this.noteIndex].note[i].substring(0, this.song.notes[this.noteIndex].note[i].indexOf("E")) + "F" + this.song.notes[this.noteIndex].note[i].substring(this.song.notes[this.noteIndex].note[i].indexOf("E")+1);
                        break;
                    case 'F':
                        this.song.notes[this.noteIndex].note[i] = this.song.notes[this.noteIndex].note[i].substring(0, this.song.notes[this.noteIndex].note[i].indexOf("F")) + "G" + this.song.notes[this.noteIndex].note[i].substring(this.song.notes[this.noteIndex].note[i].indexOf("F")+1);
                        break;
                    case 'G':
                        this.song.notes[this.noteIndex].note[i] = this.song.notes[this.noteIndex].note[i].substring(0, this.song.notes[this.noteIndex].note[i].indexOf("G")) + "A" + this.song.notes[this.noteIndex].note[i].substring(this.song.notes[this.noteIndex].note[i].indexOf("G")+1);
                        break;
                }
            }
            while(this.song.notes[this.noteIndex].note[i].includes("bb")){
                this.song.notes[this.noteIndex].note[i] = this.song.notes[this.noteIndex].note[i].substring(2);
                var note = this.song.notes[this.noteIndex].note[i];
                while("ABCDEFG".includes(note.charAt(0))){
                    note = note.substring(1);
                }
                switch(note.charAt(0)){
                    case 'A':
                        this.song.notes[this.noteIndex].note[i] = this.song.notes[this.noteIndex].note[i].substring(0, this.song.notes[this.noteIndex].note[i].indexOf("A")) + "B" + this.song.notes[this.noteIndex].note[i].substring(this.song.notes[this.noteIndex].note[i].indexOf("A")+1);
                        break;
                    case 'B':
                        this.song.notes[this.noteIndex].note[i] = this.song.notes[this.noteIndex].note[i].substring(0, this.song.notes[this.noteIndex].note[i].indexOf("B")) + "C" + parseInt(this.song.notes[this.noteIndex].note[i].charAt(this.song.notes[this.noteIndex].note[i].indexOf("B")+1))+1 + this.song.notes[this.noteIndex].note[i].substring(this.song.notes[this.noteIndex].note[i].indexOf("B")+2);
                        break;
                    case 'C':
                        this.song.notes[this.noteIndex].note[i] = this.song.notes[this.noteIndex].note[i].substring(0, this.song.notes[this.noteIndex].note[i].indexOf("C")) + "D" + this.song.notes[this.noteIndex].note[i].substring(this.song.notes[this.noteIndex].note[i].indexOf("C")+1);
                        break;
                    case 'D':
                        this.song.notes[this.noteIndex].note[i] = this.song.notes[this.noteIndex].note[i].substring(0, this.song.notes[this.noteIndex].note[i].indexOf("D")) + "E" + this.song.notes[this.noteIndex].note[i].substring(this.song.notes[this.noteIndex].note[i].indexOf("D")+1);
                        break;
                    case 'E':
                        this.song.notes[this.noteIndex].note[i] = this.song.notes[this.noteIndex].note[i].substring(0, this.song.notes[this.noteIndex].note[i].indexOf("E")) + "F" + this.song.notes[this.noteIndex].note[i].substring(this.song.notes[this.noteIndex].note[i].indexOf("E")+1);
                        break;
                    case 'F':
                        this.song.notes[this.noteIndex].note[i] = this.song.notes[this.noteIndex].note[i].substring(0, this.song.notes[this.noteIndex].note[i].indexOf("F")) + "G" + this.song.notes[this.noteIndex].note[i].substring(this.song.notes[this.noteIndex].note[i].indexOf("F")+1);
                        break;
                    case 'G':
                        this.song.notes[this.noteIndex].note[i] = this.song.notes[this.noteIndex].note[i].substring(0, this.song.notes[this.noteIndex].note[i].indexOf("G")) + "A" + this.song.notes[this.noteIndex].note[i].substring(this.song.notes[this.noteIndex].note[i].indexOf("G")+1);
                        break;
                }
            }
            if(this.song.notes[this.noteIndex].note[i].includes("=")){
                while(!"ABCDEFG".includes(this.song.notes[this.noteIndex].note[i].charAt(0))){
                    this.song.notes[this.noteIndex].note[i] = this.song.notes[this.noteIndex].note[i].substring(1);
                }
            }
            //console.log("Note: " + i + " " + this.song.notes[this.noteIndex].note[i]);
            switch(this.song.notes[this.noteIndex].note[i]){
                case "E2":
                    this.E2.play();
                    break;
                case "F2":
                    this.F2.play();
                    break;
                case "#F2":
                case "bG2":
                    this.$F2.play();
                    break;
                case "G2":
                    this.G2.play();
                    break;
                case "#G2":
                case "bA2":
                    this.$G2.play();
                    break;
                case "A2":
                    this.A2.play();
                    break;
                case "#A2":
                case "bB2":
                    this.$A2.play();
                    break;
                case "B2":
                    this.B2.play();
                    break;
                case "C3":
                    this.C3.play();
                    break;
                case "#C3":
                case "bD3":
                    this.$C3.play();
                    break;
                case "D3":
                    this.D3.play();
                    break;
                case "#D3":
                case "bE3":
                    this.$D3.play();
                    break;
                case "E2":
                    this.E2.play();
                    break;
                case "F2":
                    this.F2.play();
                    break;
                case "#F2":
                case "bG2":
                    this.$F2.play();
                    break;
                case "G2":
                    this.G2.play();
                    break;
                case "#G2":
                case "bA2":
                    this.$G2.play();
                    break;
                case "A2":
                    this.A2.play();
                    break;
                case "#A2":
                case "bB2":
                    this.$A2.play();
                    break;
                case "B2":
                    this.B2.play();
                    break;
                case "C3":
                    this.C3.play();
                    break;
                case "#C3":
                case "bD3":
                    this.$C3.play();
                    break;
                case "D3":
                    this.D3.play();
                    break;
                case "#D3":
                case "bE3":
                    this.$D3.play();
                    break;
                case "E3":
                    this.E3.play();
                    break;
                case "F3":
                    this.F3.play();
                    break;
                case "#F3":
                case "bG3":
                    this.$F3.play();
                    break;
                case "G3":
                    this.G3.play();
                    break;
                case "#G3":
                case "bA3":
                    this.$G3.play();
                    break;
                case "A3":
                    this.A3.play();
                    break;
                case "#A3":
                case "bB3":
                    this.$A3.play();
                    break;
                case "B3":
                    this.B3.play();
                    break;
                case "C4":
                    this.C4.play();
                    break;
                case "#C4":
                case "bD4":
                    this.$C4.play();
                    break;
                case "D4":
                    this.D4.play();
                    break;
                case "#D4":
                case "bE4":
                    this.$D4.play();
                    break;
                case "E4":
                    this.E4.play();
                    break;
                case "F4":
                    this.F4.play();
                    break;
                case "#F4":
                case "bG4":
                    this.$F4.play();
                    break;
                case "G4":
                    this.G4.play();
                    break;
                case "#G4":
                case "bA4":
                    this.$G4.play();
                    break;
                case "A4":
                    this.A4.play();
                    break;
                case "#A4":
                case "bB4":
                    this.$A4.play();
                    break;
                case "B4":
                    this.B4.play();
                    break;
                case "C5":
                    this.C5.play();
                    break;
                case "#C5":
                case "bD5":
                    this.$C5.play();
                    break;
                case "D5":
                    this.D5.play();
                    break;
                case "#D5":
                case "bE5":
                    this.$D5.play();
                    break;
                case "E5":
                    this.E5.play();
                    break;
                case "F5":
                    this.F5.play();
                    break;
                case "#F5":
                case "bG5":
                    this.$F5.play();
                    break;
                case "G5":
                    this.G5.play();
                    break;
                case "#G5":
                case "bA5":
                    this.$G5.play();
                    break;
                case "A5":
                    this.A5.play();
                    break;
                case "#A5":
                case "bB5":
                    this.$A5.play();
                    break;
                case "B5":
                    this.B5.play();
                    break;
                case "C6":
                    this.C6.play();
                    break;
            }
        }
        this.noteTimer.paused = false;
    }

    update(time, delta){
        this.timeInScene += delta;
        for(var i = 0; i < this.keyTime.length; i++){
            this.keyTime[i]+=delta;
            if(this.keyTime[i] >= 100){
                this.bar[i].clearTint();
            } 
        }
        this.timeText.setText(`${Math.floor((this.song.time - this.timeInScene/1000 + 1.5)/60)}:${Math.floor(this.song.time - this.timeInScene/1000 + 1.5)%60}`);
        for(var i = 0; i < this.noteBlocks.length; i++){
            this.noteBlocks[i].y += delta * 0.4;
            if(this.noteBlocks[i].y >= 640 && this.noteBlocks[i].y <= 700){
                this.currentNote++;
                var key;
                switch(this.noteBlocks[i].x){
                    case 200:
                        key = this.keyTime[0];
                        break;
                    case 350:
                        key = this.keyTime[1];
                        break;
                    case 500:
                        key = this.keyTime[2];
                        break;
                    case 650:
                        key = this.keyTime[3];
                        break;
                }
                if(key <= 200){
                    this.score++;
                    console.log("Hit " + key);
                }else{
                    console.log("Miss " + key);
                }
                this.scoreText.setText(`${(this.score/this.currentNote * 100).toFixed(2)}%`);
                this.noteBlocks[i].y = 750;
                this.noteBlocks[i].destroy();
            }
        }
    }
}
export default PlaySong;