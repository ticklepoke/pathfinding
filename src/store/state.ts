import { IAlgorithmState } from "store/Algorithm";
import { IGridState } from "store/Grid/types";
import { IJobState } from "store/Job/types";
import { IObstaclesState } from "store/Obstacles";
import { IToolsState } from "store/Tools";

export interface IState {
	obstacles: IObstaclesState;
	grid: IGridState;
	job: IJobState;
	algorithm: IAlgorithmState;
	tools: IToolsState;
}
