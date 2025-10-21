export function checkImportSpecifierAfterSetParentRelation(specifier) {
	if (!specifier.parentStruct.isImportDeclarationStruct) {
		console.error(
			`${specifier.constructor.name} class 实例`,
			specifier,
			"执行 afterSetParentRelation, specifier.parentStruct",
			specifier.parentStruct,
			"不是 ImportDeclarationStruct 数据类型有误"
		);
		throw new Error(
			`${specifier.constructor.name} class 实例执行 afterSetParentRelation, specifier.parentStruct 不是 ImportDeclarationStruct 数据类型有误`
		);
	}
}

export function checkImportDeclarationStructAfterAddChildrenCodeStructs(importDeclarationStruct) {
	let hasImportDefaultSpecifier = false;
	let hasImportNamespaceSpecifier = false;
	let hasImportSpecifier = false;
	/** children structs 中 Specifier 类型存在不应该共存的情况*/
	let hasSpecifierTypeError = false;
	for (let i = 0, len = importDeclarationStruct.children.length; i < len; i++) {
		const childStruct = importDeclarationStruct.children[i];
		if (childStruct.isImportDefaultSpecifier) {
			if (hasImportDefaultSpecifier) {
				console.error(
					"ImportDeclarationStruct class 实例",
					importDeclarationStruct,
					"执行 afterAddChildrenCodeStructs, childStructs ImportDefaultSpecifier 有重复存在现象"
				);
				throw new Error(
					"ImportDeclarationStruct class 实例执行 afterAddChildrenCodeStructs, childStructs ImportDefaultSpecifier 有重复存在现象"
				);
			}
			hasImportDefaultSpecifier = true;
			if (hasImportNamespaceSpecifier) {
				hasSpecifierTypeError = true;
			}
		} else if (childStruct.isImportNamespaceSpecifier) {
			if (hasImportNamespaceSpecifier) {
				console.error(
					"ImportDeclarationStruct class 实例",
					importDeclarationStruct,
					"执行 afterAddChildrenCodeStructs, childStructs ImportNamespaceSpecifier 有重复存在现象"
				);
				throw new Error(
					"ImportDeclarationStruct class 实例执行 afterAddChildrenCodeStructs, childStructs ImportNamespaceSpecifier 有重复存在现象"
				);
			}
			hasImportNamespaceSpecifier = true;
			if (hasImportSpecifier || hasImportDefaultSpecifier) {
				hasSpecifierTypeError = true;
			}
		} else if (childStruct.isImportSpecifier) {
			hasImportSpecifier = true;
			if (hasImportNamespaceSpecifier) {
				hasSpecifierTypeError = true;
			}
		} else {
			console.error(
				"ImportDeclarationStruct class 实例",
				importDeclarationStruct,
				"执行 afterAddChildrenCodeStructs, childStruct",
				childStruct,
				"是未处理的类型, 待完善"
			);
			throw new Error(
				"ImportDeclarationStruct class 实例执行 afterAddChildrenCodeStructs, childStruct 是未处理的类型, 待完善"
			);
		}

		if (hasSpecifierTypeError) {
			console.error(
				"ImportDeclarationStruct class 实例",
				importDeclarationStruct,
				"执行 afterAddChildrenCodeStructs, childStructs ImportSpecifier/ImportDefaultSpecifier 和 ImportNamespaceSpecifier 有共存现象"
			);
			throw new Error(
				"ImportDeclarationStruct class 实例 执行 afterAddChildrenCodeStructs, ImportSpecifier/ImportDefaultSpecifier 和 ImportNamespaceSpecifier 有共存现象"
			);
		}
	}
}
