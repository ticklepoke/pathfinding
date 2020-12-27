import { combineReducers } from "redux";

import { gridReducer } from "store/Grid/Grid";
import { jobReducer } from "store/Job/Job";

import { obstaclesReducer } from "./Obstacles";
import { State } from "./state";

const createRootReducer = () =>
	combineReducers<State>({
		obstacles: obstaclesReducer,
		grid: gridReducer,
		job: jobReducer,
	});

export default createRootReducer;
