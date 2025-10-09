import PropertyMap from "../../../help_struct/property/property_map.js";

export default class ObjectExpressionStruct extends PropertyMap {
	constructor(ast, environmentStruct) {
		super(ast, environmentStruct);

		this.type = "ObjectExpression";
	}
}
