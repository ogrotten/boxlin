import Phaser from "phaser";
import { Board, QuadGrid } from "phaser3-rex-plugins/plugins/board-components";
// import { Board, HexagonGrid, QuadGrid } from 'phaser3-rex-plugins/plugins/board-components.js';

import BoardPlugin from 'phaser3-rex-plugins/plugins/board-plugin.js';


// import 'phaser';
// import BoardPlugin from '../../plugins/board-plugin.js';

export class BroadTest extends Phaser.Scene {
	constructor() {
		super({
			key: 'examples'
		})
	}

	preload() { }

	create() {
		var graphics = this.add.graphics({
			lineStyle: {
				width: 1,
				color: 0xffffff,
				alpha: 1
			}
		});

		var board = new Board(this, {
			// grid: getHexagonGrid(this),
			grid: getQuadGrid(this),
			width: 8,
			height: 8
		})
			.forEachTileXY(function (tileXY, board) {
				var points = board.getGridPoints(tileXY.x, tileXY.y, true);
				graphics.strokePoints(points, true);
			}, this);
	}

	update() { }
}

var getQuadGrid = function (scene) {
	var grid = new QuadGrid(scene, {
		x: 400,
		y: 100,
		cellWidth: 100,
		cellHeight: 50,
		type: 1
	});
	return grid;
}

// var getHexagonGrid = function (scene) {
// 	var staggeraxis = 'x';
// 	var staggerindex = 'odd';
// 	var grid = scene.rexBoard.add.hexagonGrid({
// 		x: 100,
// 		y: 100,
// 		// size: 30,
// 		cellWidth: 72,
// 		cellHeight: 72,
// 		staggeraxis: staggeraxis,
// 		staggerindex: staggerindex
// 	})
// 	return grid;
// };