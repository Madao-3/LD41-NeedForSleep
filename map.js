class Map {
	constructor(data) {
		this.data = data
		this.init()
	}
	
	init() {
		var map;
		var layer;
		var marker;
		var cursors;
		var currentDataString;

		function create() {
			game.physics.startSystem(Phaser.Physics.ARCADE);
			map = game.add.tilemap('map');
			map.addTilesetImage('tiles');
			layer = map.createLayer('Tile Layer 1');
			layer.resizeWorld();
			marker = game.add.graphics();
			marker.lineStyle(2, 0xffffff, 1);
			marker.drawRect(0, 0, 32, 32);
			game.input.addMoveCallback(updateMarker, this);
			cursors = game.input.keyboard.createCursorKeys();
			window.map = map
		}

		function getTileProperties() {
			var x = layer.getTileX(game.input.activePointer.worldX);
			var y = layer.getTileY(game.input.activePointer.worldY);
			var tile = map.getTile(x, y, layer);
			let obj = {}
			if (tile && tile.properties) obj = tile.properties
			showTips(obj)
		}

		function showTips(obj) {
			let tipsContent = ''
			let name = obj.name || ''
			switch (name) {
			case "bonus":
				tipsContent = `you will got ${obj.value} bonus`
				break;
			case "teleporter":
				tipsContent = "It will teleport you to another\n teleporter."
				break;
			case "portal1":
			case "portal2":
			case "portal3":
				tipsContent = "Some Random thing hapenning."
				break;
			case "pm":
				tipsContent = "Kill it, or i will."
				break;
			case "goal":
				tipsContent = "My precious!"
				break;
			case "HolyGrail":
				tipsContent = 'Holy Grail'
				break;
			default:
			}
			window.tips.updateText(tipsContent)
		}

		function updateMarker() {
			let y = layer.getTileY(game.input.activePointer.worldY) * 32;
			let x = layer.getTileX(game.input.activePointer.worldX) * 32;
			if (y >= 480) return
			if (x >= 608) return
			getTileProperties()
			marker.x = x;
			marker.y = y;
		}

		create();
	}
}