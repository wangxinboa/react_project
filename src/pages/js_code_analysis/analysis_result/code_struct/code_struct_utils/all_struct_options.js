import { createStructClassSelectOption } from "./create_option.js";

import FunctionStruct from "../function_struct.js";
import ClassStruct from "../class_struct/class_struct.js";
import ClassMethodStruct from "../class_struct/class_method_struct.js";
import ClassPropertyStruct from "../class_struct/class_property_struct.js";

const AllStructOptions = [
	createStructClassSelectOption(FunctionStruct),
	createStructClassSelectOption(ClassStruct),
	createStructClassSelectOption(ClassMethodStruct),
	createStructClassSelectOption(ClassPropertyStruct),
];

export default AllStructOptions;
