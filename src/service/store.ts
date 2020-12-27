import { store } from "index";
import { from, of } from "rxjs";
import { concatMap, delay } from "rxjs/operators";

import { IAdjacencyList } from "service/AdjacencyList";
import Bfs from "service/Bfs";
import Dfs from "service/Dfs";
import { Algorithms } from "store/Algorithm";

const algorithmToEnum = {
	[Algorithms.BreadthFirstSearch]: Bfs,
	[Algorithms.DepthFirstSearch]: Dfs,
};

export function findPath$(
	adjList: IAdjacencyList,
	start: number,
	end?: number
) {
	const selectedAlgo = store.getState().algorithm.algorithm;
	const path = algorithmToEnum[selectedAlgo](adjList, start, end);

	if (!path) {
		return;
	}
	return from(path).pipe(concatMap((x) => of(x).pipe(delay(50))));
}
