import { compose, createStore, StoreEnhancer } from "redux";

import createRootReducer from "./reducers";

interface IHasDevToolsExtension {
	__REDUX_DEVTOOLS_EXTENSION__: () => StoreEnhancer;
}

const devToolsExtension: StoreEnhancer =
	typeof window === "object" &&
	((window as unknown) as Window & IHasDevToolsExtension)
		.__REDUX_DEVTOOLS_EXTENSION__
		? ((window as unknown) as Window &
				IHasDevToolsExtension).__REDUX_DEVTOOLS_EXTENSION__()
		: (f) => f;

export function initStore() {
	const store = createStore(createRootReducer(), compose(devToolsExtension));
	return store;
}
