import { DrawTools, IToolsState } from "store/Tools/type";
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState as makeReducer } from "typescript-fsa-reducers";

const actionCreator = actionCreatorFactory("TOOLS");

const INITIAL_STATE: IToolsState = {
	activatedTool: DrawTools.NoTool,
};

export const toolsActionCreators = {
	SELECT_TOOL: actionCreator<DrawTools>("SELECT"),
	CLEAR_TOOL: actionCreator("CLEAR"),
};

export const toolsReducer = makeReducer(INITIAL_STATE)
	.case(
		toolsActionCreators.SELECT_TOOL,
		(state: IToolsState, activatedTool: DrawTools) => ({
			...state,
			activatedTool,
		})
	)
	.case(toolsActionCreators.CLEAR_TOOL, (state: IToolsState) => ({
		...state,
		activatedTool: DrawTools.NoTool,
	}));
