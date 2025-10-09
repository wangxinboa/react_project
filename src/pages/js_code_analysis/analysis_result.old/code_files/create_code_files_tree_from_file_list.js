import CodeRootFolder from "./code_root_folder.js";
import CodeFolder from "./code_folder.js";
import CodeFile from "./code_file.js";

import createFilesTreeFromFileList from "../../../../utils/input_files/create_files_tree_by_file_list.js";

export default function createCodeFilesTreeFromFileList(files) {
	return createFilesTreeFromFileList(files, CodeRootFolder, CodeFolder, CodeFile);
}
