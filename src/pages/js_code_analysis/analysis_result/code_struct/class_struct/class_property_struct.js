import BaseStruct from "../base_struct.js";

export const ClassPropertyStructType = "ClassProperty";

export const ClassPropertyStructQuickFormOptions = [
	{
		type: "Input",
		itemPtops: {
			label: "key",
			name: "key",
			rules: [{ required: true, message: "请输入 class property key" }],
		},
	},
	{
		type: "Switch",
		itemPtops: {
			label: "static",
			name: "static",
			valuePropName: "checked",
		},
	},
	{
		type: "Switch",
		itemPtops: {
			label: "computed",
			name: "computed",
			valuePropName: "checked",
		},
	},
];

export default class ClassPropertyStruct extends BaseStruct {
	constructor(classStruct, options) {
		super(options.key, classStruct, classStruct.map);

		this.type = ClassPropertyStructType;
		this.name = options.key;

		this.static = options.static ?? false;
		this.computed = options.computed ?? false;

		this.parent.addProperty(this);
	}

	toJSON() {
		return {
			key: this.currentKey,
			type: ClassPropertyStructType,
			parent: this.parent.key,

			static: this.static,
			computed: this.computed,
		};
	}
}
