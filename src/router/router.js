import { createHashHistory } from "history";

import AnalysisList from "../pages/js_code_analysis/analysis_list/analysis_list.jsx";
import AnalysisResult from "../pages/js_code_analysis/analysis_result/analysis_result.jsx";

export const history = createHashHistory();

export const IndexPage = {
	Path: "/",
	Component: AnalysisList,
};

export const AnalysisListPage = {
	Path: "/JsCodeAnalysisList",
	Component: AnalysisList,
};

export const AnalysisResultPage = {
	Path: "/JsCodeAnalysisResult",
	Component: AnalysisResult,
};

export function toAnalysisContentPage(name, url) {
	history.push(`${AnalysisResultPage.Path}?analysis_name=${name}&analysis_url=${url}`);
}

const Pages = [IndexPage, AnalysisListPage, AnalysisResultPage];

export default Pages;
