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
		this.add.grid(
			this.width / 2,
			this.height / 2,
			this.width,
			this.height,
			50,
			50,
			0x111111
		)
			.setAltFillStyle(0x181818)
			.setOutlineStyle();
		// this.add.grid(300, 300, 512, 256, 64, 64, 0xffff00).setAltFillStyle(0x88ff00).setOutlineStyle();
	}
}