import CodeRootFolder from "./code_root_folder.js";
import CodeFolder from "./code_folder.js";
import CodeFile from "./code_file.js";

import { getFiles } from "../../../../utils/utils.js";

export default function getCodeFiles(files) {
	return getFiles(files, CodeRootFolder, CodeFolder, CodeFile);
}
