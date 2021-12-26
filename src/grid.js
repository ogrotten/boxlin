import Phaser from "phaser"

export class GridScene extends Phaser.Scene {
	constructor() {
		super("")
	}
	preload() {
		this.objects = {};
		const { width, height } = this.game.config
	}
	create() {
		this.objects.camera = this.cameras.add(0, 0, 400, 300);
		this.objects.camera.setBackgroundColor('rgba(255, 0, 0, 0.5)');
		this.add.grid(300, 300, 512, 256, 64, 64, 0xffff00).setAltFillStyle(0x88ff00).setOutlineStyle();
		this.add.grid(300, 300, 512, 256, 64, 64, 0xffff00).setAltFillStyle(0x88ff00).setOutlineStyle();
	}
}