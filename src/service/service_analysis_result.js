const AnalysisResultMap = {};

export function serviceGetServiceAnalysisResult(name) {
	if (AnalysisResultMap[name] === void 0) {
		return fetch(`/js_code_analysis/${name}.json`)
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				AnalysisResultMap[name] = res;
				return {
					data: AnalysisResultMap[name],
				};
			});
	} else {
		return Promise.resolve({
			data: AnalysisResultMap[name],
		});
	}
}
