import { RootFolder } from "./root_folder.js";

/**
 * 根据浏览器的 FileList 构建文件树
 * @param {FileList} files - 文件列表（需支持 webkitRelativePath）
 * @returns {RootFolder}
 */
export function createFilesTreeByFileList(files) {
	const rootFolder = new RootFolder();
	for (let i = 0; i < files.length; i++) {
		const file = files[i];
		const path = file.webkitRelativePath || file.name;
		rootFolder.addFileByPath(path, file);
	}
	return rootFolder;
}
