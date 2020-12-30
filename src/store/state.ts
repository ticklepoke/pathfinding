import { IAlgorithmState } from "store/Algorithm";
import { IGridState } from "store/Grid/types";
import { IJobState } from "store/Job/types";
import { IToolsState } from "store/Tools";

import { IObstaclesState } from "./Obstacles";

export interface IState {
	obstacles: IObstaclesState;
	grid: IGridState;
	job: IJobState;
	algorithm: IAlgorithmState;
	tools: IToolsState;
}
