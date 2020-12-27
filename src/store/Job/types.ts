export enum JobStatus {
	Running,
	Idle, // Grid is empty
	Finished, // Grid is fully colored
	Error,
}

export interface JobState {
	status: JobStatus;
	errorMessage?: string;
}
