import { isBoolean } from "../../../../../../utils/data_type/is_type.js";

import BaseStructInFile from "../../help_struct/base_struct/base_struct_in_file.js";

export default class TemplateElementStruct extends BaseStructInFile {
	constructor(ast, environmentStruct) {
		super(ast, environmentStruct);

		this.type = "TemplateElement";

		if (!isBoolean(ast.tail)) {
			console.error(
				"初始化 TemplateElementStruct, 根据 ast",
				ast,
				"环境结构 environmentStruct",
				environmentStruct,
				"创建 TemplateElementStruct 时, 根据属性 ast.tail",
				ast.tail,
				"判断是否是模板字符串的最后一个部分, 但是 ast.tail 不是 布尔类型, 数据类型有误"
			);
			throw new Error(
				"初始化 TemplateElementStruct, 根据 ast, 环境结构 environmentStruct 创建 TemplateElementStruct 时, 根据属性 ast.tail 判断是否是模板字符串的最后一个部分, 但是 ast.tail 不是 布尔类型, 数据类型有误"
			);
		}
		this.tail = ast.tail;
		this.rawValue = ast.value.rawl;
	}
	destroy() {
		super.destroy();

		this.tail = this.rawValue = null;
	}
}
