class Player {
	constructor(game) {
		this.state = 0;
		this.x = 0;
		this.y = 0;
		this.bonus = 0;
		this.holyGrailed = false
		this.initPlayer(game);
		return this
	}
	initPlayer (game) {
		let player = game.add.sprite(33, 26, 'main', 0);
    player.smoothed = false;
    player.scale.set(1.8);

    let left = player.animations.add('left', [1], 1, true);
    let right = player.animations.add('right', [2], 1, true);
    player.animations.add('up', [3], 10, true);
    player.animations.add('down', [0], 10, true);

    left.enableUpdate = true;
    right.enableUpdate = true;

    game.physics.enable(player, Phaser.Physics.ARCADE);

    game.camera.follow(player);
		window._player = player;
		this.player = player
		this.animateStart();
    // cursors = game.input.keyboard.createCursorKeys();
	}
	
	animateStart () {
		let index = 0;
		this.animateSt = setInterval(()=> {
			let pos = ['down', 'right', 'up', 'left'][index%4];
			this.player && this.player.play(pos)
			index++;
		}, 800)
	}
	
	animateStop () {
		clearInterval(this.animateSt);
		this.player && this.player.play('down')
	}

	run(pos, offset, data) {
		let x = offset[0];
		let y = offset[1];
		let state = ''
		let mapItem = data[pos[1]+y][pos[0]+x]
		switch (mapItem.index) {
			case 20:{
				state = 'not_working';
				break;
			}
			case 1: {
				pos[0] += x;
				pos[1] += y;
				break;
			}
			case 9:
			case 12: {
				pos[0] += x;
				pos[1] += y;
				this.bonus += mapItem.properties.value;
				break;
			}
			case 8:{
				pos[0] += x;
				pos[1] += y;
				this.holyGrailed = true;
				break;
			}
			case 6:
			case 7: 
			case 10: {
				let name = mapItem.properties.name;
				let l = name.split('');
				let index = parseInt(l.pop(), 10) + 1;
				if (index > 3) index = 1;
				l.push(index);
				name = l.join('');
				let tile = this.find_port(name, data);
				pos = [tile.x, tile.y];
				break;
			}
			case 11:{
				let tile = this.find_another_teleport(pos, data)
				pos = [tile.x, tile.y];
				break;
			}
			case 99: {
				alert('you win! thank you for playing my game!')
				location.reload();
				return
			}
		}
		return { pos, state }
	}

	find_another_teleport(pos, data) {
		for (let rowData of data) {
			for (let item of rowData) {
				if (item.properties.name == 'teleporter' &&
						item.x != pos[0] &&
						item.y != pos[1]) {
					return item
				}
			}
		}
	}

	find_port(name, data) {
		for (let rowData of data) {
			for (let item of rowData) {
				if (item.properties.name == name) {
					return item
				}
			}
		}
	}
	
}