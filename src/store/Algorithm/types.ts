export enum Algorithms {
	BreadthFirstSearch = "breadthFirstSearch",
	DepthFirstSearch = "depthFirstSearch",
}

export interface IAlgorithmState {
	algorithm: Algorithms;
}
