export enum JobStatus {
	Running,
	Idle, // Grid is empty
	Finished, // Grid is fully colored
	Error,
}

export interface IJobState {
	status: JobStatus;
	errorMessage?: string;
}
