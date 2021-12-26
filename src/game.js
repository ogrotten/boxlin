import Phaser from "phaser"
import { BoardManager } from "./lib/boardmgr"

export class Game extends Phaser.Scene {
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

		this.load.image("bomb", "assets/bomb.png")
		this.local = {
			width,
			height,
			main,
			alt,
			lines,
			cols,
			rows,
			cellx: width / cols,
			celly: height / rows,
			tints: [0xff0000, 0x00ff00, 0x0000ff],
		}
	}
	create() {
		const { width, height, main, alt, lines, cols, rows, cellx, celly, tints } = this.local
		this.add.grid(
			width / 2,
			height / 2,
			width,
			height,
			cellx,
			celly,
			main
		)
			.setAltFillStyle(alt)
			.setOutlineStyle(lines)


		const grid = new BoardManager(cellx, celly)

		const pieces = new Array(4)


		for (let [i, _] of pieces.entries()) {
			const piece = this.add.sprite(0, 0, "bomb").setTint(tints[i]).setScale(2.5, 2.5).setOrigin(0.5, 0.5)

			const xx = Phaser.Math.RND.integerInRange(0, cols - 1)
			const yy = Phaser.Math.RND.integerInRange(0, rows - 1)
			console.log(`conlog: xx, yy`, xx, yy)
			grid.placeAt(xx, yy, piece)
		}
	}
}