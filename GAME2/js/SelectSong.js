"use strict";

class SelectSong extends Phaser.Scene{

    constructor(){
        super("selectsong");
    }

    create(){
        var text = this.cache.text.get('songList');
        text = text.split("\n");
        this.songs = [];
        this.songList = [];
        for(var i = 0; i < text.length; i++){
            if(text[i] == ("")){
                continue;
            }
            var name = text[i].substring(0, text[i].indexOf('.abc'));
            this.songs.push(this.add.bitmapText(400, 100 + i*50, 'atari', name, 15).setOrigin(0.5, 0));
            this.songList[i] = this.songs[i];
        }

        this.keys = this.input.keyboard.addKeys({
            key1: 'UP',
            key2: 'DOWN',
            key3: 'ENTER',
            key4: 'A',
            key5: 'B',
            key6: 'C',
            key7: 'D',
            key8: 'E',
            key9: 'F',
            key10: 'G',
            key11: 'H',
            key12: 'I',
            key13: 'J',
            key14: 'K',
            key15: 'L',
            key16: 'M',
            key17: 'N',
            key18: 'O',
            key19: 'P',
            key20: 'Q',
            key21: 'R',
            key22: 'S',
            key23: 'T',
            key24: 'U',
            key25: 'V',
            key26: 'W',
            key27: 'X',
            key28: 'Y',
            key29: 'Z',
            key30: 'BACKSPACE',
            key31: 'SPACE'
        });

        this.searchName = "";

        this.searchText = this.add.bitmapText(15, 15, 'atari', `Search: ${this.searchName}`, 12).setOrigin(0, 0);

        this.selectedSong = 0;
        this.songs[this.selectedSong].setTint(0x00ff00);

        this.keys.key1.on("down", () => this.up());
        this.keys.key2.on("down", () => this.down());
        this.keys.key3.on("down", () => this.selectSong());
        this.keys.key4.on("down", () => this.addCharacter('A'));
        this.keys.key5.on("down", () => this.addCharacter('B'));
        this.keys.key6.on("down", () => this.addCharacter('C'));
        this.keys.key7.on("down", () => this.addCharacter('D'));
        this.keys.key8.on("down", () => this.addCharacter('E'));
        this.keys.key9.on("down", () => this.addCharacter('F'));
        this.keys.key10.on("down", () => this.addCharacter('G'));
        this.keys.key11.on("down", () => this.addCharacter('H'));
        this.keys.key12.on("down", () => this.addCharacter('I'));
        this.keys.key13.on("down", () => this.addCharacter('J'));
        this.keys.key14.on("down", () => this.addCharacter('K'));
        this.keys.key15.on("down", () => this.addCharacter('L'));
        this.keys.key16.on("down", () => this.addCharacter('M'));
        this.keys.key17.on("down", () => this.addCharacter('N'));
        this.keys.key18.on("down", () => this.addCharacter('O'));
        this.keys.key19.on("down", () => this.addCharacter('P'));
        this.keys.key20.on("down", () => this.addCharacter('Q'));
        this.keys.key21.on("down", () => this.addCharacter('R'));
        this.keys.key22.on("down", () => this.addCharacter('S'));
        this.keys.key23.on("down", () => this.addCharacter('T'));
        this.keys.key24.on("down", () => this.addCharacter('U'));
        this.keys.key25.on("down", () => this.addCharacter('V'));
        this.keys.key26.on("down", () => this.addCharacter('W'));
        this.keys.key27.on("down", () => this.addCharacter('X'));
        this.keys.key28.on("down", () => this.addCharacter('Y'));
        this.keys.key29.on("down", () => this.addCharacter('Z'));
        this.keys.key30.on("down", () => this.removeChatacter());
        this.keys.key31.on("down", () => this.addCharacter(' '));

        this.searchSongs();
    }

    up(){
        if(this.selectedSong != 0){
            this.selectedSong--;
            for(var i = 0; i < this.songList.length; i++){
                this.songList[i].y += 50;
                if(i == this.selectedSong){
                    this.songList[i].setTint(0x00ff00);
                }else{
                    this.songList[i].setTint(0xffffff);
                }
            }
        }
    }

    down(){
        if(this.selectedSong != this.songList.length-1){
            this.selectedSong++;
            for(var i = 0; i < this.songList.length; i++){
                this.songList[i].y -= 50;
                if(i == this.selectedSong){
                    this.songList[i].setTint(0x00ff00);
                }else{
                    this.songList[i].setTint(0xffffff);
                }
            }
        }
    }

    selectSong(){
        this.songName = this.songs[this.selectedSong];
        this.scene.start('loadsong');
    }

    removeChatacter(){
        this.searchName = this.searchName.substring(0, this.searchName.length - 1);
        this.searchText.text = `Search: ${this.searchName}`;
        this.searchSongs();
    }

    addCharacter(c){
        this.searchName = this.searchName + c;
        this.searchText.text = `Search: ${this.searchName}`;
        this.searchSongs();
    }

    searchSongs(){
        this.selectedSong = 0;
        this.songList = [];
        for(var i = 0; i < this.songs.length; i++){
            if(this.songs[i].text.toUpperCase().includes(this.searchName)){
                this.songList.push(this.songs[i]);
                this.songs[i].y = 100 + (this.songList.length-1)*50;
                this.songs[i].setTint(0xffffff);
            }else{
                this.songs[i].y = -500;
            }
        }
        if(this.songList.length != 0){
            this.songList[0].setTint(0x00ff00);
        }
    }
}

export default SelectSong;