import { chunk, range } from "lodash";

export interface IAdjacencyList {
  [key: number]: number[];
}

export default function AdjacencyList(rows: number, cols: number) {
  const DIRECTIONS = [-1, 0, 1];

  const grid = chunk(range(0, rows * cols, 1), cols);

  const adjList: IAdjacencyList = {};
  grid.forEach((row, i) => {
    row.forEach((entry, j) => {
      let curr: number[] = [];
      DIRECTIONS.forEach((rowDir) => {
        DIRECTIONS.forEach((colDir) => {
          if (rowDir === 0 && colDir === 0) {
            return;
          }
          const nextRow = i + rowDir;
          const nextCol = j + colDir;
          if (
            nextRow < 0 ||
            nextRow >= grid.length ||
            nextCol < 0 ||
            nextCol >= grid[0].length
          ) {
            return;
          }
          curr.push(grid[nextRow][nextCol]);
        });
      });

      adjList[entry] = curr;
    });
  });

  return adjList;
}
