// 查找包含指定位置的AST节点
export const findNodeByPosition = (node, position, foundNode = null) => {
	if (!node.loc) return foundNode;

	const { start, end } = node.loc;
	const { line, column } = position;

	// 检查节点是否包含位置
	if (
		(start.line < line || (start.line === line && start.column <= column)) &&
		(end.line > line || (end.line === line && end.column >= column))
	) {
		foundNode = node;

		// 遍历子节点寻找更精确的匹配
		for (const key in node) {
			if (node[key] && typeof node[key] === "object") {
				const childResult = findNodeByPosition(node[key], position, foundNode);
				if (childResult) {
					foundNode = childResult;
				}
			}
		}
	}

	return foundNode;
};

// 查找最内层包含指定位置的节点
export const findDeepestNodeByPosition = (ast, position) => {
	let foundNode = null;

	function traverse(node) {
		if (!node.loc) return;

		const { start, end } = node.loc;
		const { line, column } = position;

		if (
			(start.line < line || (start.line === line && start.column <= column)) &&
			(end.line > line || (end.line === line && end.column >= column))
		) {
			foundNode = node;

			// 继续遍历子节点
			for (const key in node) {
				if (node[key] && typeof node[key] === "object") {
					traverse(node[key]);
				}
			}
		}
	}

	traverse(ast);
	return foundNode;
};
