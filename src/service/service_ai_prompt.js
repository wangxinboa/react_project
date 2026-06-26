// 文件路径：src/service/service_ai_prompt.js

const BASE_URL = "http://localhost:2998";

/**
 * 获取文件树
 * @param {string} rootPath
 * @param {string} [exclude]
 * @returns {Promise<Object>} 返回 { success, data } 格式的响应数据
 */
export async function fetchFileTree(rootPath, exclude) {
	const params = new URLSearchParams({ rootPath });
	if (exclude) params.append("exclude", exclude);
	const res = await fetch(`${BASE_URL}/api/file-tree?${params.toString()}`);
	const json = await res.json();
	if (!json.success) throw new Error(json.error || "加载文件树失败");
	return json.data;
}

/**
 * 获取所有提示词配置
 * @returns {Promise<Array>}
 */
export async function fetchAllPrompts() {
	const res = await fetch(`${BASE_URL}/api/prompts`);
	const json = await res.json();
	if (!json.success) throw new Error(json.error || "获取列表失败");
	return json.data;
}

/**
 * 获取单个提示词配置
 * @param {number} id
 * @returns {Promise<Object>}
 */
export async function fetchPromptById(id) {
	const res = await fetch(`${BASE_URL}/api/prompts/${id}`);
	const json = await res.json();
	if (!json.success) throw new Error(json.error || "获取详情失败");
	return json.data;
}

/**
 * 创建提示词配置
 * @param {{ name: string, components: Array }} data
 * @returns {Promise<Object>}
 */
export async function createPrompt(data) {
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
 * @returns {Promise<Object>}
 */
export async function updatePrompt(id, data) {
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
export async function deletePrompt(id) {
	const res = await fetch(`${BASE_URL}/api/prompts/${id}`, {
		method: "DELETE",
	});
	const json = await res.json();
	if (!json.success) throw new Error(json.error || "删除失败");
}
