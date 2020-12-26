import { State } from "store/state";

const getGridState = (state: State) => state.grid;

export const getGridRowsCols = (state: State) => ({
	rows: getGridState(state).rows,
	cols: getGridState(state).cols,
});
