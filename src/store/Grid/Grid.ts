import { IGridState } from "store/Grid/types";
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState as makeReducer } from "typescript-fsa-reducers";

const actionCreator = actionCreatorFactory("GRID");

const INITIAL_STATE: IGridState = {
	rows: 10,
	cols: 10,
};

const MAX_DIMENSION = 50;
const MIN_DIMENSION = 1;

export function withinDimensions(newDimension: number) {
	return newDimension <= MAX_DIMENSION && newDimension > MIN_DIMENSION;
}

export const gridActionCreators = {
	INC_COL: actionCreator("INC_COL"), // TODO: future extension with keyboard
	DEC_COL: actionCreator("DEC_COL"),
	INC_ROW: actionCreator("INC_ROW"),
	DEC_ROW: actionCreator("DEC_ROW"),
	SET_ROW: actionCreator<number>("SET_ROW"),
	SET_COL: actionCreator<number>("SET_COL"),
};

export const gridReducer = makeReducer(INITIAL_STATE)
	.case(gridActionCreators.INC_COL, (state: IGridState) => ({
		...state,
		cols: withinDimensions(state.cols + 1) ? state.cols + 1 : state.cols,
	}))
	.case(gridActionCreators.DEC_COL, (state: IGridState) => ({
		...state,
		cols: withinDimensions(state.cols - 1) ? state.cols - 1 : state.cols,
	}))
	.case(gridActionCreators.INC_ROW, (state: IGridState) => ({
		...state,
		rows: withinDimensions(state.rows + 1) ? state.rows + 1 : state.rows,
	}))
	.case(gridActionCreators.DEC_ROW, (state: IGridState) => ({
		...state,
		rows: withinDimensions(state.rows - 1) ? state.rows - 1 : state.rows,
	}))
	.case(gridActionCreators.SET_COL, (state: IGridState, newCols: number) => ({
		...state,
		cols: withinDimensions(newCols) ? newCols : state.cols,
	}))
	.case(gridActionCreators.SET_ROW, (state: IGridState, newRows: number) => ({
		...state,
		rows: withinDimensions(newRows) ? newRows : state.rows,
	}));
