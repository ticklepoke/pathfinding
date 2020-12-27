import { GridState } from "store/Grid/types";
import { JobState } from "store/Job/types";

import { ObstaclesState } from "./Obstacles";

export interface State {
	obstacles: ObstaclesState;
	grid: GridState;
	job: JobState;
}
