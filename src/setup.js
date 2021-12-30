import Phaser from "phaser";
import { Board, MiniBoard, HexagonGrid, QuadGrid, Shape } from 'phaser3-rex-plugins/plugins/board-components.js';
import FadeOutDestroy from 'phaser3-rex-plugins/plugins/fade-out-destroy.js';
import UniqueItemList from 'phaser3-rex-plugins/plugins/uniqueitemlist.js';
import Rectangle from "phaser3-rex-plugins/plugins/utils/geom/rectangle/Rectangle";

const Random = Phaser.Math.Between

export class Setup extends Phaser.Scene {
	constructor() {
		super({ key: "setup", active: true, visible: false })
	}

	preload() {

		const colors = [0xff0000, 0x00ff00, 0x0044ff, 0xff00ff, 0xff8800, 0xffff00, 0x111111, 0x141414, 0x181818,]

		this.game.config.setup = {
			cols: 6,
			rows: 12,
			cell: 50,
			colors,
		}

		for (let color in Object.keys(colors)) {

		}
	}
	create() {
		const {
			setup: {
				colors,
				cols, rows, cell
			},
			width, height,
		} = this.game.config

		let cellId = 0
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
				colors[6]
			).setScale(.95).setName(`cell${cellId}`)
			// build2(chess)
			this.add.existing(chess)
			board.addChess(chess, tileXY.x, tileXY.y, 0, true)
			cellId++
		}, this, 0);

		// to track built cells
		let tiles = board.tileZToChessArray(0)

		// sort by distance from upper left corner
		tiles.sort((tileA, tileB) => {
			const tileXYA = tileA.rexChess.tileXYZ;
			const tileXYB = tileB.rexChess.tileXYZ;

			// from upper left corner
			const distA = Phaser.Math.Distance.Squared(tileXYA.x, tileXYA.y, 0, 0);
			const distB = Phaser.Math.Distance.Squared(tileXYB.x, tileXYB.y, 0, 0);
			return distA - distB;
		})
		let inventory = new UniqueItemList({ autoCleanup: false })
			.addMultiple(tiles)
			.reverse();

		// build cells
		var Build = function (board, inventory) {
			var tiles = GetAGroup(board, inventory).getItems();
			var rndnum = Random(0, 5);
			// debugger
			PlaceGroup(board, tiles, "board", colors[rndnum]);
			if (inventory.length > 0) {
				this.time.delayedCall(500, Build, [board, inventory], this);
			}
		};
		Build.call(this, board, inventory);
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
	});
	return grid;
}


var PlaceGroup = function (board, tiles, texture, color) {
	var scene = board.scene;
	var grid = board.grid;

	// Create mini board
	var miniBoard = new MiniBoard(scene, grid.x, grid.y, {
		grid: grid,
		draggable: false
	});

	// Add chess
	for (var i = 0, cnt = tiles.length; i < cnt; i++) {
		var tileXY = tiles[i].rexChess.tileXYZ;

		// var chess = scene.add.image(0, 0, texture, key);
		const chess = new Shape(board, grid.x, grid.y, 0, color).setScale(.98)
		scene.add.existing(chess)
		miniBoard.addChess(chess, tileXY.x, tileXY.y, 0);
	}
	// Set origin, put on main board
	miniBoard.setOrigin().putOnMainBoard(board);

	miniBoard
		.on('pointerdown', function (press, tileXY) {
			// console.log('destroy ' + tileXY.x + ',' + tileXY.y);
			tileXY.children.forEach(e => {
				FadeOutDestroy(e, 100);
			})
		})
	return miniBoard;
};

// Pick 4 connected tiles
var GetAGroup = function (board, inventory) {
	var scene = board.scene;
	var group = new UniqueItemList({ enableDestroyCallback: false });
	var tile = inventory.getLast();
	var neighbors;
	// Random(0, 1) === 1
	// 	? group = build4(group, tile, board, neighbors, inventory)
	// 	: group = build2(group, tile, board, neighbors, inventory)
	// debugger
	group = build4(group, tile, board, neighbors, inventory)
	return group;
};

// Get all neighbors of tiles
var GetNeighborsGroup = function (board, tile, out) {
	var scene = board.scene;
	if (out === undefined) {
		out = new UniqueItemList({ enableDestroyCallback: false });
	}
	out.addMultiple(board.getNeighborChess(tile, null));
	return out;
};


const build2 = (group, tile, board, neighbors, inventory) => {
	for (var i = 0; i < 2; i++) {
		group.add(tile);
		inventory.remove(tile);
		neighbors = GetNeighborsGroup(board, tile, neighbors);
		neighbors.intersect(inventory, neighbors);
		if (neighbors.length > 0) {
			tile = neighbors.getRandom();
		} else {
			break;
		}
	}

	return group
}

const build4 = (group, tile, board, neighbors, inventory) => {
	for (var i = 0; i < 2; i++) {
		group.add(tile);
		inventory.remove(tile);
		neighbors = GetNeighborsGroup(board, tile, neighbors);
		neighbors.intersect(inventory, neighbors);
		if (neighbors.length > 0) {
			tile = neighbors.getRandom();
		} else {
			break;
		}
	}
	const direction = board.getNeighborTileDirection(group.getFirst(), group.getLast())
	console.log(`conlog: direction`, direction)

	const nuderection = direction % 2 === 0 ? 1 : 0

	for (var i = 0; i < 2; i++) {
		tile = board.getNeighborChess(group.get(i), nuderection)
		group.add(tile);
		inventory.remove(tile);
	}

	return group
}

const buildTetris = (group, tile, board, neighbors, inventory) => {
	for (var i = 0; i < 4; i++) {
		group.add(tile);
		inventory.remove(tile);
		neighbors = GetNeighborsGroup(board, tile, neighbors);
		neighbors.intersect(inventory, neighbors);
		if (neighbors.length > 0) {
			tile = neighbors.getRandom();
		} else {
			break;
		}
	}
	return group
}


/*

Build 2
	get one
	get neighbor

Build 4
	Build 2
	select one
	find neighbor
	rnd neighbor dir +/-1
	select both
	get neighbor
	Build 6
		get neighbor again

*/