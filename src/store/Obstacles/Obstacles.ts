import * as _ from "lodash";

import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState as makeReducer } from "typescript-fsa-reducers";

import { ObstaclesState } from "./types";

const actionCreator = actionCreatorFactory("OBSTACLES");

const INITIAL_STATE: ObstaclesState = {
	obstacles: [],
};

export const obstaclesActionCreators = {
	ADD_GRID_ITEM: actionCreator<string>("ADD_GRID_ITEM"),
	REMOVE_GRID_ITEM: actionCreator<string>("REMOVE_GRID_ITEM"),
	CLEAR_OBSTACLE: actionCreator("CLEAR_OBSTACLE"),
};

export const obstaclesReducer = makeReducer(INITIAL_STATE)
	.case(
		obstaclesActionCreators.ADD_GRID_ITEM,
		(state: ObstaclesState, uuid: string) => {
			const obstacles = _.cloneDeep(state.obstacles);
			if (!_.some(obstacles, { uuid })) {
				obstacles.push({ uuid });
			}
			return {
				...state,
				obstacles,
			};
		}
	)
	.case(
		obstaclesActionCreators.REMOVE_GRID_ITEM,
		(state: ObstaclesState, uuid: string) => ({
			...state,
			obstacles: _.remove(
				state.obstacles,
				(obstacle) => obstacle.uuid === uuid
			),
		})
	)
	.case(
		obstaclesActionCreators.CLEAR_OBSTACLE,
		(state: ObstaclesState) => state
	);
