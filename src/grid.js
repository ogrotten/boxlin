import Phaser from "phaser"

export class GridScene extends Phaser.Scene {
	constructor() {
		super({ key: "grid", active: true })
	}
	preload() {
		this.height = this.game.config.height
		this.width = this.game.config.width
		this.objects = {};
	}
	create() {
		const { width, height } = this
		this.add.grid(
			width / 2,
			height / 2,
			width,
			height,
			width / 6,
			height / 12,
			0x111111
		)
			.setAltFillStyle(0x141414)
			.setOutlineStyle(0x181818)
	}
}