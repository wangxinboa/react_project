import PropertyMap from "../base_struct/property/property_map.js";
import { isIdentifierAst, isObjectMethodAst, isObjectPropertyAst } from "../js_code_struct_utils/ast_types.js";
import createCodeStructByAst from "../js_code_struct_utils/create_code_struct_by_ast.js";
import { getIdentifierName } from "../js_code_struct_utils/get_ast_attribute_value.js";
import getStructIndex from "../js_code_struct_utils/get_struct_index.js";
import ObjectMethodStruct from "./object_method_struct.js";

export default class ObjectStruct extends PropertyMap {
	static type = "Object";

	constructor(environmentStruct) {
		const _baseKey = `${ObjectStruct.type}_${getStructIndex()}:`;

		super(_baseKey, environmentStruct);

		this.type = ObjectStruct.type;
		this.title = _baseKey;
	}

	getValue() {
		return this;
	}

	static createByObjectExpressionAst(objectExpressionAst, environmentStruct) {
		const objectStruct = new ObjectStruct(environmentStruct);
		for (let i = 0, len = objectExpressionAst.properties.length; i < len; i++) {
			const propertyAst = objectExpressionAst.properties[i];

			let propertyKeyAst = propertyAst.key;
			let propertyKeyName;
			// 属性名获取
			if (propertyAst.computed) {
				// 变量引用
				console.error(
					"执行 ObjectStruct.createByObjectExpressionAst 根据 objectExpressionAst",
					objectExpressionAst,
					"环境结构 this.environmentStruct",
					environmentStruct,
					"创建 objectStruct 时, 根据属性名 ast propertyKeyAst",
					propertyKeyAst,
					"获取对象属性名, 但是 propertyAst.computed 为 true, 是未处理的情况, 待完善"
				);
				throw new Error(
					"执行 ObjectStruct.createByObjectExpressionAst 根据 objectExpressionAst, 环境结构 this.environmentStruct 创建 objectStruct 时, 根据属性名 ast propertyKeyAst 获取对象属性名, 但是 propertyAst.computed 为 true, 是未处理的情况, 待完善"
				);
			} else {
				if (!isIdentifierAst(propertyKeyAst)) {
					console.error(
						"执行 ObjectStruct.createByObjectExpressionAst 根据 objectExpressionAst",
						objectExpressionAst,
						"环境结构 this.environmentStruct",
						environmentStruct,
						"创建 objectStruct 时, 根据属性名 ast propertyKeyAst",
						propertyKeyAst,
						"获取对象属性名, 但是 propertyAst 不是 IdentifierAst, 数据类型有误"
					);
					throw new Error(
						"执行 ObjectStruct.createByObjectExpressionAst 根据 objectExpressionAst, 环境结构 this.environmentStruct 创建 objectStruct 时, 根据属性名 ast propertyKeyAst 获取对象属性名, 但是 propertyAst 不是 IdentifierAst, 数据类型有误"
					);
				}
				// 直接命名
				propertyKeyName = getIdentifierName(propertyKeyAst);
			}
			const propertyStruct = objectStruct.addPropertyByName(propertyKeyName);
			// 属性值获取
			let propertyKeyValue;
			if (propertyAst.shorthand) {
				console.error(
					"执行 ObjectStruct.createByObjectExpressionAst 根据 objectExpressionAst",
					objectExpressionAst,
					"环境结构 this.environmentStruct",
					environmentStruct,
					"创建 objectStruct 时, 根据属性 ast propertyAst",
					propertyAst,
					"添加对应的值到对象属性, 但是 propertyAst.shorthand 为 true, 是未处理的情况, 待完善"
				);
				throw new Error(
					"执行 ObjectStruct.createByObjectExpressionAst 根据 objectExpressionAst, 环境结构 this.environmentStruct 创建 objectStruct 时, 根据属性名 ast propertyKeyAst 获取对象属性名, 但是 propertyKeyAst.computed 为 true, 是未处理的情况, 待完善"
				);
			} else {
				if (isObjectPropertyAst(propertyAst)) {
					const codeStrcut = createCodeStructByAst(propertyAst.value, environmentStruct);
					propertyKeyValue = codeStrcut.getValue();

					propertyStruct.assignValue(propertyKeyValue);
					propertyStruct.addChildStruct(propertyKeyValue, "init");
				} else if (isObjectMethodAst(propertyAst)) {
					propertyKeyValue = ObjectMethodStruct.createByObjectMethodAst(propertyAst, environmentStruct);

					propertyStruct.assignValue(propertyKeyValue);
					propertyStruct.addChildStruct(propertyKeyValue, "init");
				} else {
					console.error(
						"执行 ObjectStruct.createByObjectExpressionAst 根据 objectExpressionAst",
						objectExpressionAst,
						"环境结构 this.environmentStruct",
						environmentStruct,
						"创建 objectStruct 时, 根据属性 ast propertyAst",
						propertyAst,
						"添加对应的值到对象属性, 但是 propertyAst 类型是未处理的情况, 待完善"
					);
					throw new Error(
						"执行 ObjectStruct.createByObjectExpressionAst 根据 objectExpressionAst 环境结构 this.environmentStruct 创建 objectStruct 时, 根据属性 ast propertyAst 添加对应的值到对象属性, 但是 propertyAst 类型是未处理的情况, 待完善"
					);
				}
			}
		}

		console.info("objectStruct:", objectStruct);
		return objectStruct;
	}
}
