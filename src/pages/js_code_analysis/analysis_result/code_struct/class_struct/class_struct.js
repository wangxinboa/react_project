import BaseStruct from "../base_struct.js";

export const ClassStructType = "Class";

export const ClassStructQuickFormOptions = [
	{
		type: "Input",
		itemPtops: {
			label: "id",
			name: "id",
			rules: [{ required: true, message: "请输入 class id" }],
		},
	},
];

export default class ClassStruct extends BaseStruct {
	constructor(parent, options) {
		super(options.id, parent, parent.map);

		this.type = ClassStructType;

		this.name = options.id;

		this.methodsMap = {};
		this.propertyMap = {};

		this.parent.addChild(this);
	}

	addMethod(classMethodStruct) {
		this.methodsMap[classMethodStruct.key] = classMethodStruct;
		this.addChild(classMethodStruct);
		return this;
	}

	addProperty(classPropertyStruct) {
		this.methodsMap[classPropertyStruct.key] = classPropertyStruct;
		this.addChild(classPropertyStruct);
		return this;
	}

	toJSON() {
		return {
			type: ClassStructType,
			parent: this.parent.key,

			id: this.name,
			children: this.children,
		};
	}
}
