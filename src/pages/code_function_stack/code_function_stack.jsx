import { CodeFunctionStackEntries } from "./code_function_stack_entry/code_function_stack_entry.jsx";
import CodeFunctionStackJSON from "./code_function_stack_json.js";

import styles from "./code_function_stack.module.scss";

const CodeFunctionStack = () => {
	return (
		<div className={styles.code_function_stack}>
			<CodeFunctionStackEntries data={CodeFunctionStackJSON} />
		</div>
	);
};

export default CodeFunctionStack;
