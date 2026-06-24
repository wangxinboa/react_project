import Folder from "../folder.js";

export default class CodeFolder extends Folder {
	selectable = false;

	destroy() {
		this.selectable = null;
		super.destroy();
	}

	toJSON() {
		return {
			isFolder: true,
			key: this.key,
			title: this.title,
			children: this.children,
			selectable: false,
		};
	}
}
