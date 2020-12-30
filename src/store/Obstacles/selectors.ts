import { IState } from "store/state";

const getObstaclesState = (state: IState) => state.obstacles;

export const getObstacles = getObstaclesState;
