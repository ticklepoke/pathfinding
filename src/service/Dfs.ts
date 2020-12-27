import { IAdjacencyList } from "service/AdjacencyList";

export default function Dfs(
	adjList: IAdjacencyList,
	start: number,
	target?: number
) {
	const stack: number[] = [];
	const found: Set<number> = new Set();

	if (!adjList[start] || adjList[start].length === 0) {
		return null;
	}

	stack.push(...adjList[start]);
	found.add(start);

	while (stack.length > 0) {
		const curr = stack.pop();
		if (curr === undefined || found.has(curr)) {
			continue;
		}
		found.add(curr);
		if (curr === target) {
			break;
		}
		const neighbours = adjList[curr];
		stack.push(...neighbours);
	}

	return found;
}
