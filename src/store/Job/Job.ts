import { IJobState, JobStatus } from "store/Job/types";
import actionCreatorFactory from "typescript-fsa";
import { reducerWithInitialState as makeReducer } from "typescript-fsa-reducers";

const actionCreator = actionCreatorFactory("JOB");

const INITIAL_STATE: IJobState = {
	status: JobStatus.Idle,
};

export const jobActionCreators = {
	START_JOB: actionCreator("START"),
	CLEAR_JOB: actionCreator("CLEAR"),
	FINISH_JOB: actionCreator("FINISH"),
	SET_ERROR: actionCreator<string | undefined>("SET_ERROR"),
	RESOLVE_ERROR: actionCreator("RESOLVE_ERROR"),
};

export const jobReducer = makeReducer(INITIAL_STATE)
	.case(jobActionCreators.START_JOB, (state: IJobState) => ({
		...state,
		status: JobStatus.Running,
	}))
	.case(jobActionCreators.CLEAR_JOB, (state: IJobState) => ({
		...state,
		status: JobStatus.Idle,
	}))
	.case(jobActionCreators.FINISH_JOB, (state: IJobState) => ({
		...state,
		status: JobStatus.Finished,
	}))
	.case(
		jobActionCreators.SET_ERROR,
		(state: IJobState, errorMessage?: string) => ({
			...state,
			status: JobStatus.Error,
			errorMessage,
		})
	)
	.case(jobActionCreators.RESOLVE_ERROR, (state: IJobState) => ({
		...state,
		status: JobStatus.Idle,
	}));
