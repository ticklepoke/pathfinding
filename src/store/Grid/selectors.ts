import { IState } from "store/state";

const getGridState = (state: IState) => state.grid;

export const getGridRowsCols = (state: IState) => ({
	rows: getGridState(state).rows,
	cols: getGridState(state).cols,
});
