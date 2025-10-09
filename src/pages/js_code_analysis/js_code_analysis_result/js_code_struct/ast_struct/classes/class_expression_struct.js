import ClassDeclarationStruct from "./class_declaration_struct.js";

export default class ClassExpressionStruct extends ClassDeclarationStruct {
	constructor(ast, environmentStruct) {
		super(ast, environmentStruct);

		this.type = "ClassExpression";
	}
}
