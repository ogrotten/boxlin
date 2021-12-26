import Phaser from "phaser";

export class Setup extends Phaser.Scene {
	constructor() {
		super({ key: "setup", active: true })
	}
	preload() {
		const { width, height } = this.game.config
		// this.camera = this.cameras.add(0, 0, width, height);
		// this.camera.setBackgroundColor('rgba(64,64,64, 0.0)');
	}
}