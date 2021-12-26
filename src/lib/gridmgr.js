class GridMgr extends Phaser.Group {
	constructor(cols = 3, rows = 3, parent = null) {
		super(game);
		//if not parent is passed then use the game
		if (parent == null) {
			parent = game;
		}
		//cellwidth cell width is the parent width divided by the number of columns
		this.cellwidth = parent.width / cols;
		//cellheight cell height is the parent height divided the number of rows
		this.cellheight = parent.height / rows;
		//promote to a class variable
		this.parent = parent;
	}
	//place an object in relation to the grid
	placeAt(xx, yy, obj) {
		//calculate the center of the cell
		//by adding half of the height and width
		//to the x and y of the coordinates
		var x2 = this.cellwidth * xx + this.cellwidth / 2;
		var y2 = this.cellheight * yy + this.cellheight / 2;
		obj.x = x2;
		obj.y = y2;
	}
	//mostly for planning and debugging this will
	//create a visual representation of the grid
	show() {
		this.graphics = game.add.graphics();
		this.graphics.lineStyle(4, 0xff0000, 1);
		//
		//
		for (var i = 0; i < this.parent.width; i += this.cellwidth) {
			this.graphics.moveTo(i, 0);
			this.graphics.lineTo(i, this.parent.height);
		}
		for (var i = 0; i < this.parent.height; i += this.cellheight) {
			this.graphics.moveTo(0, i);
			this.graphics.lineTo(this.parent.width, i);
		}
	}
}