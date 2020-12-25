import { chunk, range } from 'lodash';

export interface IAdjacencyList {
  [key: number]: number[];
}

export default function AdjacencyList(rows: number, cols: number) {
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

  const grid = chunk(range(0, rows * cols, 1), cols);

  const adjList: IAdjacencyList = {};
  grid.forEach((row, i) => {
    row.forEach((entry, j) => {
      let curr: number[] = [];
      DIRECTIONS.forEach((dir) => {
        const nextRow = i + dir[0];
        const nextCol = j + dir[1];
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

      adjList[entry] = curr;
    });
  });

  return adjList;
}
