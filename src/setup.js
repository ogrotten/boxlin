import Phaser from "phaser";
import { Board, HexagonGrid, QuadGrid } from 'phaser3-rex-plugins/plugins/board-components.js';

export class Setup extends Phaser.Scene {
	constructor() {
		super({ key: "setup", active: true })
	}
	preload() {
		// const { width, height } = this.game.config
		// this.camera = this.cameras.add(0, 0, width, height);
		// this.camera.setBackgroundColor('rgba(64,64,64, 0.0)');
		this.game.config.setup = {
			cols: 6,
			rows: 12,
			cell: 50,
			colors: {
				main: 0x111111,
				alt: 0x141414,
				lines: 0x181818,
			}
		}

	}
	create() {
		const {
			setup: {
				colors: {
					main, alt, lines
				},
				cols, rows, cell
			},
			width, height,
		} = this.game.config

		let board = new Board(this, {
			grid: quadGrid(this, cols, rows, cell),
			width: 6,
			height: 12
		})
		debugger
		board.forEachTileXY((tileXY, board) => {
			let points = board.getGridPoints(tileXY.x, tileXY.y, true);
			// debugger
			// console.log(`conlog: inside foreach`, points)
			this.add.graphics({
				lineStyle: {
					width: 5,
					color: 0xff0000,
					alpha: 1
				},
				strokePoints: { points, closeShape: true }
			})
			// gridGraphics.strokePoints(points, true);
		}, this);
	}
	update() {
		this.scene.setVisible(true)
	}
}

const quadGrid = (scene, cols, rows, cell) => {
	console.log(`conlog: cols, rows, cell`, cols, rows, cell)
	let grid = new QuadGrid(scene, {
		x: 0,
		y: 0,
		cellWidth: 50,
		cellHeight: 50,
		type: 0,
		dir: 4,
		// height: rows * cell,
		// widght: cols * cell
	});
	// debugger
	return grid;
}