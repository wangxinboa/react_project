import RootCodeFolder from "./root_code_folder.js";
import CodeFolder from "./code_folder.js";
import CodeFile from "./code_file.js";

import { createFilesTreeByFileList } from "../create_files_tree_by_file_list.js";

export function createCodeFilesTreeByFileList(files) {
	return createFilesTreeByFileList(files, RootCodeFolder, CodeFolder, CodeFile);
}
