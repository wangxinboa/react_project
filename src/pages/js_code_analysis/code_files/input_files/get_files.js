import CodeFile from './code_file.js';
import getFiles from '../../../../utils/input_files/get_files.js';

export default function getCodeFiles(files) {
	return getFiles(files, void 0, void 0, CodeFile);
}