import React, { useImperativeHandle } from "react";
// import { Collapse } from "antd";

import styles from "./analysis_message.module.scss";

// const text = `
//   A dog is a type of domesticated animal.
//   Known for its loyalty and faithfulness,
//   it can be found as a welcome guest in many households across the world.
// `;

// const items = [
// 	{
// 		classNames: {
// 			header: styles.analysis_message_collapse_header,
// 			body: styles.analysis_message_collapse_body,
// 		},
// 		key: "1",
// 		label: "This is panel header 1",
// 		children: <p>{text}</p>,
// 	},
// 	{
// 		classNames: {
// 			header: styles.analysis_message_collapse_header,
// 			body: styles.analysis_message_collapse_body,
// 		},
// 		key: "2",
// 		label: "This is panel header 2",
// 		children: <p>{text}</p>,
// 	},
// 	{
// 		classNames: {
// 			header: styles.analysis_message_collapse_header,
// 			body: styles.analysis_message_collapse_body,
// 		},
// 		key: "3",
// 		label: "This is panel header 3",
// 		children: <p>{text}</p>,
// 	},
// 	{
// 		classNames: {
// 			header: styles.analysis_message_collapse_header,
// 			body: styles.analysis_message_collapse_body,
// 		},
// 		key: "4",
// 		label: "This is panel header 3",
// 		children: <p>{text}</p>,
// 	},
// 	{
// 		classNames: {
// 			header: styles.analysis_message_collapse_header,
// 			body: styles.analysis_message_collapse_body,
// 		},
// 		key: "5",
// 		label: "This is panel header 3",
// 		children: <p>{text}</p>,
// 	},
// ];

const AnalysisMessage = React.forwardRef(function AnalysisMessage(props, ref) {
	// const { codeStructMap, codeFile } = props;

	useImperativeHandle(
		ref,
		() => {
			return {};
		},
		[]
	);

	return (
		<div className={styles.analysis_message}>
			<div className={styles.analysis_message_body}>
				{/* <Collapse style={{ borderRadius: 0 }} items={items} defaultActiveKey={["1", "2", "3", "4", "5"]} /> */}
			</div>
		</div>
	);
});

export default AnalysisMessage;
