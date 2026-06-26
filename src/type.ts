import { File as FileClass } from "./utils/input_files/file.js";
import { Folder as FolderClass } from "./utils/input_files/folder.js";
import { RootFolder as RootFolderClass } from "./utils/input_files/root_folder.js";

declare global {
	namespace AppType {
		type File = FileClass;
		type Folder = FolderClass;
		type RootFolder = RootFolderClass;
	}
}
