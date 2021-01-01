import { chunk, map, range } from "lodash";

export interface IAdjacencyList {
	[key: string]: string[];
}

export default function AdjacencyList(
	rows: number,
	cols: number,
	obstacles: Set<string>
) {
	const DIRECTIONS = [
		[-1, -1],
		[-1, 0],
		[-1, 1],
		[0, 1],
		[0, -1],
		[1, 1],
		[1, 0],
		[1, -1],
	];

	const temp = chunk(range(0, rows * cols, 1), cols);
	const grid = map(temp, (row) => row.map((entry) => entry.toString()));

	const adjList: IAdjacencyList = {};
	grid.forEach((row, i) => {
		row.forEach((entry, j) => {
			const curr: string[] = [];
			DIRECTIONS.forEach((dir) => {
				const nextRow = i + dir[0];
				const nextCol = j + dir[1];
				if (
					nextRow < 0 ||
					nextRow >= grid.length ||
					nextCol < 0 ||
					nextCol >= grid[0].length ||
					obstacles.has(grid[nextRow][nextCol])
				) {
					return;
				}
				curr.push(grid[nextRow][nextCol]);
			});

			if (!obstacles.has(entry)) {
				adjList[entry] = curr;
			}
		});
	});

	return adjList;
}
