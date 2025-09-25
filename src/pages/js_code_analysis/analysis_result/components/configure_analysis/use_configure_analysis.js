import { useState, useCallback } from "react";

export default function useConfigureAnalysis() {
	const [analysisConfig, setAnalysisConfig] = useState({});

	/** 根据接口信息初始化 analysis config */
	const initAnalysisConfigFromService = useCallback((serviceData) => {
		setAnalysisConfig(serviceData);
	}, []);
	/** 根据 analysis config 生成对应 service 接口数据格式 */
	const createServiceDataFromAnalysisConfig = useCallback(() => {
		return analysisConfig;
	}, [analysisConfig]);

	return { initAnalysisConfigFromService, createServiceDataFromAnalysisConfig, analysisConfig, setAnalysisConfig };
}
