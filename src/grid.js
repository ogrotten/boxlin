import Phaser from "phaser"

export class GridScene extends Phaser.Scene {
	constructor() {
		super({ key: "grid", active: true })
	}
	preload() {
		this.objects = {};
		const { width, height } = this.game.config
	}
	create() {
		// this.add.grid(300, 300, 512, 256, 64, 64, 0xffff00).setAltFillStyle(0x88ff00).setOutlineStyle();
		// this.add.grid(300, 300, 512, 256, 64, 64, 0xffff00).setAltFillStyle(0x88ff00).setOutlineStyle();
	}
}