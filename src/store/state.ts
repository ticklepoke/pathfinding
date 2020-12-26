import { GridState } from "store/Grid/types";

import { ObstaclesState } from "./Obstacles";

export interface State {
	obstacles: ObstaclesState;
	grid: GridState;
}
