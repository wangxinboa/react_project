import { useState } from "react";
import { useMemo, useCallback } from "react";

import styles from "./js_code_analysis.module.scss";

const jsCodeStructsTreeTitle = "ast 代码结构";
const jsCodeFileStructAnalysisTitle = "文件代码分析";

export default function useJsCodeAnalysisSegmented() {
	const jsCodeAnalysisSegmentedOptions = useMemo(() => {
		return [
			{
				value: jsCodeStructsTreeTitle,
				label: <div className={styles.js_code_analysis_segmented_title}>{jsCodeStructsTreeTitle}</div>,
			},
			{
				value: jsCodeFileStructAnalysisTitle,
				label: <div className={styles.js_code_analysis_segmented_title}>{jsCodeFileStructAnalysisTitle}</div>,
			},
		];
	}, []);
	const [jsCodeAnalysisSegmentedValue, setJsCodeAnalysisSegmentedValue] = useState(jsCodeFileStructAnalysisTitle);

	const handleOnChangeJsCodeAnalysisSegmented = useCallback((args) => {
		setJsCodeAnalysisSegmentedValue(args);
	}, []);
	/** 展示 ast 代码结构 */
	const isJsCodeStructsTree = useMemo(() => {
		return jsCodeAnalysisSegmentedValue === jsCodeStructsTreeTitle;
	}, [jsCodeAnalysisSegmentedValue]);
	/** 展示文件信息 */
	const isJsCodeFileStructAnalysis = useMemo(() => {
		return jsCodeAnalysisSegmentedValue === jsCodeFileStructAnalysisTitle;
	}, [jsCodeAnalysisSegmentedValue]);

	return {
		jsCodeAnalysisSegmentedOptions,
		jsCodeAnalysisSegmentedValue,
		handleOnChangeJsCodeAnalysisSegmented,
		isJsCodeStructsTree,
		isJsCodeFileStructAnalysis,
	};
}
