export enum Algorithms {
	BreadthFirstSearch = "breadthFirstSearch",
	DepthFirstSearch = "depthFirstSearch",
}

export interface AlgorithmState {
	algorithm: Algorithms;
}
