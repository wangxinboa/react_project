import RootCodeFolder from "./root_code_folder.js";
import CodeFolder from "./code_folder.js";
import CodeFile from "./code_file.js";

import createFilesTreeByFileList from "../../../../utils/input_files/create_files_tree_by_file_list.js";

export default function createCodeFilesTreeByFileList(files) {
	return createFilesTreeByFileList(files, RootCodeFolder, CodeFolder, CodeFile);
}
