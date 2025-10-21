import BaseStructInFile from "../../help_struct/base_struct/base_struct_in_file.js";
import VariableStruct from "../../help_struct/variable_struct/variable_struct.js";
import { isIdentifierAst } from "../../js_code_struct_utils/ast_types.js";
import { getIdentifierName } from "../../js_code_struct_utils/get_ast_attribute_value.js";

export default class VariableDeclaratorStruct extends BaseStructInFile {
	constructor(ast, environmentStruct) {
		super(ast, environmentStruct);

		this.type = "VariableDeclarator";
	}

	afterSetParentRelation() {
		if (!this.parentStruct.isVariableDeclaratorStruct) {
			console.error(
				"VariableDeclaratorStruct class 实例",
				this,
				"执行 afterSetParentRelation, this.parentStruct",
				this.parentStruct,
				"不是 VariableDeclaratorStruct 数据类型有误"
			);
			throw new Error(
				"VariableDeclaratorStruct class 实例 执行 afterSetParentRelation, this.parentStruct 不是 VariableDeclaratorStruct 数据类型有误"
			);
		}

		const kind = this.parentStruct.kind;

		if (isIdentifierAst(this.ast.id)) {
			this.environmentStruct.addVariable(
				new VariableStruct(getIdentifierName(this.ast.id), kind, this.environmentStruct)
			);
		} else {
			console.error(
				"VariableDeclaratorStruct class 实例",
				this,
				"执行 afterSetParentRelation, this.ast.id",
				this.ast.id,
				"是未处理的类型, 待完善"
			);
			throw new Error(
				"VariableDeclaratorStruct class 实例, 执行 afterSetParentRelation, this.ast.id 是未处理的类型, 待完善"
			);
		}
	}
}
