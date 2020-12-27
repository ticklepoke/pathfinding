import {
	NodeCollapseOutlined,
	NodeExpandOutlined,
	StopOutlined,
} from "@ant-design/icons";
import {
	Button,
	Form,
	InputNumber,
	Select,
	Spin,
	Tooltip,
	Typography,
} from "antd";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getGridRowsCols, gridActionCreators } from "store/Grid";
import {
	getJobError,
	getJobStatus,
	jobActionCreators,
	JobStatus,
} from "store/Job";

const { Title, Text } = Typography;
const { Option } = Select;

// TODO: refactor to tools store
export enum DrawTools {
	DrawObstacle,
	DrawEndNode,
	DrawStartNode,
}

export default function Menu() {
	const [drawTool, setDrawTool] = useState<DrawTools | null>();
	const dispatch = useDispatch();
	const { rows, cols } = useSelector(getGridRowsCols);
	const jobState = useSelector(getJobStatus);
	const jobError = useSelector(getJobError);

	const handleDrawToolClick = (tool: DrawTools) => {
		if (drawTool === tool) {
			setDrawTool(null);
		} else {
			setDrawTool(tool);
		}
	};

	const dispatchSetCol = useCallback(
		(val: number) => {
			dispatch(gridActionCreators.SET_COL(val));
		},
		[dispatch]
	);

	const dispatchSetRow = useCallback(
		(val: number) => {
			dispatch(gridActionCreators.SET_ROW(val));
		},
		[dispatch]
	);

	const dispatchStartJob = useCallback(() => {
		dispatch(jobActionCreators.START_JOB());
	}, [dispatch]);

	return (
		<div className="vh-100 w-300px p-10 border-right-gray">
			<Title level={3}>Pathfinding</Title>
			<Text strong>Tools</Text>
			<div className="w-100p d-flex justify-start mt-10 mb-20">
				<Tooltip title="Draw Starting Node" placement="bottomRight">
					<Button
						type={drawTool === DrawTools.DrawStartNode ? "primary" : "default"}
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
					<InputNumber
						min={1}
						max={50}
						value={cols}
						onChange={(val) => typeof val === "number" && dispatchSetCol(val)}
					/>
				</Tooltip>
				<Tooltip title="Height" placement="bottomRight">
					<InputNumber
						min={1}
						max={50}
						value={rows}
						onChange={(val) => typeof val === "number" && dispatchSetRow(val)}
					/>
				</Tooltip>
			</Form>
			<Button
				className="w-100p"
				type="primary"
				onClick={dispatchStartJob}
				disabled={jobState !== JobStatus.Idle}
			>
				{jobState === JobStatus.Idle ? "Start Pathfinding" : <Spin />}
			</Button>
			{jobError && <Text type="danger">An error occured: {jobError}</Text>}
		</div>
	);
}
