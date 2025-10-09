import BaseStructInFile from "../../help_struct/base_struct/base_struct_in_file.js";

export default class ArrowFunctionExpressionStruct extends BaseStructInFile {
	constructor(ast, environmentStruct) {
		super(ast, environmentStruct);

		if (ast.id !== null) {
			console.error(
				"初始化 ArrowFunctionExpressionStruct 根据 ast",
				ast,
				"环境结构 environmentStruct",
				environmentStruct,
				"创建 ArrowFunctionExpressionStruct, 但是 ast.id 不是 null, 数据类型有误"
			);
			throw new Error(
				"初始化 ArrowFunctionExpressionStruct 根据 ast, 环境结构 environmentStruct 创建 ArrowFunctionExpressionStruct, 但是 ast.id 不是 null, 数据类型有误"
			);
		}

		this.type = "ArrowFunction";

		this.generator = ast.generator;
		this.async = ast.async;
	}
	destroy() {
		super.destroy();

		this.generator = this.async = null;
	}
}
