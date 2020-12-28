import { AlgorithmState } from "store/Algorithm";
import { GridState } from "store/Grid/types";
import { JobState } from "store/Job/types";
import { IToolsState } from "store/Tools";

import { ObstaclesState } from "./Obstacles";

export interface State {
	obstacles: ObstaclesState;
	grid: GridState;
	job: JobState;
	algorithm: AlgorithmState;
	tools: IToolsState;
}
