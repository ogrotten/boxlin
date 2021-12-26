import Phaser from "phaser"

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
	}
}