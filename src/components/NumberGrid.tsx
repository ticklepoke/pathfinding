import { Col, Row } from "antd";
import { chunk, range } from "lodash";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Observable } from "rxjs";
import { SubSink } from "subsink";

import { nodeClicked$ } from "interactions";
import AdjacencyList from "service/AdjacencyList";
import { findPath$ } from "service/store";
import { getGridRowsCols } from "store/Grid";
import { getJobStatus, JobStatus } from "store/Job";
import { DrawTools, getActivatedTool } from "store/Tools";

import GridItem from "./GridItem";

export default function NumberGrid() {
	const [startingNode, setStartingNode] = useState<string>("0");
	const [endNode, setEndNode] = useState<string | undefined>();

	const { rows: numRows, cols: numCols } = useSelector(getGridRowsCols);
	const jobState = useSelector(getJobStatus);
	const selectedDrawTool = useSelector(getActivatedTool);
	let path$: Observable<string> | undefined;

	useEffect(() => {
		const subSink = new SubSink();
		// TODO: refactor this into a pure js file, use store.dispatch() to set the
		// starting node
		subSink.sink = nodeClicked$.subscribe((e) => {
			if (selectedDrawTool === DrawTools.DrawStart) {
				setStartingNode(e.nodeId);
			} else if (selectedDrawTool === DrawTools.DrawEnd) {
				setEndNode(e.nodeId);
			}
		});
		return () => {
			subSink.unsubscribe();
		};
	}, [selectedDrawTool, nodeClicked$]);

	if (jobState === JobStatus.Running || jobState === JobStatus.Finished) {
		const adjList = AdjacencyList(numRows, numCols);
		path$ = findPath$(adjList, startingNode, endNode);
	}

	// if (!path$ || jobState !== JobStatus.Running) {
	// 	return null;
	// }

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
									uuid={col.toString()}
									start={startingNode}
									end={endNode}
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
