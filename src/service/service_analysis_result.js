const CodeFilesMessageMap = {};

export function serviceGetCodeFilesMessage(url) {
	if (CodeFilesMessageMap[url] === void 0) {
		return fetch(url)
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				CodeFilesMessageMap[url] = res;
				return {
					data: CodeFilesMessageMap[url],
				};
			});
	} else {
		return Promise.resolve({
			data: CodeFilesMessageMap[url],
		});
	}
}

const AnalysisMessageMap = {};
export function serviceGetAnalysisMessage(url) {
	if (AnalysisMessageMap[url] === void 0) {
		return fetch(url)
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				AnalysisMessageMap[url] = res;
				return {
					data: AnalysisMessageMap[url],
				};
			});
	} else {
		return Promise.resolve({
			data: AnalysisMessageMap[url],
		});
	}
}
