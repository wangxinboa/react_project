import RootFolder from "./root_folder.js";
import Folder from "./folder.js";
import File from "./file.js";

export default function getFiles(
	files,
	RootFolderClass = RootFolder,
	FolderClass = Folder,
	FileClass = File
) {
	// 将 files 信息转化为 tree

	let root = new RootFolderClass();

	for (let i = 0; i < files.length; i++) {
		let file = files[i],
			path = file.webkitRelativePath.split("/"),
			parentFolde,
			currentPath = "";

		path.forEach((name, level, array) => {
			currentPath += name + "/";
			if (level === array.length - 1) {
				//	是文件
				let fileNode = new FileClass(file);
				parentFolde.addFile(fileNode);
				parentFolde.sort();

				root.saveFile(fileNode);
			} else {
				//	是文件夹
				if (level === 0) {
					//	是上传的根文件夹
					if (root.key === void 0) {
						root.init(currentPath, name);
					}
					parentFolde = root;
				} else {
					//	是文件夹
					if (parentFolde.hasFolder(name)) {
						// 还未存在
						parentFolde = parentFolde.getFolder(name);
					} else {
						let folderNode = new FolderClass().init(currentPath, name);

						parentFolde.addFolder(folderNode);
						parentFolde.sort();
						parentFolde = folderNode;
					}
				}
			}
		});
	}
	return root;
}
