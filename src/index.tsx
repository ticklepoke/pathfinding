import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { initKeyPressListener } from "interactions";
import { initStore } from "store/store";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "./index.css";

export const store = initStore();
initKeyPressListener();

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
