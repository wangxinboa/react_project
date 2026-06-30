const BaseUrl = "http://localhost:2998";

export async function serviceFetchFileTree(rootPath, exclude) {
	const params = new URLSearchParams({ rootPath });
	if (exclude) params.append("exclude", exclude);
	const res = await fetch(`${BaseUrl}/api/file-tree?${params.toString()}`);
	const json = await res.json();
	if (!json.success) throw new Error(json.error || "加载文件树失败");
	return json.data;
}

export async function serviceFetchAllPrompts() {
	const res = await fetch(`${BaseUrl}/api/ai_prompt`);
	const json = await res.json();
	if (!json.success) throw new Error(json.error || "获取列表失败");
	return json.data;
}

export async function serviceFetchPromptById(id) {
	const res = await fetch(`${BaseUrl}/api/ai_prompt/${id}`);
	const json = await res.json();
	if (!json.success) throw new Error(json.error || "获取详情失败");
	return json.data;
}

export async function serviceCreatePrompt(data) {
	const res = await fetch(`${BaseUrl}/api/ai_prompt`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	const json = await res.json();
	if (!json.success) throw new Error(json.error || "创建失败");
	return json.data;
}

export async function serviceUpdatePrompt(id, data) {
	const res = await fetch(`${BaseUrl}/api/ai_prompt/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(data),
	});
	const json = await res.json();
	if (!json.success) throw new Error(json.error || "更新失败");
	return json.data;
}

export async function serviceDeletePrompt(id) {
	const res = await fetch(`${BaseUrl}/api/ai_prompt/${id}`, {
		method: "DELETE",
	});
	const json = await res.json();
	if (!json.success) throw new Error(json.error || "删除失败");
}
