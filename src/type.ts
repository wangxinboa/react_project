import { File as FileClass } from "./utils/input_files/file.js";
import { Folder as FolderClass } from "./utils/input_files/folder.js";
import { RootFolder as RootFolderClass } from "./utils/input_files/root_folder.js";

declare global {
	namespace AppType {
		/** 文件树节点 - 文件类 */
		type File = FileClass;
		/** 文件树节点 - 文件夹类 */
		type Folder = FolderClass;
		/** 根文件夹类，用于构建文件树并读取文件内容 */
		type RootFolder = RootFolderClass;

		/**
		 * 服务端返回的文件树节点结构（递归）
		 * 由 /api/file-tree 接口返回，包含文件夹和文件两类节点
		 */
		interface ServerTreeNode {
			/** 文件或文件夹的绝对路径 */
			key: string;
			/** 文件或文件夹名称 */
			title: string;
			/** 是否为文件夹，仅文件夹节点存在 */
			isFolder?: boolean;
			/** 是否为文件（叶子节点），仅文件节点存在 */
			isLeaf?: boolean;
			/** 子节点数组，仅文件夹节点存在，递归包含 ServerTreeNode */
			children?: ServerTreeNode[];
			/** 文件后缀（含.），如 ".js"，仅文件节点存在 */
			suffix?: string;
			/** 文件内容字符串，仅文件节点存在 */
			codeString?: string;
		}

		/**
		 * 存储在 codeFilesMap 中的文件信息对象
		 * 由前端代码树组件内部使用，以文件路径为 key 存储文件内容和后缀
		 */
		interface FileInfo {
			/** 文件完整文本内容 */
			codeString: string;
			/** 文件后缀（含.），如 ".js" */
			suffix: string;
		}
	}
}
