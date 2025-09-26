import FileStruct from "../file_struct.js";
import ClassStruct from "../class_struct/class_struct.js";
import ClassMethodStruct from "../class_struct/class_method_struct.js";
import ClassPropertyStruct from "../class_struct/class_property_struct.js";
import FunctionStruct from "../function_struct.js";

const CodeStructsClassMap = {
	[FileStruct.type]: FileStruct,
	[FunctionStruct.type]: FunctionStruct,
	[ClassStruct.type]: ClassStruct,
	[ClassMethodStruct.type]: ClassMethodStruct,
	[ClassPropertyStruct.type]: ClassPropertyStruct,
};

export default CodeStructsClassMap;
