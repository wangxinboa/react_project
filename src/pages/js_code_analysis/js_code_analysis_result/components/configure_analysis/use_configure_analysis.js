import { useCallback, useMemo } from "react";

export default function useConfigureAnalysis() {
	const analysisConfig = useMemo(() => {
		return {};
	}, []);

	/** 根据 configure_analysis 表单数据生成对应 analysis config */
	const setAnalysisConfigFromFormData = useCallback(
		(formData) => {
			// vscode 代码文件前缀
			analysisConfig.vsCodeUriPrefix = formData.vsCodeUriPrefix;
			//import source 包对应的路径
			const formDataImportPackageSourcePaths = formData.importPackageSourcePaths ?? [];
			analysisConfig.importPackageSourcePaths = formDataImportPackageSourcePaths;
			const importPackageSourcePathsMap = {};
			// 添加新数据
			for (let i = 0, len = formDataImportPackageSourcePaths.length; i < len; i++) {
				const importPackageSourcePath = formDataImportPackageSourcePaths[i];

				importPackageSourcePathsMap[importPackageSourcePath.importPackageSource] =
					importPackageSourcePath.importPackageSourcePath;
			}
			analysisConfig.importPackageSourcePathsMap = importPackageSourcePathsMap;
		},
		[analysisConfig]
	);
	/** 根据 analysis config 生成对应 service 接口数据格式 */
	const createServiceDataFromAnalysisConfig = useCallback(() => {
		return {
			vsCodeUriPrefix: analysisConfig.vsCodeUriPrefix,
			importPackageSourcePaths: analysisConfig.importPackageSourcePaths,
			importPackageSourcePathsMap: analysisConfig.importPackageSourcePathsMap,
		};
	}, [analysisConfig]);
	/** 根据接口信息初始化 analysis config */
	const initAnalysisConfigFromService = useCallback(
		(serviceData) => {
			setAnalysisConfigFromFormData(serviceData);
		},
		[setAnalysisConfigFromFormData]
	);

	/** 跳转到 vscode 对应的代码文件 */
	const toVsCodeFile = useCallback(
		(fileKey) => {
			window.open(`vscode://file/${analysisConfig.vsCodeUriPrefix ?? ""}${fileKey}`);
		},
		[analysisConfig.vsCodeUriPrefix]
	);

	return {
		initAnalysisConfigFromService,
		createServiceDataFromAnalysisConfig,
		analysisConfig,
		setAnalysisConfigFromFormData,
		toVsCodeFile,
	};
}
