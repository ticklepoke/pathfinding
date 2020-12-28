export enum DrawTools {
	DrawStart,
	DrawEnd,
	DrawObstacle,
	DeleteItem,
	NoTool,
}

export interface IToolsState {
	activatedTool: DrawTools;
}
