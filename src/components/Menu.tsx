import {
	DeleteOutlined,
	DisconnectOutlined,
	NodeCollapseOutlined,
	NodeExpandOutlined,
	PlayCircleOutlined,
	RedoOutlined,
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
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Algorithms, getAlgorithmSelector } from "store/Algorithm";
import { getGridRowsCols, gridActionCreators } from "store/Grid";
import {
	getJobError,
	getJobStatus,
	jobActionCreators,
	JobStatus,
} from "store/Job";
import { DrawTools, getActivatedTool, toolsActionCreators } from "store/Tools";

import { algorithmActionCreators } from "../store/Algorithm";

const { Title, Text } = Typography;
const { Option } = Select;

export default function Menu() {
	const dispatch = useDispatch();
	const { rows, cols } = useSelector(getGridRowsCols);
	const jobState = useSelector(getJobStatus);
	const jobError = useSelector(getJobError);
	const selectedAlgo = useSelector(getAlgorithmSelector);
	const activatedTool = useSelector(getActivatedTool);

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

	const dispatchClearJob = useCallback(() => {
		dispatch(jobActionCreators.CLEAR_JOB());
	}, [dispatch]);

	const dispatchSelectAlgo = useCallback(
		(algo: Algorithms) => {
			dispatch(algorithmActionCreators.SET_ALGORITHM(algo));
		},
		[dispatch]
	);

	const dispatchSelectTool = useCallback(
		(selectedTool: DrawTools) => {
			if (selectedTool === activatedTool) {
				dispatch(toolsActionCreators.CLEAR_TOOL());
			} else {
				dispatch(toolsActionCreators.SELECT_TOOL(selectedTool));
			}
		},
		[dispatch, activatedTool]
	);

	const renderButton = useCallback(() => {
		if (jobState === JobStatus.Finished) {
			return (
				<Button
					className="w-100p"
					type="primary"
					onClick={dispatchClearJob}
					icon={<RedoOutlined />}
				>
					Clear Path
				</Button>
			);
		}
		if (jobState === JobStatus.Running) {
			return (
				<Button className="w-100p" type="primary" disabled>
					<Spin />
				</Button>
			);
		}

		if (jobState === JobStatus.Error) {
			<Button
				className="w-100p"
				type="primary"
				disabled
				icon={<DisconnectOutlined />}
			>
				Something went wrong
			</Button>;
		}

		return (
			<Button
				className="w-100p"
				type="primary"
				onClick={dispatchStartJob}
				icon={<PlayCircleOutlined />}
			>
				Start Pathfinding
			</Button>
		);
	}, [jobState]);

	return (
		<div className="vh-100 w-300px p-10 border-right-gray">
			<Title level={3}>Pathfinding</Title>
			<Text strong>Tools</Text>
			<div className="w-100p d-flex justify-start mt-10 mb-20">
				<Tooltip title="Draw Starting Node" placement="bottomRight">
					<Button
						type={activatedTool === DrawTools.DrawStart ? "primary" : "default"}
						onClick={() => dispatchSelectTool(DrawTools.DrawStart)}
						disabled={jobState === JobStatus.Running}
					>
						<NodeExpandOutlined />
					</Button>
				</Tooltip>
				<Tooltip title="Draw Ending Node" placement="bottomRight">
					<Button
						type={activatedTool === DrawTools.DrawEnd ? "primary" : "default"}
						onClick={() => dispatchSelectTool(DrawTools.DrawEnd)}
						disabled={jobState === JobStatus.Running}
					>
						<NodeCollapseOutlined />
					</Button>
				</Tooltip>
				<Tooltip title="Draw Obstacles" placement="bottomRight">
					<Button
						type={
							activatedTool === DrawTools.DrawObstacle ? "primary" : "default"
						}
						onClick={() => dispatchSelectTool(DrawTools.DrawObstacle)}
						disabled={jobState === JobStatus.Running}
					>
						<StopOutlined />
					</Button>
				</Tooltip>
				<Tooltip title="Clear Node" placement="bottomRight">
					<Button
						danger
						type={
							activatedTool === DrawTools.DeleteItem ? "primary" : "default"
						}
						onClick={() => dispatchSelectTool(DrawTools.DeleteItem)}
						disabled={jobState === JobStatus.Running}
					>
						<DeleteOutlined />
					</Button>
				</Tooltip>
			</div>
			<Text strong>Algorithm</Text>
			<Select
				className="w-100p mt-10 mb-20"
				placeholder="Select Algorithm"
				value={selectedAlgo}
				onChange={dispatchSelectAlgo}
			>
				<Option value={Algorithms.BreadthFirstSearch}>
					Breadth First Search
				</Option>
				<Option value={Algorithms.DepthFirstSearch}>Depth First Search</Option>
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
			{renderButton()}
			{jobError && <Text type="danger">An error occured: {jobError}</Text>}
		</div>
	);
}
