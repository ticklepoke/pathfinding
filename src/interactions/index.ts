import { store } from "index";
import { Store } from "redux";
import { fromEvent, Observable } from "rxjs";
import { filter, map } from "rxjs/operators";

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

function isClickedGrid(e: KeyboardEvent) {
	if (!e.target) {
		return false;
	}
	const targetElement = e.target as HTMLElement;
	if (!targetElement.id || !targetElement.id.includes("grid-item-")) {
		return false;
	}
	return true;
}

export interface INodeClicked {
	nodeId: string;
}

export const nodeClicked$: Observable<INodeClicked> = fromEvent<KeyboardEvent>(
	document,
	"mousedown"
).pipe(
	filter(isClickedGrid),
	map(({ target }) => {
		const targetElement = target as HTMLElement;
		const id = targetElement.id.replace("grid-item-", "");
		// TODO: check for nearby id, make sure its a grid element,
		// return appropriate tool
		return {
			nodeId: id,
		};
	})
);

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
			case "Escape":
				store.dispatch(toolsActionCreators.CLEAR_TOOL());
				break;
			default:
				break;
		}
	});
}
