import { IState } from "store/state";

const getToolsState = (state: IState) => state.tools;

export const getActivatedTool = (state: IState) =>
	getToolsState(state).activatedTool;
