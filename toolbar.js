class ToolBar {
	constructor(game, sidebar) {
		this.sidebar = sidebar
		this.initMarker()
		this.initButtons()
	}
	
	initButtons () {
		this.list = [{
			name: 'up',
			offset: [4],
			content: 'face to up'
		},{
			name: 'down',
			offset: [5],
			content: 'face to down'
		},{
			name: 'right',
			offset: [6],
			content: 'face to right'
		},{
			name: 'left',
			offset: [7],
			content: 'face to left'
		},{
			name: 'if',
			offset: [9],
			content: 'if condition'
		},{
			name: 'else',
			offset: [10],
			content: "else condition, you must have\n \"if\" first"
		},{
			name: 'kill',
			offset: [11],
			content: "kill something, only happen \nin if/else block"
		},{
			name: 'loop',
			offset: [12],
			content: "loop block, only way to escape \nis use loop"
		},{
			name: 'pm',
			offset: [13],
			content: 'condition "pm"'
		},{
			name: 'block',
			offset: [8],
			content: 'condition "blocked"'
		}];
		for (var i = 0; i < this.list.length; i++) {
			let item = this.list[i];
			let left = i * 50 + 30;
			this.initButton(item, left)
		}
		game.input.addMoveCallback(this.updateButtonMarker, this);
	}
	
	initButton(item, left) {
		let button = game.add.sprite(left, 500, 'button', item.offset[0]);
    button.smoothed = false;
    button.scale.set(1.8);
		button.inputEnabled = true;
		button.events.onInputDown.add((e) => {
			this.buttonDidClick(item.name)
		}, this)
		let label = game.add.text(left, 530, item.name, {
			fill: 'white',
			fontSize: 12,
			align: 'center'
		});
	}

	updateButtonMarker() {
		let x = game.input.activePointer.worldX - 30;
		let index = Math.floor(x / 50)
		if (game.input.activePointer.worldY < 498) return
		if (index > this.list.length || index < 0) return
		if (index >= this.list.length) {
			x = (this.list.length - 1) * 50;
		} else {
			x = index * 50
		}
		this.showTips(this.list[index])
		this.marker.x = x;
	}

	showTips(obj) {
		if (!obj) return
		let tipsContent = obj.content
		if(!tipsContent && tipsContent != "") return
		window.tips.updateText(tipsContent)
	}

	initMarker () {
		let color = 0x999999
		this.marker = game.add.graphics();
		this.marker.beginFill(color);
		this.marker.lineStyle(2, color, 1);
		this.marker.drawRect(28, 498, 32, 32);
		this.marker.endFill();
	}
	
	buttonDidClick (name) {
		this.sidebar.push(name)
	}
	
}