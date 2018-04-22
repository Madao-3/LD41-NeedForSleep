let titleRender = () => {
	let titleArr = 'It is already 4 AM,\nPoor Peter needs sleep,\nplease help him back to Home.'.split('')
	let index = 0;
	let result = [];
	let speed = 1
	// let speed = 100

	let textObject = null
	
	let st = setInterval(function() {
		if (index >= titleArr.length) {
			clearInterval(st);
			setTimeout(()=> {
				title = game.add.image(210, 200, 'title');
				title.inputEnabled = true;
				title.events.onInputDown.add(function(e){
					game.state.start('play');
				}, this)
			}, 300)
		} else {
			textObject && textObject.destroy()
			result.push(titleArr[index])
			textObject = window.game.add.text(50, 50, result.join(''), {
				fill: 'white',
				fontSize: 20
			});
			index++;
		}
		
	}, speed)
}

states.created = function() {
	this.create = function() {
		titleRender()
	}
}