const AnalysisResultMap = {};

export function serviceGetServiceAnalysisResult(url) {
	if (AnalysisResultMap[url] === void 0) {
		return fetch(url)
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				AnalysisResultMap[url] = res;
				return {
					data: AnalysisResultMap[url],
				};
			});
	} else {
		return Promise.resolve({
			data: AnalysisResultMap[url],
		});
	}
}
