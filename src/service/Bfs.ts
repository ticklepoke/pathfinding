import { IAdjacencyList } from "service/AdjacencyList";

export default function Bfs(
	adjList: IAdjacencyList,
	start: string,
	target?: string
) {
	const queue: string[] = [];
	const found: Set<string> = new Set();

	if (!adjList[start] || adjList[start].length === 0) {
		return null;
	}

	queue.push(...adjList[start]);
	found.add(start);

	while (queue.length > 0) {
		const curr = queue.shift();
		if (curr === undefined || found.has(curr)) {
			continue;
		}
		found.add(curr);
		if (curr === target) {
			break;
		}
		const neighbours = adjList[curr];
		queue.push(...neighbours);
	}

	return found;
}
