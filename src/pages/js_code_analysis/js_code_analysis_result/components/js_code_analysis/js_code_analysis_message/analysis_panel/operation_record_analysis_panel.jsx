import { useCallback } from "react";
import { Tree } from "antd";

import ImportDeclarationOperationTreeNode from "../operation_record/import_declaration/import_declaration_operation_tree_node.jsx";
import UnknowOperationTreeNode from "../operation_record/unknow_operation/unknow_operation_tree_node.jsx";

import useGetDomHeight from "../../../../../../../hooks/use_get_dom_height.js";

import styles from "../js_code_analysis_message.module.scss";

const OperationRecordAnalysisPanel = (props) => {
	const { operationRecordStruct } = props;

	const { domRef: operationRecordAnalysisPanelDomRef, height: operationRecordAnalysisPanelDomHeight } =
		useGetDomHeight();

	const titleRender = useCallback((node) => {
		if (node.isImportDeclarationOperation) {
			return <ImportDeclarationOperationTreeNode operationRecord={node} />;
		} else if (node.isUnknowOperation) {
			return <UnknowOperationTreeNode operationRecord={node} />;
		} else {
			console.error(
				"OperationRecordAnalysisPanel 根据节点 node",
				node,
				"生成对应的树节点, 节点 node 是未处理的类型, 待完善"
			);
			throw new Error("OperationRecordAnalysisPanel 根据节点 node 生成对应的树节点, 节点 node 是未处理的类型, 待完善");
		}
	}, []);

	return (
		<div className={`${styles.js_code_analysis_panel} ${styles.js_code_operation_record_analysis_panel}`}>
			<div className={styles.js_code_analysis_panel_title}>代码执行记录</div>
			<div
				ref={operationRecordAnalysisPanelDomRef}
				className={`${styles.js_code_analysis_panel_content} ${styles.js_code_operation_record_analysis_panel_content}`}
			>
				<Tree
					key={operationRecordStruct?.key}
					multiple={false}
					blockNode
					showLine
					titleRender={titleRender}
					defaultExpandAll={true}
					treeData={operationRecordStruct.operationRecords}
					height={operationRecordAnalysisPanelDomHeight}
				/>
			</div>
		</div>
	);
};

export default OperationRecordAnalysisPanel;
