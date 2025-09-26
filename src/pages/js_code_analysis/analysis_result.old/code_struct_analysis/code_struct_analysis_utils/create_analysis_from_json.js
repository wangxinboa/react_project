import CodeStructAnalysis from "../code_struct_analysis.js";

export default function createAnalysisFromJson(jsonObject, codeStructAnalysisMap, codeStructsMap) {
	const _codeStructAnalysis = CodeStructAnalysis.createFromCodeStruct(
		codeStructsMap[jsonObject.key],
		codeStructAnalysisMap
	);

	for (let i = 0, len = jsonObject.usedCodeFileStructs.length; i < len; i++) {
		codeStructAnalysisAddUsedCodeFileStruct(_codeStructAnalysis, jsonObject.usedCodeFileStructs[i], codeStructsMap);
	}
	return _codeStructAnalysis;
}

function codeStructAnalysisAddUsedCodeFileStruct(parentCodeStructAnalysis, jsonObject, codeStructsMap) {
	const _codeStructAnalysis = parentCodeStructAnalysis.addUsedCodeStruct(codeStructsMap[jsonObject.key]);
	for (let i = 0, len = jsonObject.children.length; i < len; i++) {
		codeStructAnalysisAddUsedCodeStruct(_codeStructAnalysis, jsonObject.children[i], codeStructsMap);
	}
}

function codeStructAnalysisAddUsedCodeStruct(parentCodeStructAnalysis, jsonObject, codeStructsMap) {
	const _codeStructAnalysis = parentCodeStructAnalysis.addUsedCodeStruct(codeStructsMap[jsonObject.key]);
	for (let i = 0, len = jsonObject.children.length; i < len; i++) {
		codeStructAnalysisAddNextUsedCodeStruct(_codeStructAnalysis, jsonObject.children[i], codeStructsMap);
	}
}

function codeStructAnalysisAddNextUsedCodeStruct(parentCodeStructAnalysis, jsonObject, codeStructsMap) {
	parentCodeStructAnalysis.addNextUsedCodeStruct(codeStructsMap[jsonObject.key]);
}
