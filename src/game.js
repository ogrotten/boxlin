import Phaser from "phaser"
import { BoardManager } from "./lib/boardmgr"

export class Game extends Phaser.Scene {
	constructor() {
		super({ key: "board", active: true })
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
		this.load.image("star", "assets/star.png")
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
	RND(min, max) { return Phaser.Math.RND.integerInRange(min, max) }
	create() {
		const { width, height, main, alt, lines, cols, rows, cellx, celly, tints } = this.local
		const { RND } = this
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


		const board = new BoardManager(cellx, celly)

		const bomb = this.add.sprite(0, 0, "bomb").setTint(tints[0]).setScale(2.5, 2.5).setOrigin(0.5, 0.5)
		const star = this.add.sprite(0, 0, "star").setTint(tints[3]).setScale(1.5, 1.5).setOrigin(0.5, 0.5)

		let cluster = new Phaser.GameObjects.Group
		cluster.on('pointerdown', function (pointer) {
			console.log(`conlog: click`, pointer)
		});

		let shapeL = [[0, 0], [-1, 0], [-1, -1], [1, 0]]
		let starrow = 3, starcol = 3

		for (let i = 0; i < shapeL.length; i++) {
			let pilot = [starrow, starcol]
			let [setX, setY] = shapeL[i]
			let subPiece = { ...star, shapeParent: pilot, }
			// debugger
			cluster.add(star)
			// debugger
			board.placeAt(
				starrow + setX,
				starcol + setY,
				this.add.sprite(0, 0, "star").setTint(tints[3]).setScale(1.5, 1.5).setOrigin(0.5, 0.5)
			)
			// debugger
		}

		// board.placeAt(3, 3, star)


		// const xx = RND(0, cols - 1)
		// const yy = RND(0, rows - 1)
		// board.placeAt(xx, yy, bomb)
	}
}