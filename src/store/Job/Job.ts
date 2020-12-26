import { JobState, JobStatus } from "store/Job/types";
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState as makeReducer } from "typescript-fsa-reducers";

const actionCreator = actionCreatorFactory("JOB");

const INITIAL_STATE: JobState = {
	status: JobStatus.Idle,
};

export const jobActionCreators = {
	START_JOB: actionCreator("START"),
	STOP_JOB: actionCreator("STOP"),
	SET_ERROR: actionCreator<string | undefined>("SET_ERROR"),
	RESOLVE_ERROR: actionCreator("RESOLVE_ERROR"),
};

export const jobReducer = makeReducer(INITIAL_STATE)
	.case(jobActionCreators.START_JOB, (state: JobState) => ({
		...state,
		status: JobStatus.Running,
	}))
	.case(jobActionCreators.STOP_JOB, (state: JobState) => ({
		...state,
		status: JobStatus.Idle,
	}))
	.case(
		jobActionCreators.SET_ERROR,
		(state: JobState, errorMessage?: string) => ({
			...state,
			status: JobStatus.Error,
			errorMessage,
		})
	)
	.case(jobActionCreators.RESOLVE_ERROR, (state: JobState) => ({
		...state,
		status: JobStatus.Idle,
	}));
