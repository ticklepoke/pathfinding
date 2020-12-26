import { combineReducers } from "redux";

import { gridReducer } from "store/Grid/Grid";

import { obstaclesReducer } from "./Obstacles";
import { State } from "./state";

const createRootReducer = () =>
	combineReducers<State>({
		obstacles: obstaclesReducer,
		grid: gridReducer,
	});

export default createRootReducer;
