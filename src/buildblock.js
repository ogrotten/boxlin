import Phaser from "phaser";

const FillChess = (board, tiles, texture, key) => {
	const scene = board.scene;
	const grid = board.grid;
	// Create mini board
	let miniBoard = scene.rexBoard.add.miniBoard(grid.x, grid.y, {
		grid: grid,
		draggable: true
	});
	// Add chess
	for (let i = 0, cnt = tiles.length; i < cnt; i++) {
		const tileXY = tiles[i].rexChess.tileXYZ;
		const chess = scene.add.image(0, 0, texture, key);
		// setTimeout(() => miniBoard.addChess(chess, tileXY.x, tileXY.y, 1), 1000)
		miniBoard.addChess(chess, tileXY.x, tileXY.y, 1);
	}
	// Set origin, put on main board
	miniBoard.setOrigin().putOnMainBoard(board);

	// Add drag behavior
	// miniBoard
	// 	.on(
	// 		"dragstart",
	// 		function (pointer, dragX, dragY) {
	// 			this.pullOutFromMainBoard();
	// 			this.setAlpha(0.3);
	// 		},
	// 		miniBoard
	// 	)
	// 	.on(
	// 		"drag",
	// 		function (pointer, dragX, dragY) {
	// 			this.setPosition(dragX, dragY);
	// 			if (this.isOverlapping(board)) {
	// 				this.setAlpha(0.7);
	// 				this.alignToMainBoard(board);
	// 			} else {
	// 				this.setAlpha(0.3);
	// 			}
	// 		},
	// 		miniBoard
	// 	)
	// 	.on(
	// 		"dragend",
	// 		function (pointer, dragX, dragY) {
	// 			this.putOnMainBoard(board);
	// 			if (this.mainBoard) {
	// 				this.setAlpha(1);
	// 			}
	// 		},
	// 		miniBoard
	// 	);
	return miniBoard;
};

// Pick 4 connected tiles
const GetAGroup = (board, candidates) => {
	const scene = board.scene;
	const group = scene.plugins
		.get("rexuniqueitemlistplugin")
		.add({ enableDestroyCallback: false });
	let tile = candidates.getLast();
	let neighbors;
	for (let i = 0; i < 4; i++) {
		group.add(tile);
		candidates.remove(tile);
		neighbors = GetNeighborsGroup(board, tile, neighbors);
		neighbors.intersect(candidates, neighbors);
		if (neighbors.length > 0) {
			tile = neighbors.getRandom();
		} else {
			break;
		}
	}
	return group;
};

// Get all neighbors of tiles
const GetNeighborsGroup = (board, tile, out) => {
	const scene = board.scene;
	if (out === undefined) {
		out = scene.plugins
			.get("rexuniqueitemlistplugin")
			.add({ enableDestroyCallback: false });
	}
	out.addMultiple(board.getNeighborChess(tile, null));
	return out;
};
