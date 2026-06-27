const BASE_URL = "http://localhost:2998";

/**
 * 获取文件树（请求本地服务）
 * @param {string} rootPath - 要扫描的根目录绝对路径
 * @param {string} [exclude] - 逗号分割的排除文件夹名，如 "node_modules,dist"
 * @returns {Promise<AppType.ServerTreeNode>} 包含完整文件树的根节点
 */
export async function serviceFetchFileTree(rootPath, exclude) {
	const params = new URLSearchParams({ rootPath });
	if (exclude) params.append("exclude", exclude);
	const res = await fetch(`${BASE_URL}/api/file-tree?${params.toString()}`);
	const json = await res.json();
	if (!json.success) throw new Error(json.error || "加载文件树失败");
	return json.data;
}

/**
 * 获取所有提示词配置
 * @returns {Promise<Array<{id: number, name: string, components: Array, createTime: number, updateTime: number}>>}
 */
export async function serviceFetchAllPrompts() {
	const res = await fetch(`${BASE_URL}/api/prompts`);
	const json = await res.json();
	if (!json.success) throw new Error(json.error || "获取列表失败");
	return json.data;
}

/**
 * 获取单个提示词配置
 * @param {number} id
 * @returns {Promise<{id: number, name: string, components: Array, createTime: number, updateTime: number}>}
 */
export async function serviceFetchPromptById(id) {
	const res = await fetch(`${BASE_URL}/api/prompts/${id}`);
	const json = await res.json();
	if (!json.success) throw new Error(json.error || "获取详情失败");
	return json.data;
}

/**
 * 创建提示词配置
 * @param {{ name: string, components: Array }} data
 * @returns {Promise<{id: number, name: string, components: Array, createTime: number, updateTime: number}>}
 */
export async function serviceCreatePrompt(data) {
	const res = await fetch(`${BASE_URL}/api/prompts`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	const json = await res.json();
	if (!json.success) throw new Error(json.error || "创建失败");
	return json.data;
}

/**
 * 更新提示词配置
 * @param {number} id
 * @param {{ name?: string, components?: Array }} data
 * @returns {Promise<{id: number, name: string, components: Array, createTime: number, updateTime: number}>}
 */
export async function serviceUpdatePrompt(id, data) {
	const res = await fetch(`${BASE_URL}/api/prompts/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	const json = await res.json();
	if (!json.success) throw new Error(json.error || "更新失败");
	return json.data;
}

/**
 * 删除提示词配置
 * @param {number} id
 * @returns {Promise<void>}
 */
export async function serviceDeletePrompt(id) {
	const res = await fetch(`${BASE_URL}/api/prompts/${id}`, {
		method: "DELETE",
	});
	const json = await res.json();
	if (!json.success) throw new Error(json.error || "删除失败");
}
