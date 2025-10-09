import BaseInEnvironmentStruct from "../../base_struct/base_in_environment_struct.js";
import getStructIndex from "../../js_code_struct_utils/get_struct_index.js";
import createCodeStructByAst from "../../js_code_struct_utils/create_code_struct_by_ast.js";
import { isStringLiteralValueAst } from "../../js_code_struct_utils/ast_types.js";
import { getStringLiteralValue } from "../../js_code_struct_utils/get_ast_attribute_value.js";

export default class MemberExpressionStruct extends BaseInEnvironmentStruct {
	static type = "MemberExpression";

	constructor(memberExpressionAst, environmentStruct) {
		const _baseKey = `${MemberExpressionStruct.type}_${getStructIndex()}:`;

		super(_baseKey, environmentStruct);

		this.type = MemberExpressionStruct.type;
		this.ast = memberExpressionAst;

		this.objectStruct = this.objectStructValue = this.propertyStruct = null;

		this.initObjectStruct();
	}
	destroy() {
		super.destroy();

		this.ast = this.objectStruct = this.objectStructValue = this.propertyStruct = null;
	}

	initObjectStruct() {
		this.objectStruct = createCodeStructByAst(this.ast.object, this.environmentStruct);
		this.objectStructValue = this.objectStruct.getValue();
		this.addChildStruct(this.objectStruct, "object");

		if (isStringLiteralValueAst(this.ast.property)) {
			this.propertyName = getStringLiteralValue(this.ast.object);
		} else {
			console.error(
				"member expression struct",
				this,
				"执行 initObjectStruct 根据 this.ast",
				this.ast,
				"中的 this.ast.property 属性",
				this.ast.property,
				"初始化 propertyName 属性变量值, 当前 this.ast.property 属性值是未处理的情况, 待完善"
			);
			throw new Error(
				"member expression struct,执行 initObjectStruct 根据 this.ast 中的 this.ast.property 属性初始化 propertyName 属性变量值, 当前 this.ast.property 属性值是未处理的情况, 待完善"
			);
		}
	}

	assignValue(value) {
		this.objectStructValue.getVariableStruct(this.propertyName).assignValue(value);
	}

	static createByMemberExpressionAst(memberExpressionAst, environmentStruct) {
		return new MemberExpressionStruct(memberExpressionAst, environmentStruct);
	}
}
