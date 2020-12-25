import { IAdjacencyList } from 'service/AdjacencyList';

export default function Bfs(
  adjList: IAdjacencyList,
  start: number,
  target?: number
) {
  let queue: number[] = [];
  let found: Set<number> = new Set();

  if (!adjList[start] || adjList[start].length === 0) {
    return null;
  }

  queue.push(...adjList[start]);
  found.add(start);

  while (queue.length > 0) {
    let curr = queue.shift();
    if (curr === undefined || found.has(curr)) {
      continue;
    }
    found.add(curr);
    if (curr === target) {
      break;
    }
    let neighbours = adjList[curr];
    queue.push(...neighbours);
  }

  return found;
}
