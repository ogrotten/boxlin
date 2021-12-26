import Phaser from "phaser"
import { GridMgr } from "./lib/gridmgr"

export class GridScene extends Phaser.Scene {
	constructor() {
		super({ key: "grid", active: true })
	}
	preload() {
		const {
			setup: {
				colors: {
					main, alt, lines
				},
				cols, rows
			},
			width, height,
		} = this.game.config
		console.log(`conlog: this`, this)
		this.local = { width, height, main, alt, lines, cols, rows }

		this.load.image("bomb", "assets/bomb.png")
	}
	create() {
		const { width, height, main, alt, lines, cols, rows } = this.local
		this.add.grid(
			width / 2,
			height / 2,
			width,
			height,
			width / cols,
			height / rows,
			main
		)
			.setAltFillStyle(alt)
			.setOutlineStyle(lines)


		const grid = new GridMgr((width / cols), (height / rows))
		const bomb = this.add.sprite(0, 0, "bomb").setScale(2.5, 2.5)
		bomb.setOrigin(0.5, 0.5)

		const xx = Phaser.Math.RND.integerInRange(0, cols)
		const yy = Phaser.Math.RND.integerInRange(0, rows)
		grid.placeAt(xx, yy, bomb)
	}
}