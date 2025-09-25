import BaseStruct from "../base_struct.js";

export default class ClassStruct extends BaseStruct {
	constructor(baseKey, parent, option) {
		super(baseKey, parent, parent.map);

		this.isClassStruct = true;
		this.type = ClassStruct.type;

		this.id = option.id;

		this.methodsMap = {};
		this.propertyMap = {};

		this.parent.addChildStruct(this);
	}

	addMethod(classMethodStruct) {
		this.methodsMap[classMethodStruct.key] = classMethodStruct;
		this.addChildStruct(classMethodStruct);
		return this;
	}

	addProperty(classPropertyStruct) {
		this.methodsMap[classPropertyStruct.key] = classPropertyStruct;
		this.addChildStruct(classPropertyStruct);
		return this;
	}

	toJSON() {
		return {
			type: ClassStruct.type,
			id: this.id,
			children: this.children,
		};
	}

	static type = "Class";
	/**
	 * 根据 Form object 生成对应的 ClassStruct 的 key
	 * @returns {string}
	 */
	static createBaseKeyFromForm(formValues) {
		return `${ClassStruct.type}:${formValues.id}`;
	}
	static createStructFromForm(parentStruct, values) {
		return new ClassStruct(ClassStruct.createBaseKeyFromForm(values), parentStruct, values);
	}

	static quickFormOption = [
		{
			type: "Input",
			itemPtops: {
				label: "id",
				name: "id",
				rules: [{ required: true, message: "请输入 class id" }],
			},
		},
	];
}
