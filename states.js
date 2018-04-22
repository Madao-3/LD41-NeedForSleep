var states = {
	// 游戏场景
	play: function() {
		this.create = function() {
			this.map = new Map(window.game)
			window.player = new Player(window.game);
			this.sidebar = new Sidebar(window.game);
			this.toolbar = new ToolBar(window.game, this.sidebar);
			window.tips = new Tips();
		}
	},
	// 结束场景
	over: function() {
		this.create = function() {
			alert('游戏结束!');
		}
	}
};
