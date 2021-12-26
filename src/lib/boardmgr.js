import Phaser from "phaser"

// https://phasergames.com/using-alignment-grid/
export class BoardManager extends Phaser.GameObjects.Group {
	constructor(width, height) {
		super({ key: "Manage Grid", active: true })


		this.cellx = width
		this.celly = height
	}
	placeAt(xx, yy, obj) {
		var x2 = this.cellx * xx + this.cellx / 2
		var y2 = this.celly * yy + this.celly / 2
		obj.x = x2
		obj.y = y2
	}

}

