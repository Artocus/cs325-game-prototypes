import Boot from './Boot.js'
import Preloader from './Preloader.js'
import Music from './Music.js'
import Game from './Game.js'

var config = {
	width: 800,
	height: 600,
	type: Phaser.WebGL,
	parent: 'game',
};

var game = new Phaser.Game(config);

game.scene.add('boot', new Boot());
game.scene.add('preloader', new Preloader());
game.scene.add('game', new Game());
game.scene.add('music', new Music());
game.scene.start('boot');
