const BASE_URL = "http://localhost:2998/api/project_manager";

export async function serviceGetAllProjects() {
	const res = await fetch(`${BASE_URL}/projects`);
	const json = await res.json();
	if (!json.success) throw new Error(json.error || "获取项目列表失败");
	return json.data;
}

export async function serviceAddProject(record) {
	const res = await fetch(`${BASE_URL}/projects`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(record),
	});
	const json = await res.json();
	if (!json.success) throw new Error(json.error || "新增项目失败");
	return json.data;
}

export async function serviceUpdateProject(id, record) {
	const res = await fetch(`${BASE_URL}/projects/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(record),
	});
	const json = await res.json();
	if (!json.success) throw new Error(json.error || "更新项目失败");
	return json.data;
}

export async function serviceDeleteProject(id) {
	const res = await fetch(`${BASE_URL}/projects/${id}`, {
		method: "DELETE",
	});
	const json = await res.json();
	if (!json.success) throw new Error(json.error || "删除项目失败");
}

/**
 * 导入项目与需求数据（完全替换后端数据）
 * @param {{ projects: Array, requirements: Array }} data
 */
export async function serviceImportProjectManager({ projects, requirements }) {
	const res = await fetch(`${BASE_URL}/import`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ projects, requirements }),
	});
	const json = await res.json();
	if (!json.success) throw new Error(json.error || "导入失败");
}
