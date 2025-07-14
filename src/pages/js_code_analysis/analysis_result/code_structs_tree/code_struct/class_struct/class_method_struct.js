import BaseStruct from "../base_struct.js";

export const ClassMethodStructType = "ClassMethod";

export const ClassMethodStructQuickFormOptions = [
	{
		type: "Input",
		itemPtops: {
			label: "key",
			name: "key",
			rules: [{ required: true, message: "请输入 class method key" }],
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
];

export default class ClassMethodStruct extends BaseStruct {
	constructor(classStruct, options = {}) {
		super(options.key, classStruct, classStruct.map);

		this.type = ClassMethodStructType;
		this.name = options.key;

		this.static = options.static;
		this.computed = options.computed;
		this.kind = options.kind;
		this.generator = options.generator;
		this.async = options.async;

		this.parent.addMethod(this);
	}

	toJSON() {
		return {
			key: this.currentKey,
			type: ClassMethodStructType,
			parent: this.parent.key,

			static: this.static,
			computed: this.computed,
			kind: this.kind,
			generator: this.generator,
			async: this.async,
		};
	}
}
