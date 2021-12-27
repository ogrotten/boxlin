import Phaser from "phaser"

// https://phasergames.com/using-alignment-grid/
export class BoardManager extends Phaser.GameObjects.Group {
	constructor(width, height) {
		super({ key: "Manage Grid", active: true })

		this.inventory = new Map()

		this.cellx = width
		this.celly = height
	}

	placeAt(xx, yy, obj) {
		const xpixel = this.cellx * xx + this.cellx / 2
		const ypixel = this.celly * yy + this.celly / 2
		obj.x = xpixel
		obj.y = ypixel
		this.inventory.set([xx, yy], { group: "yo" })
		console.log(`conlog: this.inventory`, this.inventory, obj)
	}
}