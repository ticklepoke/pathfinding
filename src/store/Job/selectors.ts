import { State } from "store/state";

const getJobState = (state: State) => state.job;

export const getJobStatus = (state: State) => getJobState(state).status;

export const getJobError = (state: State) => getJobState(state).errorMessage;
