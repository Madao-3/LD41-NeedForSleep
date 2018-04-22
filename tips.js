class Tips {
	constructor() {
		let color = 0xffffff
		this.marker = game.add.graphics();
		this.marker.beginFill(color);
		this.marker.lineStyle(2, color, 1);
		this.marker.drawRect(620, 500, 200, 40);
		this.marker.endFill();
		
	}
	
	updateText(text) {
		this.textObject && this.textObject.destroy()
		this.textObject = window.game.add.text(625, 505, text, {
			fill: 'black',
			fontSize: 12
		});

	}
}