import { Folder } from "../../../../utils/utils.js";

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
			name: this.name,
			children: this.children,
			selectable: false,
		};
	}
}
