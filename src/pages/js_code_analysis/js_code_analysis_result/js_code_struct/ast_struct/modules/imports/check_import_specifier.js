export function checkImportSpecifierAfterSetParentRelation(specifier) {
	if (!specifier.parentStruct.isImportDeclarationStruct) {
		console.error(
			`${specifier.constructor.name} class 实例`,
			this,
			"执行 afterSetParentRelation, this.parentStruct",
			this.parentStruct,
			"不是 ImportDeclarationStruct 数据类型有误"
		);
		throw new Error(
			`${specifier.constructor.name} class 实例 执行 afterSetParentRelation, this.parentStruct 不是 ImportDeclarationStruct 数据类型有误`
		);
	}
}
