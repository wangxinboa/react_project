import BaseStruct from "../base_struct.js";

const ClassMethodTypes = {
	constructor: "constructor",
	method: "method",
	get: "get",
	set: "set",
};

export default class ClassMethodStruct extends BaseStruct {
	constructor(baseKey, classStruct, option = {}) {
		super(baseKey, classStruct, classStruct.map);

		this.isClassMethodStruct = true;
		this.type = ClassMethodStruct.type;
		this.name = option.name;

		this.static = option.static ?? false;
		this.computed = option.computed ?? false;
		this.kind = option.kind ?? "method";
		this.generator = option.generator ?? false;
		this.async = option.async ?? false;

		this.parent.addMethod(this);
	}

	toJSON() {
		return {
			type: ClassMethodStruct.type,

			name: this.name,
			static: this.static,
			computed: this.computed,
			kind: this.kind,
			generator: this.generator,
			async: this.async,
		};
	}

	static type = "ClassMethod";
	/**
	 * 根据 Form object 生成对应的 ClassMethodStruct 的 key
	 * @returns {string}
	 */
	static createBaseKeyFromForm(formValues) {
		return (
			`${ClassMethodStruct.type}:` +
			(formValues.static ? "_static_" : "") +
			(formValues.generator ? "_generator_" : "") +
			(formValues.computed ? "_computed_" : "") +
			(formValues.async ? "_async_" : "") +
			(formValues.kind !== ClassMethodTypes.constructor ? `_${formValues.kind}_` : "") +
			formValues.name
		);
	}

	static createStructFromForm(parentStruct, values) {
		return new ClassMethodStruct(ClassMethodStruct.createBaseKeyFromForm(values), parentStruct, values);
	}

	static quickFormOption = [
		{
			type: "Input",
			itemPtops: {
				label: "name",
				name: "name",
				rules: [{ required: true, message: "请输入 class method name" }],
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
}
