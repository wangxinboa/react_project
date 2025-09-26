import { useState, useCallback, useEffect } from "react";
import { message } from "antd";

import CodeStructAnalysis from "../../code_struct_analysis/code_struct_analysis.js";
import createAnalysisFromJson from "../../code_struct_analysis/code_struct_analysis_utils/create_analysis_from_json.js";

export default function useAnalysisMessage(selectedCodeStruct) {
	const [codeStructAnalysisMap, setCodeStructAnalysisMap] = useState({});

	const [selectedCodeStructAnalysis, setSelectedCodeStructAnalysis] = useState(null);
	const [usedCodeStructsTreeData, setUsedCodeStructsTreeData] = useState([]);

	const [useCodeStructsTreeData, setUseCodeStructsTreeData] = useState([]);

	/** 根据 service 接口信息初始化 analysisMessage */
	const initAnalysisMessageFromService = useCallback((serviceData, codeStructsMap) => {
		const _codeStructAnalysisKeys = Object.keys(serviceData?.codeStructAnalysisMap ?? {});
		const _codeStructAnalysisMap = {};
		let codeStructAnalysisKey;
		for (let i = 0, len = _codeStructAnalysisKeys.length; i < len; i++) {
			codeStructAnalysisKey = _codeStructAnalysisKeys[i];
			createAnalysisFromJson(
				serviceData?.codeStructAnalysisMap[codeStructAnalysisKey],
				_codeStructAnalysisMap,
				codeStructsMap
			);
		}

		setCodeStructAnalysisMap(_codeStructAnalysisMap);
	}, []);
	/** 根据 analysisMessage 生成对应 service 接口数据格式 */
	const createServiceDataFromAnalysisMessage = useCallback(() => {
		return {
			codeStructAnalysisMap,
		};
	}, [codeStructAnalysisMap]);

	useEffect(() => {
		if (selectedCodeStruct === null) {
			setSelectedCodeStructAnalysis(null);
			setUsedCodeStructsTreeData([]);
		} else {
			// selectedCodeStruct 对应的 key
			const selectedCodeStructKey = selectedCodeStruct.key;

			let _codeStructAnalysis = codeStructAnalysisMap[selectedCodeStructKey];
			// 如果 codeFileStructsMap 不存在代码文件对应的 FileStruct 的话, 就根据代码文件生成一个 FileStruct
			if (!_codeStructAnalysis) {
				message.info({
					key: selectedCodeStructKey,
					content: `${selectedCodeStructKey} 初始化 CodeStructAnalysis`,
				});

				_codeStructAnalysis = CodeStructAnalysis.createFromCodeStruct(selectedCodeStruct, codeStructAnalysisMap);
			}

			// 设置 selectedCodeStructAnalysis
			setSelectedCodeStructAnalysis(_codeStructAnalysis);
			setUsedCodeStructsTreeData(_codeStructAnalysis.usedCodeFileStructs ?? []);

			setUseCodeStructsTreeData(_codeStructAnalysis.useCodeFileStructs ?? []);
		}
	}, [codeStructAnalysisMap, selectedCodeStruct]);

	return {
		initAnalysisMessageFromService,
		createServiceDataFromAnalysisMessage,
		codeStructAnalysisMap,
		usedCodeStructsTreeData,
		useCodeStructsTreeData,
		setUsedCodeStructsTreeData,
		selectedCodeStructAnalysis,
	};
}
