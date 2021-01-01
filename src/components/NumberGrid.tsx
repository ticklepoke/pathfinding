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
	const [obstacles, setObstacles] = useState<Set<string>>(new Set());

	const { rows: numRows, cols: numCols } = useSelector(getGridRowsCols);
	const jobState = useSelector(getJobStatus);
	const selectedDrawTool = useSelector(getActivatedTool);
	let path$: Observable<string> | undefined;

	useEffect(() => {
		const subSink = new SubSink();
		subSink.sink = nodeClicked$.subscribe((e) => {
			if (selectedDrawTool === DrawTools.DrawStart) {
				setStartingNode(e.nodeId);
			} else if (selectedDrawTool === DrawTools.DrawEnd) {
				setEndNode(e.nodeId);
			} else if (selectedDrawTool === DrawTools.DrawObstacle) {
				addObstacle(e.nodeId);
			}
		});
		return () => {
			subSink.unsubscribe();
		};
	}, [selectedDrawTool, nodeClicked$]);

	const addObstacle = (newNode: string) => {
		setObstacles(new Set(obstacles.add(newNode)));
	};

	// const deleteObstacle = (deleteNode: string) => {
	// 	if (obstacles.delete(deleteNode)) {
	// 		setObstacles(new Set(obstacles));
	// 	}
	// };

	if (jobState === JobStatus.Running || jobState === JobStatus.Finished) {
		const adjList = AdjacencyList(numRows, numCols, obstacles);
		path$ = findPath$(adjList, startingNode, endNode);
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
									uuid={col.toString()}
									start={startingNode}
									end={endNode}
									path$={path$}
									obstacles={obstacles}
								/>
							</Col>
						))}
					</Row>
				))}
			</div>
		</div>
	);
}
