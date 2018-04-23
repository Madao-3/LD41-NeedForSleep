class Sidebar {
	constructor() {
		this.sidebar = document.getElementsByClassName('sidebar')[0];
		this.sidebar.style = '';
		this.state = '';
		this.condition = ''
		this.list = []
		document.getElementById('clear-button').onclick = () => {
			this.state = '';
			this.list = [];
			document.getElementById('script_content').innerHTML = ''
		}
		
		document.getElementById('run-button').onclick = () => {
			if (this.list.length == 0) {
				alert('select action please')
				return
			}
			this.run()
		}
	}
	
	run() {
		let limitCounter = 0
		player.animateStop()
		let index = 0;
		let pos = [1,1]
		this.step(0, '', pos, limitCounter)
	}
	
	step(index, state, pos, limitCounter) {
		limitCounter++;
		let mapData = window.map.layers[0].data
		let result = {};
		if (state == 'not_working') index++;
		if (state == 'if_failed') {
			index += 2;
			return this.step(index, '',pos, limitCounter)
		}
		if (index >= this.list.length) index = 0;
		let rule = this.list[index];
		console.log(rule, state, result)
		switch (rule.event) {
		case 'down':{
			result = player.run(pos, [0, 1], mapData)
			_player.play('down')
			break;
		}
		case 'up':{
			result = player.run(pos, [0, -1], mapData)
			_player.play('up')
			break;
		}
		case 'left':{
			result = player.run(pos, [-1, 0], mapData)
			_player.play('left')
			break;
		}
		case 'right':{
			_player.play('right')
			result = player.run(pos, [1, 0], mapData)
			break;
		}
		case 'if': {
			switch (rule.condition) {
			case 'block': {
				if (state == 'not_working') {
					state = '';
					index++;
				} else {
					state = 'if_failed'
				}
				break;
			}
			case 'pm': {
				if (mapData[pos[0]][pos[1]].properties.name == 'pm') {
					debugger
					if (!player.holyGrailed) {
						result = player.run(pos, [0, 0], mapData)
					} else {
						result = player.run(pos, [-1, 0], mapData)
					}
					index++;
				} else {
					index+=2;
				}
				break;
			}
			case 'kill': {
				index++;
				break
			}
			default:
				
			}
		}
		default:
			
		}
		pos = result.pos || pos
		state = result.state
		_player.position.x = pos[0] * 32
		_player.position.y = pos[1] * 32
		if (limitCounter >= 100) {
			alert('your player walks too much!');
			return;;
		}
		document.getElementById('count').innerHTML = limitCounter
		setTimeout(() => {
			return this.step(index, state, pos, limitCounter)
		}, 100)
	}
	
	push(event) {
		let html = ''
		let params = {}
		switch (event) {
		case 'down':
		case 'up':
		case 'right':
		case 'left': {
			if (this.state == 'if') {
				alert('Finish your if, please')
				return				
			}
			html = `<li>${event}()</li>`
			if (this.state == 'ifdone' || this.state == 'else') {
				html += '</ul>'
			}
			this.state = '';			
			break;
		}
		case 'if': {
			if (this.state == '') {
				this.state = 'if'
				this.condition = ''
				html = '<li class="if">if</li>'
			} else {
				alert('seen not right')
				return
			}
			break;
		}
		case 'else': {
			alert('useless in this version.')
			return;
			if (this.state == 'if') {
				alert('Finish your if, please')
				return				
			} else if (this.state == 'ifdone') {
				this.state = 'else'
				this.condition = ''
			} else {
				alert('where is the if?')
				return
			}
		}
		case 'kill': {
			if (this.state == 'if') {
				alert('Finish your if, please')
				return				
			} else if (this.state == 'ifdone') {
				if (this.condition != 'pm') {
					alert('Don\'t be a random killer!')
					return
				} else {
					html = `<li class="kill">${event}()</li><ul>`
				}
				this.state = ''
			} else {
				alert('where is the if?')
				return
			}
			break;
		}
		case 'ban':
		case 'pm': 
		case 'block': {
			console.log(this.state)
			if (this.state != 'if') {
				alert('where is the if?')
				return				
			} else {
				html = `<li class="condition">if(${event})</li><ul>`
				this.state = 'ifdone'
				this.condition = event
			}
			this.list.pop()
			params = {condition: event}
			event = 'if'
			break;
		}
		default:
			
		}
		this.list.push(Object.assign({event, html}, params))
		window.result = this.list;
		this.render();
	}
	render () {
		let html = ''
		for (var i = 0; i < this.list.length; i++) {
			html += this.list[i].html
		}
		document.getElementById('script_content').innerHTML = html
	}
}