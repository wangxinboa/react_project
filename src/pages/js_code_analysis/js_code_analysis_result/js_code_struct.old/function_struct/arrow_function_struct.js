import BaseFunctionStruct from "../base_struct/function_struct/base_function_struct.js";
import getStructIndex from "../js_code_struct_utils/get_struct_index.js";

export default class ArrowFunctionStruct extends BaseFunctionStruct {
	static type = "ArrowFunction";

	constructor(arrowFunctionAst, environmentStruct) {
		const _baseKey = `${ArrowFunctionStruct.type}_${getStructIndex()}:`;

		super(_baseKey, arrowFunctionAst, environmentStruct);

		this.type = ArrowFunctionStruct.type;

		this.generator = arrowFunctionAst.generator;
		this.async = arrowFunctionAst.async;
	}

	destroy() {
		super.destroy();

		this.generator = this.async = null;
	}

	static createByArrowFunctionAst(arrowFunctionAst, environmentStruct) {
		if (arrowFunctionAst.id !== null) {
			console.error(
				"执行 createByArrowFunctionAst 时, 根据 arrowFunctionAst",
				arrowFunctionAst,
				"environmentStruct",
				environmentStruct,
				"创建 ArrowFunctionStruct, 遇到了 arrowFunctionAst.id",
				arrowFunctionAst.id,
				"不为 null 的情况"
			);
			throw new Error(
				"执行 createByArrowFunctionAst 时, 根据 arrowFunctionAst, environmentStruct 创建 ArrowFunctionStruct, 遇到了 arrowFunctionAst.id 不为 null 的情况"
			);
		}
		return new ArrowFunctionStruct(arrowFunctionAst, environmentStruct);
	}
}
