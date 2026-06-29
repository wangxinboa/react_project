const BASE_URL = "http://localhost:2998/api/project_manager";

export async function serviceGetAllRequirements() {
	const res = await fetch(`${BASE_URL}/requirements`);
	const json = await res.json();
	if (!json.success) throw new Error(json.error || "获取需求列表失败");
	return json.data;
}

export async function serviceAddRequirement(record) {
	const res = await fetch(`${BASE_URL}/requirements`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(record),
	});
	const json = await res.json();
	if (!json.success) throw new Error(json.error || "新增需求失败");
	return json.data;
}

export async function serviceUpdateRequirement(id, record) {
	const res = await fetch(`${BASE_URL}/requirements/${id}`, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(record),
	});
	const json = await res.json();
	if (!json.success) throw new Error(json.error || "更新需求失败");
	return json.data;
}

export async function serviceDeleteRequirement(id) {
	const res = await fetch(`${BASE_URL}/requirements/${id}`, {
		method: "DELETE",
	});
	const json = await res.json();
	if (!json.success) throw new Error(json.error || "删除需求失败");
}
