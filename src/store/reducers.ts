import { combineReducers } from "redux";

import { algorithmReducer } from "store/Algorithm";
import { gridReducer } from "store/Grid/Grid";
import { jobReducer } from "store/Job/Job";
import { toolsReducer } from "store/Tools";

import { obstaclesReducer } from "./Obstacles";
import { State } from "./state";

const createRootReducer = () =>
	combineReducers<State>({
		obstacles: obstaclesReducer,
		grid: gridReducer,
		job: jobReducer,
		algorithm: algorithmReducer,
		tools: toolsReducer,
	});

export default createRootReducer;
