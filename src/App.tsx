import React from "react";

import KeyboardShortcuts from "components/KeyboardShortcuts";
import Menu from "components/Menu";
import NumberGrid from "components/NumberGrid";

import "./App.css";

export function App() {
	return (
		<div>
			<Menu />
			<NumberGrid />
			<KeyboardShortcuts />
		</div>
	);
}

export default App;
