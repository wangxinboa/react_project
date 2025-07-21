let AnalysisList = null;

export function serviceGetAnalysisList() {
	if (AnalysisList === null) {
		return fetch("/js_code_analysis/js_code_analysis_list.json")
			.then((res) => {
				return res.json();
			})
			.then((res) => {
				AnalysisList = res;
				return {
					data: AnalysisList,
					total: AnalysisList.length,
				};
			});
	} else {
		return Promise.resolve({
			data: AnalysisList,
			total: AnalysisList.length,
		});
	}
}

export function serviceGetAnalysisListPage(page, pageSize) {
	if (AnalysisList === null) {
		return serviceGetAnalysisList().then((res) => {
			return {
				data: res.data.slice((page - 1) * pageSize, page * pageSize),
				total: res.data.length,
			};
		});
	} else {
		return Promise.resolve({
			data: AnalysisList.slice((page - 1) * pageSize, page * pageSize),
			total: AnalysisList.length,
		});
	}
}

export function servicAddAnalysisListRecord(record) {
	if (AnalysisList === null) {
		return serviceGetAnalysisList().then((res) => {
			record.id = res.data.length;
			res.data.push(record);
			return {
				success: true,
			};
		});
	} else {
		record.id = AnalysisList.length;
		AnalysisList.push(record);
		return Promise.resolve({
			success: true,
		});
	}
}

export function serviceUpdateAnalysisListRecord(id, record) {
	if (AnalysisList === null) {
		return serviceGetAnalysisList().then((res) => {
			const target = res.data.find((item) => {
				return item.id === id;
			});
			target.url = record.url;
			target.name = record.name;
			return {
				success: true,
			};
		});
	} else {
		const target = AnalysisList.find((item) => {
			return item.id === id;
		});
		target.url = record.url;
		target.name = record.name;
		return Promise.resolve({
			success: true,
		});
	}
}

export function serviceDeleteAnalysisListRecord(id) {
	if (AnalysisList === null) {
		return serviceGetAnalysisList().then((res) => {
			res.data.splice(
				res.data.findIndex((item) => {
					return item.id === id;
				}),
				1
			);
			return {
				success: true,
			};
		});
	} else {
		AnalysisList.splice(
			AnalysisList.findIndex((item) => {
				return item.id === id;
			}),
			1
		);
		return Promise.resolve({
			success: true,
		});
	}
}
