import Phaser from "phaser"

// https://phasergames.com/using-alignment-grid/
export class GridMgr extends Phaser.GameObjects.Group {
	constructor(width, height) {
		super({ key: "Manage Grid", active: true })
		console.log(`conlog: this`, this)
		this.cellwidth = width
		this.cellheight = height
	}
	placeAt(xx, yy, obj) {
		var x2 = this.cellwidth * xx + this.cellwidth / 2
		var y2 = this.cellheight * yy + this.cellheight / 2
		obj.x = x2
		obj.y = y2
	}
	//mostly for planning and debugging this will
	//create a visual representation of the grid
	// show() {
	// 	this.graphics = game.add.graphics()
	// 	this.graphics.lineStyle(4, 0xff0000, 1)
	// 	//
	// 	//
	// 	for (var i = 0 i < this.parent.width i += this.cellwidth) {
	// 		this.graphics.moveTo(i, 0)
	// 		this.graphics.lineTo(i, this.parent.height)
	// 	}
	// 	for (var i = 0 i < this.parent.height i += this.cellheight) {
	// 		this.graphics.moveTo(0, i)
	// 		this.graphics.lineTo(this.parent.width, i)
	// 	}
	// }
}

