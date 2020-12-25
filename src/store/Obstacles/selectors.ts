import { State } from 'store/state';

const getObstaclesState = (state: State) => state.obstacles;

export const getObstacles = getObstaclesState;
