import { RocketOutlined } from "@ant-design/icons";
import { Button, Col, Popover, Row, Typography } from "antd";
import React from "react";

const { Text } = Typography;

export default function KeyboardShortcuts() {
	const popoverContent = (
		<>
			<Row>
				<Col span={20}>
					<Text>Draw start node</Text>
				</Col>
				<Col span={4}>
					<Text keyboard>s</Text>
				</Col>
			</Row>
			<Row>
				<Col span={20}>
					<Text>Draw end node</Text>
				</Col>
				<Col span={4}>
					<Text keyboard>e</Text>
				</Col>
			</Row>
			<Row>
				<Col span={20}>
					<Text>Draw obstacle</Text>
				</Col>
				<Col span={4}>
					<Text keyboard>o</Text>
				</Col>
			</Row>
			<Row>
				<Col span={20}>
					<Text>Delete drawing</Text>
				</Col>
				<Col span={4}>
					<Text keyboard>d</Text>
				</Col>
			</Row>
		</>
	);
	return (
		<Popover
			content={popoverContent}
			title="Keyboard Shortcuts"
			placement="topRight"
		>
			<Button
				type="primary"
				icon={<RocketOutlined />}
				shape="circle"
				className="keyboard-shortcuts-button"
			/>
		</Popover>
	);
}
