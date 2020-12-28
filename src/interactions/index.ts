import { store } from "index";
import { Store } from "redux";
import { fromEvent } from "rxjs";

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

export function initKeyPressListener() {
	const keyDown$ = fromEvent<KeyboardEvent>(document, "keydown");

	keyDown$.subscribe(({ key }) => {
		const currentTool = store.getState().tools.activatedTool;

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
