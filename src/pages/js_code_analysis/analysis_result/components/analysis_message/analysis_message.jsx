import { useContext, useCallback, useRef } from "react";
import { Button } from "antd";
import SplitPane from "react-split-pane";

import { AnalysisResultContext } from "../../analysis_result.jsx";
import AddCodeStructUsed from "./add_code_struct_used.jsx";
import CodeStructPath from "./code_struct_path.jsx";
import CodeStructsUsedTree from "./code_structs_used_tree.jsx";
import CodeStructsUseTree from "./code_structs_use_tree.jsx";
import AllCodeStructsUsedTree from "./all_code_structs_used_tree.jsx";

import styles from "./analysis_message.module.scss";

const AnalysisMessage = () => {
	const {
		codeStructsMap,
		selectedCodeStruct,
		analysisConfig,
		usedCodeStructsTreeData,
		useCodeStructsTreeData,
		setUsedCodeStructsTreeData,
		selectedCodeStructAnalysis,
	} = useContext(AnalysisResultContext);

	const addCodeStructUsedRef = useRef(null);
	const allCodeStructsUsedTreeRef = useRef(null);

	/** Tree 组件重新渲染内部节点 */
	const renderByTreeData = useCallback(() => {
		setUsedCodeStructsTreeData([...selectedCodeStructAnalysis.usedCodeFileStructs]);
	}, [selectedCodeStructAnalysis, setUsedCodeStructsTreeData]);
	/** 展示所有被被调用的代码信息 */
	const startShowAllCodeStructsUsed = useCallback(() => {
		allCodeStructsUsedTreeRef.current.showAllCodeStructsUsedTree();
	}, []);

	/** 点击【添加被调用信息】按钮, 开始添加被调用信息 */
	const startAddCodeUsedMessage = useCallback(() => {
		addCodeStructUsedRef.current?.startAddCodeStructUsed();
	}, []);
	/** 添加被调用信息 */
	const handleOnAddUsedCodeStructOk = useCallback(
		(codeStructKeys) => {
			selectedCodeStructAnalysis.addUsedCodeStructFromCodeStructKeys(codeStructKeys, codeStructsMap);
			renderByTreeData();
		},
		[codeStructsMap, renderByTreeData, selectedCodeStructAnalysis]
	);
	/** 点击【添加后续调用信息】按钮,开始添加后续被调用信息 */
	const handleOnAddNextUsedCodeStruct = useCallback((usedCodeStruct) => {
		addCodeStructUsedRef.current?.startAddNextUsedCodeStruct(usedCodeStruct);
	}, []);
	/** 添加后续被调用信息 */
	const handleOnAddNextUsedCodeStructOk = useCallback(
		(startUsedCodeStruct, selectedStructUsedKeys) => {
			startUsedCodeStruct.addNextUsedCodeStructFromCodeStructKeys(selectedStructUsedKeys, codeStructsMap);
			renderByTreeData();
		},
		[codeStructsMap, renderByTreeData]
	);
	/** 删除被调用信息 */
	const handleOnDeleteUsedCodeStruct = useCallback(
		(usedCodeStruct) => {
			usedCodeStruct.removeFromParent();
			renderByTreeData();
		},
		[renderByTreeData]
	);
	/** 点击跳转到对应的 vscode 代码文件  */
	const handleOnOpenFileInVsCode = useCallback(
		(usedCodeFileStruct) => {
			window.open(`${analysisConfig.vsCodeUriPrefix ?? ""}${usedCodeFileStruct.codeFileStruct.file.key}`);
		},
		[analysisConfig]
	);

	return (
		<div className={styles.analysis_message}>
			<AddCodeStructUsed
				ref={addCodeStructUsedRef}
				onAddUsedCodeStructOk={handleOnAddUsedCodeStructOk}
				onAddNextUsedCodeStructOk={handleOnAddNextUsedCodeStructOk}
			/>
			<div className={styles.analysis_message_header}>
				<CodeStructPath codeStruct={selectedCodeStruct} />
				{selectedCodeStruct ? null : <div className={styles.analysis_message_header_empty}>请选择代码结构</div>}
			</div>
			<div className={styles.analysis_message_operations}>
				<AllCodeStructsUsedTree ref={allCodeStructsUsedTreeRef} deleteUsedCodeStruct={handleOnDeleteUsedCodeStruct} />
				<Button className={styles.analysis_message_operation} size="small" onClick={startShowAllCodeStructsUsed}>
					展示所有被调用信息
				</Button>
				{selectedCodeStruct ? (
					<Button className={styles.analysis_message_operation} size="small" onClick={startAddCodeUsedMessage}>
						添加被调用信息
					</Button>
				) : null}
			</div>
			<div className={styles.analysis_message_body}>
				<SplitPane split="horizontal" minSize={"50%"}>
					<CodeStructsUsedTree
						key={selectedCodeStructAnalysis?.key ?? 0}
						treeData={usedCodeStructsTreeData}
						openFileInVsCode={handleOnOpenFileInVsCode}
						addNextUsedCodeStruct={handleOnAddNextUsedCodeStruct}
						deleteUsedCodeStruct={handleOnDeleteUsedCodeStruct}
					/>
					<CodeStructsUseTree key={selectedCodeStructAnalysis?.key ?? 0} treeData={useCodeStructsTreeData} />
				</SplitPane>
			</div>
		</div>
	);
};

export default AnalysisMessage;
