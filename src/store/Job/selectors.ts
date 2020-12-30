import { IState } from "store/state";

const getJobState = (state: IState) => state.job;

export const getJobStatus = (state: IState) => getJobState(state).status;

export const getJobError = (state: IState) => getJobState(state).errorMessage;
