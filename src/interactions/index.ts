import { store } from "index";
import { Store } from "redux";
import { fromEvent, Subject } from "rxjs";

import { JobStatus } from "store/Job";
import { DrawTools, toolsActionCreators } from "store/Tools";

export const mouseClick$ = fromEvent<MouseEvent>(document, "click");

function determineDispatchAction(
	selectedTool: DrawTools,
	currentTool: DrawTools,
	store: Store
) {
	if (currentTool === selectedTool) {
		store.dispatch(toolsActionCreators.CLEAR_TOOL());
	} else {
		store.dispatch(toolsActionCreators.SELECT_TOOL(selectedTool));
	}
}

export interface INodeClicked {
	operation: Exclude<DrawTools, DrawTools.NoTool>;
	nodeId: string;
}

export const nodeClicked$: Subject<INodeClicked> = new Subject();

export function initKeyPressListener() {
	const keyDown$ = fromEvent<KeyboardEvent>(document, "keydown");

	keyDown$.subscribe(({ key }) => {
		const currentTool = store.getState().tools.activatedTool;

		if (store.getState().job.status === JobStatus.Running) {
			return;
		}
		switch (key) {
			case "s":
				determineDispatchAction(DrawTools.DrawStart, currentTool, store);
				break;
			case "e":
				determineDispatchAction(DrawTools.DrawEnd, currentTool, store);
				break;
			case "d":
				determineDispatchAction(DrawTools.DeleteItem, currentTool, store);
				break;
			case "o":
				determineDispatchAction(DrawTools.DrawObstacle, currentTool, store);
				break;

			default:
				break;
		}
	});
}
