import PropertyMap from "../base_struct/property/property_map.js";
import { getClassExpressionName } from "../js_code_struct_utils/get_ast_attribute_value.js";
import { isClassMethod } from "../js_code_struct_utils/ast_types.js";
import ClassMethodStruct from "./class_method_struct.js";

export default class ClassStruct extends PropertyMap {
	static type = "Class";

	constructor(classAst, environmentStruct) {
		const className = getClassExpressionName(classAst);
		const _baseKey = `${ClassStruct.type}:${className}`;

		super(_baseKey, environmentStruct);

		this.type = ClassStruct.type;
		this.isClassStruct = true;

		this.title = className;

		this.name = className;
		this.classAst = classAst;
	}

	destroy() {
		super.destroy();

		this.name = this.classAst = null;
	}

	initClassBody() {
		const classBody = this.classAst.body.body;

		for (let i = 0, len = classBody.length; i < len; i++) {
			const classBodyAst = classBody[i];

			if (isClassMethod(classBodyAst)) {
				this.addChildStruct(ClassMethodStruct.createByClassMethodAst(classBodyAst, this), "body");
			} else {
				console.error(
					"class struct",
					this,
					"执行 initClassBody, 根据 classBodyAst",
					classBodyAst,
					"初始化, 但是 classBodyAst",
					classBodyAst,
					"是未处理的 ast 类型",
					classBodyAst.type,
					"待完善"
				);
			}
		}
	}

	static createByClassAst(classAst, environmentStruct) {
		if (classAst.superClass !== null) {
			console.error(
				"执行 ClassStruct.createByClassAst, 根据 classAst",
				classAst,
				"environmentStruct",
				environmentStruct,
				"创建 class struct, 但 classAst ast superClass",
				classAst.superClass,
				"不为 null, 待完善"
			);
		}
		return new ClassStruct(classAst, environmentStruct);
	}
}
