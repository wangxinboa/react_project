import { useState, useMemo, createContext, useEffect } from "react";

import AnalysisResultPage from "./analysis_result_page.jsx";

import getCodeFiles from "./code_files/get_files.js";
import { getStructFromJSON } from "./code_struct/code_struct_utils.js";
import FileStruct from "./code_struct/file_struct.js";

import { getQuery } from "../../../utils/utils.js";
import { serviceGetServiceAnalysisResult } from "../../../service/service_analysis_result.js";

export const AnalysisResultContext = createContext();

let _codeStructsMap_ = null;
let _codeFileStructsMap_ = null;
let _codeFileStructKey_ = null;

const AnalysisResult = () => {
	// code file
	const [codeFilesMap, setCodeFilesMap] = useState(null);

	const [codeFilesTreeData, setCodeFilesTreeData] = useState([]);
	const [codeFilesTreeExpandedKeys, setCodeFilesTreeExpandedKeys] = useState([]);
	const [codeFilesTreeSelectedKeys, setCodeFilesTreeSelectedKeys] = useState([]);

	const [selectedCodeFile, setSelectedCodeFile] = useState(null);
	// code struct
	const [codeStructsTreeData, setCodeStructsTreeData] = useState(null);
	const [codeStructsTreeSelectedKeys, setCodeStructsTreeSelectedKeys] = useState([]);

	const [codeFileStructsMap, setCodeFileStructsMap] = useState({});
	const [codeStructsMap, setCodeStructsMap] = useState({});

	const [selectedCodeStruct, setSelectedCodeStruct] = useState(null);

	const providerValue = useMemo(() => {
		return {
			codeFilesMap,
			codeFilesTreeData,
			codeFilesTreeExpandedKeys,
			setCodeFilesTreeExpandedKeys,
			codeFilesTreeSelectedKeys,
			setCodeFilesTreeSelectedKeys,
			selectedCodeFile,
			setSelectedCodeFile,

			codeFileStructsMap,
			codeStructsMap,
			codeStructsTreeData,
			setCodeStructsTreeData,
			codeStructsTreeSelectedKeys,
			setCodeStructsTreeSelectedKeys,
			selectedCodeStruct,
			setSelectedCodeStruct,
			/** 返回最后下载的所有 json 信息 */
			getDownloadJson() {
				return JSON.stringify({
					codeFilesMap: codeFilesMap,
					// CodeFilesTree
					codeFilesTree: {
						treeData: codeFilesTreeData,
						expandedKeys: codeFilesTreeExpandedKeys,
						selectedKeys: codeFilesTreeSelectedKeys,
					},

					codeFileStructs: {
						codeFileStructsMap,
						codeFileNames: Object.keys(codeFileStructsMap),
					},
				});
			},
			/** 通过上传的文件设置 CodeFilesTree 信息 */
			setCodeFilesTreeMessageFromFiles(files) {
				return getCodeFiles(files)
					.readFilesAsText()
					.then((rootFolder) => {
						setCodeFilesMap(rootFolder.codeFilesMap);

						setCodeFilesTreeData([rootFolder.toJSON()]);

						setCodeFilesTreeExpandedKeys([]);
						setCodeFilesTreeSelectedKeys([]);
					});
			},
		};
	}, [
		codeFileStructsMap,
		codeFilesMap,
		codeFilesTreeData,
		codeFilesTreeExpandedKeys,
		codeFilesTreeSelectedKeys,
		codeStructsMap,
		codeStructsTreeData,
		codeStructsTreeSelectedKeys,
		selectedCodeFile,
		selectedCodeStruct,
	]);

	/** 初始化请求分析数据 */
	useEffect(() => {
		const analysisUrl = getQuery("analysis_url");
		if (analysisUrl) {
			serviceGetServiceAnalysisResult(analysisUrl).then((res) => {
				// 初始化 codeFiles
				setCodeFilesMap(res.data.codeFilesMap ?? {});

				setCodeFilesTreeData(res.data.codeFilesTree.treeData ?? []);
				setCodeFilesTreeExpandedKeys(res.data.codeFilesTree.expandedKeys ?? []);
				setCodeFilesTreeSelectedKeys(res.data.codeFilesTree.selectedKeys ?? []);

				// 初始化 codeStructs
				_codeStructsMap_ = {};
				_codeFileStructsMap_ = {};

				for (let i = 0, len = res.data.codeFileStructs.codeFileNames.length; i < len; i++) {
					_codeFileStructKey_ = res.data.codeFileStructs.codeFileNames[i];

					_codeStructsMap_[_codeFileStructKey_] = getStructFromJSON(
						res.data.codeFileStructs.codeFileStructsMap[_codeFileStructKey_],
						_codeStructsMap_,
						_codeFileStructsMap_
					);
				}
				setCodeFileStructsMap(_codeFileStructsMap_);
				setCodeStructsMap(_codeStructsMap_);

				_codeStructsMap_ = null;
				_codeFileStructsMap_ = null;
				_codeFileStructKey_ = null;
			});
		}
	}, []);

	useEffect(() => {
		if (selectedCodeFile === null) {
			// 设置 CodeStructsTree 信息
			setCodeStructsTreeData([]);
			setCodeStructsTreeSelectedKeys([]);
		} else {
			// 设置 CodeStructsTree 信息
			const codeFileKey = selectedCodeFile.key;
			const filename = selectedCodeFile.name;
			// codeFileStructsMap 创建新的 FileStruct
			if (!codeFileStructsMap[codeFileKey]) {
				codeFileStructsMap[codeFileKey] = new FileStruct(codeFileKey, filename, codeStructsMap);
			}
			setCodeStructsTreeData([codeStructsMap[codeFileKey]]);
		}
	}, [codeFileStructsMap, codeStructsMap, selectedCodeFile]);

	return (
		<AnalysisResultContext.Provider value={providerValue}>
			<AnalysisResultPage />
		</AnalysisResultContext.Provider>
	);
};

export default AnalysisResult;
