import CodeFile from "./code_file.js";
import { getFiles } from "../../../../../utils/utils.js";

export default function getCodeFiles(files) {
	return getFiles(files, void 0, void 0, CodeFile);
}
