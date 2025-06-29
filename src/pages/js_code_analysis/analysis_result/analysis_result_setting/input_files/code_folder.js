import { Folder } from "../../../../../utils/utils.js";

export default class CodeFolder extends Folder {
	toJSON() {
		return {
			key: this.key,
			name: this.name,
			children: this.children,
		};
	}
}
