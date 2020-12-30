import { Algorithms, IAlgorithmState } from "store/Algorithm/types";
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState as makeReducer } from "typescript-fsa-reducers";

const actionCreator = actionCreatorFactory("ALGORITHM");

const INITIAL_STATE: IAlgorithmState = {
	algorithm: Algorithms.BreadthFirstSearch,
};

export const algorithmActionCreators = {
	SET_ALGORITHM: actionCreator<Algorithms>("SET_ALGORITHM"),
};

export const algorithmReducer = makeReducer(INITIAL_STATE).case(
	algorithmActionCreators.SET_ALGORITHM,
	(state: IAlgorithmState, algo: Algorithms) => ({
		...state,
		algorithm: algo,
	})
);
