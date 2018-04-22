let getAssets = () => {
	game.load.crossOrigin = 'anonymous';
  game.load.image('title', 'assets/title.gif', 15, 29);	
  game.load.spritesheet('main', 'assets/sprites/main.png', 16, 29);
  game.load.spritesheet('button', 'assets/sprites/main.png', 16, 16);
  game.load.tilemap('map', 'assets/maps/tile_properties.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image('tiles', 'assets/tiles/gridtiles.png');
	
	game.load.start();
	console.log('loaded')
}
states.preload = function() {
	this.create = function() {
		getAssets();
		game.stage.backgroundColor = '#333';
		game.state.start('created');
		// game.state.start('play');
		// game.state.start('play');
	} 	
}
