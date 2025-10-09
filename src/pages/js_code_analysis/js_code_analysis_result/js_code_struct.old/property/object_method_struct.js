import BaseFunctionStruct from "../base_struct/function_struct/base_function_struct.js";
import getStructIndex from "../js_code_struct_utils/get_struct_index.js";

export default class ObjectMethodStruct extends BaseFunctionStruct {
	static type = "ObjectMethod";

	constructor(objectMethodAst, environmentStruct) {
		const _baseKey = `${ObjectMethodStruct.type}_${getStructIndex()}:`;
		super(_baseKey, objectMethodAst, environmentStruct);

		this.type = ObjectMethodStruct.type;

		this.kind = objectMethodAst.kind;
		this.generator = objectMethodAst.generator;
		this.async = objectMethodAst.async;
	}

	static createByObjectMethodAst(objectMethodAst, environmentStruct) {
		return new ObjectMethodStruct(objectMethodAst, environmentStruct);
	}
}
