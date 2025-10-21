import BaseStructInFile from "../../../help_struct/base_struct/base_struct_in_file.js";

export default class ExportDefaultDeclarationStruct extends BaseStructInFile {
	constructor(ast, environmentStruct) {
		super(ast, environmentStruct);

		this.type = "ExportDefaultDeclaration";
	}

	afterAddChildrenCodeStructs() {
		if (this.children.length === 1) {
			const declaration = this.children[0];
			if (declaration.isIdentifierStruct) {
				const variable = this.environmentStruct.getVariable(declaration.name);
				if (!variable) {
					console.error(
						"ExportDefaultDeclarationStruct class 实例",
						this,
						"执行 afterSetParentRelation, 当 this.children",
						this.children,
						"中的唯一元素 declaration",
						declaration,
						"为 IdentifierStruct 时, 查询其对应的变量信息 variable",
						variable,
						"不存在, 代码执行逻辑有误"
					);
					throw new Error(
						"ExportDefaultDeclarationStruct class 实例执行 afterSetParentRelation, 当 this.children 中的唯一元素 declaration 为 IdentifierStruct 时, 查询其对应的变量信息 variable 不存在, 代码执行逻辑有误"
					);
				}
				this.environmentStruct.setExportDefault(variable);
			} else {
				// console.error(
				// 	"ExportDefaultDeclarationStruct class 实例",
				// 	this,
				// 	"执行 afterSetParentRelation, 当 this.children",
				// 	this.children,
				// 	"中的唯一元素 declaration",
				// 	declaration,
				// 	"是未处理的类型, 待完善"
				// );
				// throw new Error(
				// 	"ExportDefaultDeclarationStruct class 实例 执行 afterSetParentRelation, 当 this.children 中的唯一元素 declaration 是未处理的类型, 待完善"
				// );
			}
		} else {
			console.error(
				"ExportDefaultDeclarationStruct class 实例",
				this,
				"执行 afterSetParentRelation, this.children",
				this.children,
				"数组长度不为1, 数据情况有误"
			);
			throw new Error(
				"ExportDefaultDeclarationStruct class 实例执行 afterSetParentRelation, this.children 数组长度不为1, 数据情况有误"
			);
		}
	}
}
