import FileStruct, { FileStructType } from "./file_struct.js";
import ClassStruct, { ClassStructType } from "./class_struct/class_struct.js";
import ClassMethodStruct, { ClassMethodStructType } from "./class_struct/class_method_struct.js";
import ClassPropertyStruct, { ClassPropertyStructType } from "./class_struct/class_property_struct.js";

export function generateChildStructSelectOption(type) {
	return {
		value: type,
		label: type,
	};
}

export function getStructFromJSON(jsonObject, codeStructMap = {}, codeFileStructMap = {}) {
	let struct = null;

	switch (jsonObject.type) {
		case FileStructType:
			struct = new FileStruct(jsonObject.key, jsonObject.name, codeStructMap);
			codeFileStructMap[jsonObject.key] = struct;
			for (let i = 0, len = jsonObject.children.length; i < len; i++) {
				getStructFromJSON(jsonObject.children[i], codeStructMap, codeFileStructMap);
			}
			break;
		case ClassStructType:
			struct = new ClassStruct(codeStructMap[jsonObject.parent], jsonObject);
			for (let i = 0, len = jsonObject.children.length; i < len; i++) {
				getStructFromJSON(jsonObject.children[i], codeStructMap, codeFileStructMap);
			}
			break;
		case ClassMethodStructType:
			struct = new ClassMethodStruct(codeStructMap[jsonObject.parent], jsonObject);
			break;
		case ClassPropertyStructType:
			struct = new ClassPropertyStruct(codeStructMap[jsonObject.parent], jsonObject);
			break;
		default:
			break;
	}

	return struct;
}
