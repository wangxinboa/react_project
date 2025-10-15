import RootFolder from "./root_folder.js";
import Folder from "./folder.js";
import File from "./file.js";

export default function createFilesTreeByFileList(
	files,
	RootFolderClass = RootFolder,
	FolderClass = Folder,
	FileClass = File
) {
	// 将 files 信息转化为 tree
	let rootFolderNode = new RootFolderClass();

	for (let i = 0, filesLen = files.length; i < filesLen; i++) {
		const file = files[i];
		rootFolderNode.addFileByPath(file.webkitRelativePath, FolderClass, FileClass).initFile(file);
	}

	return rootFolderNode;
}
