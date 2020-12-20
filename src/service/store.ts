import { from, of } from "rxjs";
import { concatMap, delay } from "rxjs/operators";
import { IAdjacencyList } from "./AdjacencyList";
import Bfs from "./Bfs";

export function findPath$(
  adjList: IAdjacencyList,
  start: number,
  end?: number
) {
  const path = Bfs(adjList, start, end);
  if (!path) {
    return;
  }
  return from(path).pipe(concatMap((x) => of(x).pipe(delay(50))));
}
