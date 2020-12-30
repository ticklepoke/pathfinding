import { State } from "store/state";

const getToolsState = (state: State) => state.tools;

export const getActivatedTool = (state: State) =>
	getToolsState(state).activatedTool;
