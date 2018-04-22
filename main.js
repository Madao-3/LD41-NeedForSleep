var width = 840;
var height = 550;

window.game = new Phaser.Game(width, height, Phaser.AUTO, 'game');

Object.keys(states).map(function(key) {
	game.state.add(key, states[key]);
});

game.state.start('preload');