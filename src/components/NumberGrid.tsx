import { Col, Row } from "antd";
import { chunk, range } from "lodash";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SubSink } from "subsink";

import { mouseClick$ } from "interactions";
import AdjacencyList from "service/AdjacencyList";
import { findPath$ } from "service/store";
import { getGridRowsCols } from "store/Grid";

import GridItem from "./GridItem";

export default function NumberGrid() {
	const [startingNode, setStartingNode] = useState<string>("1");

	const { rows: numRows, cols: numCols } = useSelector(getGridRowsCols);

	useEffect(() => {
		const subSink = new SubSink();
		subSink.sink = mouseClick$.subscribe(({ target }) => {
			// TODO: combine with key down
			const targetElement = target as HTMLElement;
			setStartingNode(targetElement.id);
		});
		return () => {
			subSink.unsubscribe();
		};
	}, []);

	const adjList = AdjacencyList(numRows, numCols);
	const path$ = findPath$(adjList, parseInt(startingNode));

	if (!path$) {
		return null;
	}

	const grid = range(0, numRows * numCols, 1);
	const rows = chunk(grid, numCols);

	return (
		<div className="number-grid-container d-flex justify-center align-center">
			<div className="overflow-auto">
				{rows.map((cols, i) => (
					<Row gutter={0} key={i} wrap={false}>
						{cols.map((col, j) => (
							<Col key={j}>
								<GridItem
									uuid={col}
									start={parseInt(startingNode)}
									path$={path$}
								/>
							</Col>
						))}
					</Row>
				))}
			</div>
		</div>
	);
}
