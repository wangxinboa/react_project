import { useContext, useEffect } from "react";

import { AnalysisResultContext } from "../../analysis_result.jsx";

import styles from "./analysis_message.module.scss";

const AnalysisMessage = () => {
	const { selectedCodeStruct } = useContext(AnalysisResultContext);

	useEffect(() => {
		console.info("selectedCodeStruct:", selectedCodeStruct);
	}, [selectedCodeStruct]);
	return (
		<div className={styles.analysis_message}>
			<div className={styles.analysis_message_body}>
				{/* <Collapse style={{ borderRadius: 0 }} items={items} defaultActiveKey={["1", "2", "3", "4", "5"]} /> */}
			</div>
		</div>
	);
};

export default AnalysisMessage;
