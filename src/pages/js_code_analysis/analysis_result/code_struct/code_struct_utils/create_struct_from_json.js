import FileStruct from "../file_struct.js";
import ClassStruct from "../class_struct/class_struct.js";
import ClassMethodStruct from "../class_struct/class_method_struct.js";
import ClassPropertyStruct from "../class_struct/class_property_struct.js";
import FunctionStruct from "../function_struct.js";

import { createStructSelectOption } from "./create_option.js";

/** 根据 json 对象和 file 生成 File Code Struct */
export default function createFileStructFromJSON(
	codeFile,
	jsonObject,
	codeStructMap = {},
	allCodeStructSelectOptions = []
) {
	if (jsonObject.type === FileStruct.type) {
		const struct = FileStruct.createStructFromFile(codeFile, codeStructMap);
		for (let i = 0, len = jsonObject.children.length; i < len; i++) {
			createStructFromJSON(jsonObject.children[i], codeStructMap, allCodeStructSelectOptions, struct);
		}
		allCodeStructSelectOptions.push(createStructSelectOption(struct));
		return struct;
	}
}

/** 根据 json 对象生成 Code Struct */
function createStructFromJSON(jsonObject, codeStructMap = {}, allCodeStructSelectOptions = [], parentStruct = null) {
	let struct = null;

	switch (jsonObject.type) {
		case ClassStruct.type:
			struct = ClassStruct.createStructFromForm(parentStruct, jsonObject);
			for (let i = 0, len = jsonObject.children.length; i < len; i++) {
				createStructFromJSON(jsonObject.children[i], codeStructMap, allCodeStructSelectOptions, struct);
			}
			break;
		case ClassMethodStruct.type:
			struct = ClassMethodStruct.createStructFromForm(parentStruct, jsonObject);
			break;
		case ClassPropertyStruct.type:
			struct = ClassPropertyStruct.createStructFromForm(parentStruct, jsonObject);
			break;
		case FunctionStruct.type:
			struct = FunctionStruct.createStructFromForm(parentStruct, jsonObject);
			break;
		default:
			break;
	}

	allCodeStructSelectOptions.push(createStructSelectOption(struct));

	return struct;
}
