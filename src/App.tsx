import {
	NodeCollapseOutlined,
	NodeExpandOutlined,
	StopOutlined,
} from "@ant-design/icons";
import { Button, Menu, Tooltip, Typography } from "antd";
import MenuItem from "antd/lib/menu/MenuItem";
import React, { useEffect, useState } from "react";
import { SubSink } from "subsink";

import NumberGrid from "components/NumberGrid";
import { keyDown$, keyUp$ } from "interactions";

import "./App.css";

const { Title } = Typography;

export enum DrawTools {
	DrawObstacle,
	DrawEndNode,
	DrawStartNode,
}

export function App() {
	const [keyPressed, setKeyPressed] = useState<string | null>();

	const [drawTool, setDrawTool] = useState<DrawTools | null>();

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

	const handleDrawToolClick = (tool: DrawTools) => {
		if (drawTool === tool) {
			setDrawTool(null);
		} else {
			setDrawTool(tool);
		}
	};

	return (
		<div>
			<Menu
				style={{ height: "100vh", width: "300px" }}
				mode="vertical"
				expandIcon={null}
			>
				<MenuItem disabled>
					<Title level={3}>Pathfinding</Title>
				</MenuItem>
				<div
					style={{ width: "100%", display: "flex", justifyContent: "center" }}
				>
					<Tooltip title="Draw Starting Node">
						<Button
							type={
								drawTool === DrawTools.DrawStartNode ? "primary" : "default"
							}
							onClick={() => handleDrawToolClick(DrawTools.DrawStartNode)}
						>
							<NodeExpandOutlined />
						</Button>
					</Tooltip>
					<Tooltip title="Draw Ending Node">
						<Button
							type={drawTool === DrawTools.DrawEndNode ? "primary" : "default"}
							onClick={() => handleDrawToolClick(DrawTools.DrawEndNode)}
						>
							<NodeCollapseOutlined />
						</Button>
					</Tooltip>
					<Tooltip title="Draw Obstacles">
						<Button
							type={drawTool === DrawTools.DrawObstacle ? "primary" : "default"}
							onClick={() => handleDrawToolClick(DrawTools.DrawObstacle)}
						>
							<StopOutlined />
						</Button>
					</Tooltip>
				</div>
				{/* <Tag color={keyPressed === "o" ? "processing" : "default"}>
						Draw Obstacle
					</Tag>
					<Tag color={keyPressed === "s" ? "processing" : "default"}>
						Draw Start
					</Tag>
					<Tag color={keyPressed === "e" ? "processing" : "default"}>
						Draw End
					</Tag> */}
			</Menu>
			<NumberGrid />
		</div>
	);
}

export default App;
