import { File } from "../../../../utils/utils.js";

export default class CodeFile extends File {
	toJSON() {
		return {
			key: this.key,
			name: this.name,
		};
	}
}
