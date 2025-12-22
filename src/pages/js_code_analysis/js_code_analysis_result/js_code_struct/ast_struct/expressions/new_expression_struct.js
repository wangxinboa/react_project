import BaseStructInFile from "../../help_struct/base_struct/base_struct_in_file.js";

export default class NewExpressionStruct extends BaseStructInFile {
	constructor(ast, environmentStruct) {
		super(ast, environmentStruct);

		this.isNewExpressionStruct = true;

		this.type = "NewExpression";

		if (ast.typeArguments !== null) {
			console.error(
				"初始化 NewExpressionStruct 根据 ast",
				ast,
				"环境结构 environmentStruct",
				environmentStruct,
				"创建 newExpressionStruct 时, ast.typeArguments",
				ast.typeArguments,
				"不是 null, 数据类型有误"
			);
			throw new Error(
				"初始化 NewExpressionStruct 根据 ast, 环境结构 environmentStruct 创建 newExpressionStruct 时, ast.typeArguments 不是 null, 数据类型有误"
			);
		}
	}

	destroy() {
		super.destroy();

		this.isNewExpressionStruct = null;
	}
}
