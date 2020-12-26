import {
	NodeCollapseOutlined,
	NodeExpandOutlined,
	StopOutlined,
} from "@ant-design/icons";
import {
	Button,
	Form,
	InputNumber,
	Menu,
	Select,
	Tooltip,
	Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { SubSink } from "subsink";

import NumberGrid from "components/NumberGrid";
import { keyDown$, keyUp$ } from "interactions";

import "./App.css";

const { Title, Text } = Typography;
const { Option } = Select;

export enum DrawTools {
	DrawObstacle,
	DrawEndNode,
	DrawStartNode,
}

export function App() {
	const [, setKeyPressed] = useState<string | null>();

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
			<Menu className="vh-100 w-300px p-10" mode="vertical" expandIcon={null}>
				<Title level={3}>Pathfinding</Title>
				<Text strong>Tools</Text>
				<div className="w-100p d-flex justify-start mt-10 mb-20">
					<Tooltip title="Draw Starting Node" placement="bottomRight">
						<Button
							type={
								drawTool === DrawTools.DrawStartNode ? "primary" : "default"
							}
							onClick={() => handleDrawToolClick(DrawTools.DrawStartNode)}
						>
							<NodeExpandOutlined />
						</Button>
					</Tooltip>
					<Tooltip title="Draw Ending Node" placement="bottomRight">
						<Button
							type={drawTool === DrawTools.DrawEndNode ? "primary" : "default"}
							onClick={() => handleDrawToolClick(DrawTools.DrawEndNode)}
						>
							<NodeCollapseOutlined />
						</Button>
					</Tooltip>
					<Tooltip title="Draw Obstacles" placement="bottomRight">
						<Button
							type={drawTool === DrawTools.DrawObstacle ? "primary" : "default"}
							onClick={() => handleDrawToolClick(DrawTools.DrawObstacle)}
						>
							<StopOutlined />
						</Button>
					</Tooltip>
				</div>
				<Text strong>Algorithm</Text>
				<Select className="w-100p mt-10 mb-20" placeholder="Select Algorithm">
					<Option value="1">Breadth First Search</Option>
					<Option value="2">Depth First Search</Option>
				</Select>
				<Text strong>Grid Size</Text>
				<Form className="mt-10 mb-20">
					<Tooltip title="Width" placement="bottomRight">
						<InputNumber min={1} max={50} defaultValue={10} />
					</Tooltip>
					<Tooltip title="Height" placement="bottomRight">
						<InputNumber min={1} max={50} defaultValue={10} />
					</Tooltip>
				</Form>
				<Button className="w-100p" type="primary">
					Start Pathfinding
				</Button>
			</Menu>
			<NumberGrid />
		</div>
	);
}

export default App;
