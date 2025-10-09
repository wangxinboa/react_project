import BaseInEnvironmentStruct from "../base_struct/base_in_environment_struct.js";
import { getIdentifierName } from "../js_code_struct_utils/get_ast_attribute_value.js";
import getStructIndex from "../js_code_struct_utils/get_struct_index.js";

export default class UsedVariableStruct extends BaseInEnvironmentStruct {
	static type = "UsedVariable";

	constructor(identifier, environmentStruct) {
		const name = getIdentifierName(identifier);
		const _baseKey = `${UsedVariableStruct.type}_${getStructIndex()}:${name}`;

		super(_baseKey, environmentStruct);

		this.type = UsedVariableStruct.type;

		this.title = name;
		this.name = name;

		this.ast = identifier;
	}

	destroy() {
		super.destroy();

		this.name = this.ast = null;
	}

	getValue() {
		return this.environmentStruct.getVariableValue(this.name);
	}

	static createByIdentifierAst(identifier, environmentStruct) {
		return new UsedVariableStruct(identifier, environmentStruct);
	}
}
