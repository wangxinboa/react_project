import BaseFunctionStruct from "../base_struct/function_struct/base_function_struct.js";
import { getIdentifierName } from "../js_code_struct_utils/get_ast_attribute_value.js";

const ClassMethodTypes = {
	constructor: "constructor",
	method: "method",
	get: "get",
	set: "set",
};

export default class ClassMethodStruct extends BaseFunctionStruct {
	static type = "ClassMethod";

	constructor(classMethodAst, classStruct) {
		const className = getIdentifierName(classMethodAst.key);

		const nameSegments = [];
		if (classMethodAst.static) {
			nameSegments.push("static");
		}
		if (classMethodAst.generator) {
			nameSegments.push("generator");
		}
		if (classMethodAst.computed) {
			nameSegments.push("computed");
		}
		if (classMethodAst.async) {
			nameSegments.push("async");
		}
		if (classMethodAst.kind !== ClassMethodTypes.constructor && classMethodAst.kind !== ClassMethodTypes.method) {
			nameSegments.push(classMethodAst.kind);
		}
		nameSegments.push(className);

		const name = nameSegments.join("-");
		const _baseKey = `${ClassMethodStruct.type}:` + name;

		super(_baseKey, classMethodAst, classStruct.environmentStruct);

		this.type = ClassMethodStruct.type;
		this.title = name;

		this.name = name;

		this.static = classMethodAst.static ?? false;
		this.computed = classMethodAst.computed ?? false;
		this.kind = classMethodAst.kind ?? "method";
		this.generator = classMethodAst.generator ?? false;
		this.async = classMethodAst.async ?? false;
	}

	destroy() {
		super.destroy();

		this.name = this.static = this.computed = this.kind = this.generator = this.async = null;
	}

	static createByClassMethodAst(classMethodAst, classStruct) {
		return new ClassMethodStruct(classMethodAst, classStruct);
	}
}
