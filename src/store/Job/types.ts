export enum JobStatus {
	Running,
	Idle,
	Error,
}

export interface JobState {
	status: JobStatus;
	errorMessage?: string;
}
