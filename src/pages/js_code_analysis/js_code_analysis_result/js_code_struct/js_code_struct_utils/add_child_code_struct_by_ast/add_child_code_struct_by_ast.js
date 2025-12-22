import TransformAstToCodeStructRuleMap from "./transform_ast_to_code_struct_rule_map.js";

export function addChildCodeStructByAst(parentStruct, ast, environmentStruct, parentRelation) {
	const astType = ast.type;
	let codeStruct, TransformAstToCodeStructRule, astChildAstProperties;
	if (astType in TransformAstToCodeStructRuleMap) {
		try {
			TransformAstToCodeStructRule = TransformAstToCodeStructRuleMap[astType];
			if (Array.isArray(TransformAstToCodeStructRule.astProperties)) {
				astChildAstProperties = [...TransformAstToCodeStructRule.astProperties];
			}

			if (Array.isArray(astChildAstProperties) && TransformAstToCodeStructRule.executeProperty) {
				astChildAstProperties.push(TransformAstToCodeStructRule.executeProperty);
			}

			codeStruct = new TransformAstToCodeStructRule.structClass(ast, environmentStruct);
			parentStruct.addChildStruct(codeStruct, parentRelation);
		} catch (e) {
			console.error(e);
			console.error(
				"执行 addChildCodeStructByAst, 根据 ast",
				ast,
				"环境结构 environmentStruct",
				environmentStruct,
				"父级结构 parentStruct",
				parentStruct,
				"父级关系 parentRelation",
				parentRelation,
				"TransformAstToCodeStructRule",
				TransformAstToCodeStructRule,
				"astChildAstProperties:",
				astChildAstProperties,
				"TransformAstToCodeStructRule.Class",
				TransformAstToCodeStructRule.Class,
				"获取 CodeStruct 出问题"
			);
			throw new Error(
				"执行 addChildCodeStructByAst, 根据 ast 环境结构 environmentStruct 父级结构 parentStruct 父级关系 parentRelation TransformAstToCodeStructRule astChildAstProperties: TransformAstToCodeStructRule.Class 获取 CodeStruct 出问题"
			);
		}
	} else {
		console.error(
			"执行 addChildCodeStructByAst, 根据 ast",
			ast,
			"环境结构 environmentStruct",
			environmentStruct,
			"父级结构 parentStruct",
			parentStruct,
			"父级关系 parentRelation",
			parentRelation,
			"获取 CodeStruct, 但是 ast",
			ast,
			"是未处理的 ast 类型",
			ast.type,
			"待完善"
		);
		throw new Error(
			"执行 addChildCodeStructByAst, 根据 ast 环境结构 environmentStruct, 父级结构 parentStruct, 父级关系 parentRelation 获取 CodeStruct, 但是 ast 是未处理的 ast 类型, 待完善"
		);
	}

	if (Array.isArray(astChildAstProperties)) {
		for (let i = 0, len = astChildAstProperties.length; i < len; i++) {
			const astChildAstProperty = astChildAstProperties[i];
			const astChildAstValue = ast[astChildAstProperty];

			const _environmentStruct = codeStruct.isScopeStruct ? codeStruct : environmentStruct;
			if (Array.isArray(astChildAstValue)) {
				for (let j = 0, len = astChildAstValue.length; j < len; j++) {
					addChildCodeStructByAst(codeStruct, astChildAstValue[j], _environmentStruct, astChildAstProperty);
				}
			} else if (astChildAstValue !== null) {
				addChildCodeStructByAst(codeStruct, astChildAstValue, _environmentStruct, astChildAstProperty);
			}
		}
	}

	codeStruct.afterAddChildrenCodeStructs();
}
