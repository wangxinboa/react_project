import getStructIndex from "../js_code_struct_utils/get_struct_index.js";
import { getIdentifierName } from "../js_code_struct_utils/get_ast_attribute_value.js";
import BaseInEnvironmentStruct from "../base_struct/base_in_environment_struct.js";
import { isIdentifierAst } from "../js_code_struct_utils/ast_types.js";

const ParamStructTypes = {
	Identifier: "Identifier",
	RestElement: "RestElement",
};

export default class ParamStruct extends BaseInEnvironmentStruct {
	static type = "Param";

	constructor(name, environmentStruct, kind) {
		const _baseKey = `${ParamStruct.type}_${getStructIndex()}:`;
		super(_baseKey, environmentStruct);

		this.type = ParamStruct.type;
		this.name = name;
		this.environmentStruct = environmentStruct;
		this.kind = kind;

		this.title = name;
	}
	destroy() {
		this.type = this.name = this.environmentStruct = this.kind = this.title = null;
	}

	isIdentifier() {
		return this.kind === ParamStructTypes.Identifier;
	}
	isRestElement() {
		return this.kind === ParamStructTypes.RestElement;
	}

	static createByIdentifierAst(identifierAst, environmentStruct) {
		const name = getIdentifierName(identifierAst);
		return new ParamStruct(name, environmentStruct, ParamStructTypes.Identifier);
	}

	static createByRestElementAst(restElementAst, environmentStruct) {
		if (isIdentifierAst(restElementAst.argument)) {
			const name = getIdentifierName(restElementAst.argument);
			return new ParamStruct(name, environmentStruct, ParamStructTypes.RestElement);
		} else {
			console.error(
				"执行 ParamStruct.createByRestElementAst, 根据 restElementAst",
				restElementAst,
				"环境结构 environmentStruct",
				environmentStruct,
				"生成 ParamStruct, 但是 restElementAst.argument",
				restElementAst.argument,
				"不是 IdentifierAst, 数据类型有误"
			);
			throw new Error(
				"执行 ParamStruct.createByRestElementAst, 根据 restElementAst, 环境结构 environmentStruct 生成 ParamStruct, 但是 restElementAst.argument 不是 IdentifierAst, 数据类型有误"
			);
		}
	}

	static createByAssignmentPatternAst(assignmentPatternAst, environmentStruct) {
		console.info("assignmentPatternAst:", assignmentPatternAst);
		const name = getIdentifierName(assignmentPatternAst.left);
		const paramStruct = new ParamStruct(name, environmentStruct, ParamStructTypes.RestElement);
		// console.info("paramStruct:", paramStruct);
		return paramStruct;
	}
}
