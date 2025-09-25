import BaseStruct from "./base_struct.js";

export default class FunctionStruct extends BaseStruct {
	constructor(baseKey, parent, option) {
		super(baseKey, parent, parent.map);

		this.type = FunctionStruct.type;

		this.id = option.id;
		this.generator = option.generator;
		this.async = option.async;

		this.parent.addChildStruct(this);
	}

	toJSON() {
		return {
			type: FunctionStruct.type,

			id: this.id,
			generator: this.generator,
			async: this.async,
		};
	}

	static type = "Function";

	static createBaseKeyFromForm(formValues) {
		return `${FunctionStruct.type}:${formValues.id}`;
	}

	static createStructFromForm(parentStruct, values) {
		return new FunctionStruct(FunctionStruct.createBaseKeyFromForm(values), parentStruct, values);
	}

	static quickFormOption = [
		{
			type: "Input",
			itemPtops: {
				label: "id",
				name: "id",
				rules: [{ required: true, message: "请输入 class method id" }],
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
