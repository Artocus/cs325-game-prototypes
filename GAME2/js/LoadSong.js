"use strict";

class LoadSong extends Phaser.Scene{

    constructor(){
        super('loadsong');
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
    
        this.name = this.scene.get("selectsong").songName.text;

        //	Here we load the rest of the assets our game needs.
        //	As this is just a Project Template I've not provided these assets, swap them for your own.
        this.load.text(this.name, 'assets/'+this.name+'.abc');
        console.log(this.name);
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
            var text = this.cache.text.get(this.name);
            var unit = text.substring(text.indexOf("L: ")+3, text.indexOf("L: ")+6);
            var bpm = text.substring(text.indexOf("Q: ")+3, text.indexOf("Q: ")+10);
            unit = (parseInt(unit.substring(0, unit.indexOf('/')))/parseInt(unit.substring(unit.indexOf('/')+1)));
            var baseNote = (parseInt(bpm.substring(0, bpm.indexOf('/')))/parseInt(bpm.substring(bpm.indexOf('/')+1, bpm.indexOf('='))));
            bpm = parseInt(bpm.substring(bpm.indexOf('=')+1));
            var noteLength = 1/(bpm/60) * (unit/baseNote);
            console.log(noteLength);
            var key = text.substring(text.indexOf("K: ")+3, text.indexOf("\n", text.indexOf("K: ")+3));
            var noteTable = this.setKey(key);
            var notes = text.substring(text.indexOf("K: "+key)+5).trim();
            var ready = true;
            this.notes = [];
            this.time = 0;
            var out = 0;
            while(notes.length != 0 && out < 500000){
                out ++;
                var n = [];
                var l = [];
                var j = 0;

                var t = notes.substring(0, notes.indexOf(' ')).trim();

                if(!notes.includes(' ')){
                    t = notes;
                }

                if(t.includes("K: ")){
                    key = t.substring(t.indexOf("K: ")+3);
                    noteTable = this.setKey(key);
                }

                while(t != 0 && out < 500000){
                    out++;
                    if(out == 500000){
                        console.log(t);
                    }
                    if(t.charAt(0) == '['){
                        t = t.substring(1);
                    }else if(t.charAt(0) == ']'){
                        break;
                    }
                    n.push("");
                    l.push("");

                    while(t.charAt(0) == "^" && out < 500000){
                        out++;
                        if(out == 500000){
                            console.log(t);
                        }
                        n[j] += "#"
                        t = t.substring(1);
                    }
                    while(t.charAt(0) == "=" && out < 500000){
                        out++;
                        if(out == 500000){
                            console.log(t);
                        }
                        n[j] += "="
                        t = t.substring(1);
                    }
                    while(t.charAt(0) == "_" && out < 500000){
                        out++;
                        if(out == 500000){
                            console.log(t);
                        }
                        n[j] += "b"
                        t = t.substring(1);
                    }

                    var i = 0;
                    if("abcdef".includes(t.charAt(0))){
                        i = 4
                    }else{
                        i = 3;
                    }
                    while(t.includes("'")){
                        t = t.substring(0, t.indexOf("'")) + t.substring(t.indexOf("'")+1);
                        i += 1;
                    }
                    while(t.includes(',')){
                        t = t.substring(0, t.indexOf(",")) + t.substring(t.indexOf(",")+1);
                        i -= 1;
                    }

                    switch(t.toUpperCase().charAt(0)){
                        case 'C':
                            n[j] += noteTable[0];
                            break;
                        case 'D':
                            n[j] += noteTable[1];
                            break;
                        case 'E':
                            n[j] += noteTable[2];
                            break;
                        case 'F':
                            n[j] += noteTable[3];
                            break;
                        case 'G':
                            n[j] += noteTable[4];
                            break;
                        case 'A':
                            n[j] += noteTable[5];
                            break;
                        case 'B':
                            n[j] += noteTable[6];
                            break;
                        case 'Z':
                            n[j] = 'Z';
                    }
                    n[j] += i;

                        while(!"123456789/".includes(t.charAt(0)) && t.length != 0 && out < 500000){
                            out++;
                            if(out == 500000){
                                console.log(t);
                            }
                            t = t.substring(1);
                        }

                        var numorator = "";
                        while("1234567890".includes(t.charAt(0)) && t.length != 0 && out < 5000000){
                            out++
                            if(out == 5000000){
                                console.log(t);
                            }
                            numorator += t.charAt(0);
                            t = t.substring(1);
                        }
                        numorator = parseInt(numorator);
                        if(Number.isNaN(numorator)){
                            numorator = 1;
                        }

                        var demoninator = "";
                        if(t.charAt(0) == '/'){
                            t = t.substring(1);
                            while("1234567890".includes(t.charAt(0)) && t.length != 0 && out < 500000){
                                out++;
                                if(out == 500000){
                                    console.log(t);
                                }
                                demoninator += t.charAt(0);
                                t = t.substring(1);
                            }
                        }
                        demoninator = parseInt(demoninator);
                        if(Number.isNaN(demoninator)){
                            demoninator = 1;
                        }
                        
                        l[j] = (numorator/demoninator) * noteLength;
                    j++;
                }
                this.time += l[0];
                this.notes.push({note:n, length:l});
                if(!notes.includes(" ")){
                    break;
                }
                notes = notes.substring(notes.indexOf(' ')+1);
            }
            this.scene.launch('playsong');
            this.scene.sleep();
        }
    
    }

    setKey(key){
        var noteTable;
        console.log(key)
        switch(key.toUpperCase()){
            case 'CB':
                noteTable = ["bC", "bD", "bE", "cF", "bG", "bA", "bB"];
                break;
            case 'GB':
                noteTable = ["bC", "bD", "bE", "F", "bG", "bA", "bB"];
                break;
            case 'DB':
                noteTable = ["C", "bD", "bE", "F", "bG", "bA", "bB"];
                break;
            case 'AB':
                noteTable = ["C", "bD", "bE", "F", "G", "bA", "bB"];
                break;
            case 'EB':
                noteTable = ["C", "D", "bE", "F", "G", "bA", "bB"];
                break;
            case 'BB':
                noteTable = ["C", "D", "bE", "F", "G", "A", "bB"];
                break;
            case 'F':
                noteTable = ["C", "D", "E", "F", "G", "A", "bB"];
                break;
           case 'C':
                noteTable = ["C", "D", "E", "F", "G", "A", "B"];
                break;
            case 'D':
                noteTable = ["#C", "D", "E", "#F", "G", "A", "B"];
                break;
            case 'E':
                noteTable = ["#C", "#D", "E", "#F", "#G", "A", "B"];
                break;
            case 'G':
                noteTable = ["C", "D", "E", "#F", "G", "A", "B"];
                break;
            case 'A':
                noteTable = ["#C", "D", "E", "#F", "#G", "A", "B"];
                break;
            case 'B':
                noteTable = ["#C", "#D", "E", "#F", "#G", "#A", "B"];
                break;
            case 'B':
                noteTable = ["#C", "#D", "E", "#F", "#G", "#A", "B"];
                break;
            case 'F#':
                noteTable = ["#C", "#D", "#E", "#F", "#G", "#A", "B"];
                break;
            case 'C#':
                noteTable = ["#C", "#D", "#E", "#F", "#G", "#A", "#B"];
                break;
        }
        return noteTable;
    }
}

export default LoadSong;