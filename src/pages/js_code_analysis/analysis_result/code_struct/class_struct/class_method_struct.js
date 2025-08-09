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
	{
		type: "Select",
		itemPtops: {
			label: "kind",
			name: "kind",
			rules: [{ required: true, message: "请选择 class method kind" }],
		},
		controlProps: {
			options: [
				{ value: "constructor", label: "constructor" },
				{ value: "method", label: "method" },
				{ value: "get", label: "get" },
				{ value: "set", label: "set" },
			],
		},
	},
	{
		type: "Switch",
		itemPtops: {
			label: "generator",
			name: "generator",
			valuePropName: "checked",
		},
	},
	{
		type: "Switch",
		itemPtops: {
			label: "async",
			name: "async",
			valuePropName: "checked",
		},
	},
];

export default class ClassMethodStruct extends BaseStruct {
	constructor(classStruct, options = {}) {
		super(options.key, classStruct, classStruct.map);

		this.type = ClassMethodStructType;
		this.name = options.key;

		this.static = options.static ?? false;
		this.computed = options.computed ?? false;
		this.kind = options.kind ?? "method";
		this.generator = options.generator ?? false;
		this.async = options.async ?? false;

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
