import { State } from "store/state";

const getAlgorithmState = (state: State) => state.algorithm;

export const getAlgorithmSelector = (state: State) =>
	getAlgorithmState(state).algorithm;
