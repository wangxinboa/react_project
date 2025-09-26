import BaseStruct from "../base_struct.js";

export default class ClassPropertyStruct extends BaseStruct {
	constructor(baseKey, classStruct, option) {
		super(baseKey, classStruct, classStruct.map);

		this.isClassPropertyStruct = true;
		this.type = ClassPropertyStruct.type;
		this.name = option.name;

		this.static = option.static ?? false;
		this.computed = option.computed ?? false;

		this.parent.addProperty(this);
	}

	toJSON() {
		return {
			type: ClassPropertyStruct.type,

			name: this.name,
			static: this.static,
			computed: this.computed,
		};
	}

	static type = "ClassProperty";
	/**
	 * 根据 Form object 生成对应的 ClassPropertyStruct 的 key
	 * @returns {string}
	 */
	static createBaseKeyFromForm(formValues) {
		return (
			`${ClassPropertyStruct.type}:` +
			(formValues.static ? "_static_" : "") +
			(formValues.computed ? "_computed_" : "") +
			formValues.name
		);
	}

	static createStructFromForm(parentStruct, values) {
		return new ClassPropertyStruct(`${ClassPropertyStruct.createBaseKeyFromForm(values)}`, parentStruct, values);
	}

	static quickFormOption = [
		{
			type: "Input",
			itemPtops: {
				label: "name",
				name: "name",
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
}
