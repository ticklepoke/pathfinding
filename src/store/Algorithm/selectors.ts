import { IState } from "store/state";

const getAlgorithmState = (state: IState) => state.algorithm;

export const getAlgorithmSelector = (state: IState) =>
	getAlgorithmState(state).algorithm;
