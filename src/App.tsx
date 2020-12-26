import React, { useEffect, useState } from "react";
import { SubSink } from "subsink";

import Menu from "components/Menu";
import NumberGrid from "components/NumberGrid";
import { keyDown$, keyUp$ } from "interactions";

import "./App.css";

export function App() {
	const [, setKeyPressed] = useState<string | null>();

	useEffect(() => {
		const subSink = new SubSink();

		subSink.sink = keyDown$.subscribe(({ key }) => {
			setKeyPressed(key);
		});

		subSink.sink = keyUp$.subscribe(() => {
			setKeyPressed(null);
		});

		return () => {
			subSink.unsubscribe();
		};
	}, []);

	return (
		<div>
			<Menu />
			<NumberGrid />
		</div>
	);
}

export default App;
