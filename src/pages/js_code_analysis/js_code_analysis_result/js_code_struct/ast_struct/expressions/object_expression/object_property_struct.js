import BaseStructInFile from "../../../help_struct/base_struct/base_struct_in_file.js";

export default class ObjectPropertyStruct extends BaseStructInFile {
	constructor(ast, environmentStruct) {
		super(ast, environmentStruct);

		if (ast.method !== false) {
			console.error(
				"初始化 ObjectPropertyStruct 根据 ast",
				ast,
				"环境结构 environmentStruct",
				environmentStruct,
				"创建 objectPropertyStruct 时, 根据属性名 ast.method",
				ast.method,
				"获取对象 method 属性, 但是 ast.method 不是 false, 数据类型有误"
			);
			throw new Error(
				"初始化 ObjectPropertyStruct 根据 ast 环境结构 environmentStruct 创建 objectPropertyStruct 时, 根据属性名 ast.method 获取对象 method 属性, 但是 ast.method 不是 false, 数据类型有误"
			);
		}
		this.method = ast.method;
		this.computed = ast.computed;
		this.shorthand = ast.shorthand;

		this.type = "ObjectProperty";
		this.title = this.name;
	}
	destroy() {
		super.destroy();

		this.method = this.computed = this.shorthand = null;
	}
}
