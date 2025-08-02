import { generateChildStructSelectOption } from "./code_struct_utils.js";

import { FileStructType } from "./file_struct.js";
import ClassStruct, { ClassStructType, ClassStructQuickFormOptions } from "./class_struct/class_struct.js";
import ClassMethodStruct, {
	ClassMethodStructType,
	ClassMethodStructQuickFormOptions,
} from "./class_struct/class_method_struct.js";
import ClassPropertyStruct, {
	ClassPropertyStructType,
	ClassPropertyStructQuickFormOptions,
} from "./class_struct/class_property_struct.js";

const CodeStructMessage = {
	[FileStructType]: {
		QuickFormOptions: [
			{
				Struct: ClassStruct,
				type: ClassStructType,
				options: ClassStructQuickFormOptions,
			},
		],
		childrenStructSelectOptions: [generateChildStructSelectOption(ClassStructType)],
	},
	[ClassStructType]: {
		QuickFormOptions: [
			{
				Struct: ClassMethodStruct,
				type: ClassMethodStructType,
				options: ClassMethodStructQuickFormOptions,
			},
			{
				Struct: ClassPropertyStruct,
				type: ClassPropertyStructType,
				options: ClassPropertyStructQuickFormOptions,
			},
		],
		childrenStructSelectOptions: [
			generateChildStructSelectOption(ClassMethodStructType),
			generateChildStructSelectOption(ClassPropertyStructType),
		],
	},
	[ClassMethodStructType]: {},
	[ClassPropertyStructType]: {},
};

export default CodeStructMessage;
