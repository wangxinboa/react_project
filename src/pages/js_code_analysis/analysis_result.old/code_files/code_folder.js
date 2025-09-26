import { Folder } from "../../../../utils/utils.js";

export default class CodeFolder extends Folder {
	selectable = false;

	toJSON() {
		return {
			key: this.key,
			name: this.name,
			children: this.children,
			selectable: false,
		};
	}
}
