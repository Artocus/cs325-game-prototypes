import Boot from './Boot.js'
import Preloader from './Preloader.js'
import Controls from './Controls.js'
import LoadSong from './LoadSong.js'
import PlaySong from './PlaySong.js'
import Score from './Score.js'

var config = {
	width: 800,
	height: 600,
	type: Phaser.WebGL,
	parent: 'game',
};

var game = new Phaser.Game(config);

game.scene.add('boot', new Boot());
game.scene.add('preloader', new Preloader());
game.scene.add('controls', new Controls());
game.scene.add('loadsong', new LoadSong());
game.scene.add('playsong', new PlaySong());
game.scene.add('score', new Score());
game.scene.start('boot');
