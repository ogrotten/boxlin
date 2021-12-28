import Phaser from "phaser";
// import { Board } from "phaser3-rex-plugins/plugins/board-components";
import { Board, HexagonGrid, QuadGrid, Shape } from 'phaser3-rex-plugins/plugins/board-components.js';

// import BoardPlugin from 'phaser3-rex-plugins/plugins/board-plugin.js';




const Random = Phaser.Math.Between;

export class BroadTest extends Phaser.Scene {
	// rexBoard: BoardPlugin;
	// board: BoardPlugin.Board;
	// print: Phaser.GameObjects.Text;
	// cameraController: Phaser.Cameras.Controls.SmoothedKeyControl;

	constructor() {
		super({
			key: 'examples'
		})
	}

	preload() { }

	create() {
		var board = new Board(this, {
			// grid: getHexagonGrid(this),
			grid: getQuadGrid(this),
			width: 20,
			height: 20
		})
			.forEachTileXY(function (tileXY, board) {
				var scene = board.scene;
				var chess = new Shape(
					board,
					tileXY.x, tileXY.y, 0,
					Random(0, 0xffffff), 0.7
				);
				scene.add.text(chess.x, chess.y, `${tileXY.x}, ${tileXY.y}`)
					.setOrigin(0.5)
					.setTint(0xffffff);
			});

		board
			.setInteractive()
			.on('tiledown', function (pointer, tileXY) {
				console.log('down ' + tileXY.x + ',' + tileXY.y);
			})
			.on('tileup', function (pointer, tileXY) {
				console.log('up ' + tileXY.x + ',' + tileXY.y);
			})
			.on('tilemove', function (pointer, tileXY) {
				console.log('move ' + tileXY.x + ',' + tileXY.y);
			})
			.on('tileover', function (pointer, tileXY) {
				console.log('over ' + tileXY.x + ',' + tileXY.y);
			})
			.on('tileout', function (pointer, tileXY) {
				console.log('out ' + tileXY.x + ',' + tileXY.y);
			})
			.on('gameobjectdown', function (pointer, gameObject) {
				gameObject.setFillStyle(Random(0, 0xffffff), 0.7);
			})
			.on('tile1tap', function (tap, tileXY) {
				console.log('1 tap ' + tileXY.x + ',' + tileXY.y);
			})
			.on('tile2tap', function (tap, tileXY) {
				console.log('2 tap ' + tileXY.x + ',' + tileXY.y);
			})
			.on('tilepressstart', function (press, tileXY) {
				console.log('press start ' + tileXY.x + ',' + tileXY.y);
			})
			.on('tilepressend', function (press, tileXY) {
				console.log('press end ' + tileXY.x + ',' + tileXY.y);
			})
			.on('tileswipe', function (swipe, tileXY) {
				console.log(`swipe-${swipe.direction} ` + tileXY.x + ',' + tileXY.y);
			})

		this.board = board;
		this.print = this.add.text(0, 0, '').setScrollFactor(0);


		var cursors = this.input.keyboard.createCursorKeys();
		this.cameraController = new Phaser.Cameras.Controls.SmoothedKeyControl({
			camera: this.cameras.main,

			left: cursors.left,
			right: cursors.right,
			up: cursors.up,
			down: cursors.down,
			zoomIn: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
			zoomOut: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),

			acceleration: 0.06,
			drag: 0.003,
			maxSpeed: 0.3
		});
	}

	update(time, delta) {
		this.cameraController.update(delta);

		var pointer = this.input.activePointer;
		var out = this.board.worldXYToTileXY(pointer.worldX, pointer.worldY, true);
		this.print.setText(out.x + ',' + out.y);
	}
}

var getQuadGrid = function (scene) {
	var grid = new QuadGrid({
		x: 400,
		y: 100,
		cellWidth: 100,
		cellHeight: 50,
		type: 1
	});
	return grid;
}

var getHexagonGrid = function (scene) {
	var grid = new HexagonGrid({
		x: 50,
		y: 50,
		size: 50,
		staggeraxis: 'x',
		staggerindex: 'odd'
	})
	return grid;
};

// var config = {
// 	type: Phaser.AUTO,
// 	parent: 'phaser-example',
// 	width: 800,
// 	height: 600,
// 	scale: {
// 		mode: Phaser.Scale.FIT,
// 		autoCenter: Phaser.Scale.CENTER_BOTH,
// 	},
// 	scene,
// 	plugins: {
// 		scene: [{
// 			key: 'rexBoard',
// 			plugin: BoardPlugin,
// 			mapping: 'rexBoard'
// 		}]
// 	}
// };

// var game = new Phaser.Game(config);