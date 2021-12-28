import Phaser from "phaser";
import { Board, HexagonGrid, QuadGrid, Shape } from 'phaser3-rex-plugins/plugins/board-components.js';
import FadeOutDestroy from 'phaser3-rex-plugins/plugins/fade-out-destroy.js';

const Random = Phaser.Math.Between;

const shapes = {
	L: [[0, 0], [0, -1], [0, 1], [1, 1]],
	// L: [[0, 0], [-1, 0], [-1, -1], [1, 0]]
}
export class Setup extends Phaser.Scene {
	constructor() {
		super({ key: "setup", active: true, visible: false })
	}
	RND(min, max) { return Phaser.Math.RND.integerInRange(min, max) }
	colors = [0xCE93D8,
		0x3FFFF,
		0xDAF7A6,
		0xFFC300,
		0xFF5733,
		0x2df6b2,
		0xe35f7d,
		0x171e60,
		0x282940,
		0x8d6800]

	preload() {
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

		var board = new Board(this, {
			grid: {
				gridType: 'quadGrid',
				x: 0 + cell / 2,
				y: 0 + cell / 2,
				cellWidth: width / cols,
				cellHeight: height / rows,
				type: 0
			},
			width: cols,
			height: rows,
		}).forEachTileXY((tileXY, board) => {
			let points = board.getGridPoints(tileXY.x, tileXY.y, true);
			var chess = new Shape(
				board,
				tileXY.x, tileXY.y, 0,
				Random(0, 0xffffff)
			)
			this.add.existing(chess)
			board.addChess(chess, tileXY.x, tileXY.y, 0, true)
			this.add.text(chess.x, chess.y, `${tileXY.x},${tileXY.y}`)
				.setOrigin(0.5)
				.setTint(0xffffff);
		}, this);

		board.setInteractive()
			.on('tiledown', function (press, tileXY) {
				console.log('destroy ' + tileXY.x + ',' + tileXY.y);
				FadeOutDestroy(board.tileXYZToChess(tileXY.x, tileXY.y, 0), 0.8);
			})
			.on('tileover', (pointer, tileXY) => {
				console.log('over ' + tileXY.x + ',' + tileXY.y);
			})
	}

	update() {
		this.scene.setVisible(true)
	}
}

const quadGrid = (scene, cols, rows, cell) => {
	console.log(`conlog: cols, rows, cell`, cols, rows, cell)
	let grid = new QuadGrid({
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