import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Input, message } from "antd";
import { PromptComponentType, PromptComponentMap } from "./prompt_components/prompt_components.js";
import { fetchPromptById, createPrompt, updatePrompt } from "../../service/service_ai_prompt.js";
import styles from "./ai_prompt_editor.module.scss";

/**
 * 提示词编辑器页面
 * @returns {JSX.Element}
 */
export function AIPromptEditor() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const editId = searchParams.get("id") ? parseInt(searchParams.get("id"), 10) : null;

	const [name, setName] = useState("");
	const [components, setComponents] = useState([]);
	const [saving, setSaving] = useState(false);

	// 加载编辑数据
	useEffect(() => {
		if (editId) {
			fetchPromptById(editId)
				.then((data) => {
					setName(data.name || "");
					// 恢复组件列表
					const comps = [];
					if (data.components) {
						for (let i = 0; i < data.components.length; i++) {
							const comp = data.components[i];
							comps.push({ type: comp.type, props: comp.props || {}, promptString: comp.promptString || "" });
						}
					}
					setComponents(comps);
				})
				.catch(() => {
					message.error("加载提示词失败");
				});
		}
	}, [editId]);

	const handleAddComponent = (type) => {
		const newComponents = [];
		for (let i = 0; i < components.length; i++) {
			newComponents.push(components[i]);
		}
		newComponents.push({ type, props: {}, promptString: "" });
		setComponents(newComponents);
	};

	const handleDeleteComponent = (index) => {
		const newComponents = [];
		for (let i = 0; i < components.length; i++) {
			if (i !== index) newComponents.push(components[i]);
		}
		setComponents(newComponents);
	};

	const handlePromptChange = (index, promptString) => {
		const newComponents = [];
		for (let i = 0; i < components.length; i++) {
			if (i === index) {
				newComponents.push({ ...components[i], promptString });
			} else {
				newComponents.push(components[i]);
			}
		}
		setComponents(newComponents);
	};

	const handleSave = async () => {
		if (!name.trim()) {
			message.warning("请输入名称");
			return;
		}
		setSaving(true);
		try {
			// 提取保存需要的数据（移除 promptString，因为它由组件运行时生成）
			const saveComponents = [];
			for (let i = 0; i < components.length; i++) {
				const { type, props } = components[i];
				saveComponents.push({ type, props });
			}
			if (editId) {
				await updatePrompt(editId, { name: name.trim(), components: saveComponents });
				message.success("更新成功");
			} else {
				await createPrompt({ name: name.trim(), components: saveComponents });
				message.success("创建成功");
			}
			navigate("/AIPrompt");
		} catch (e) {
			message.error("保存失败");
		} finally {
			setSaving(false);
		}
	};

	return (
		<div className={styles.aiPromptEditor}>
			<div className={styles.toolbar}>
				<Input placeholder="提示词名称" value={name} onChange={(e) => setName(e.target.value)} style={{ width: 200 }} />
				<Button onClick={() => handleAddComponent(PromptComponentType.CodeTree)}>添加代码树</Button>
				<Button onClick={() => handleAddComponent(PromptComponentType.TextArea)}>添加文本域</Button>
				<Button type="primary" loading={saving} onClick={handleSave}>
					保存
				</Button>
			</div>
			<div className={styles.componentList}>
				{components.map((comp, index) => {
					const Component = PromptComponentMap[comp.type];
					if (!Component) return null;
					return (
						<div key={index} className={styles.componentItem}>
							<div className={styles.componentHeader}>
								<span>{comp.type === PromptComponentType.CodeTree ? "代码树" : "文本域"}</span>
								<Button size="small" danger onClick={() => handleDeleteComponent(index)}>
									删除
								</Button>
							</div>
							<div className={styles.componentBody}>
								<Component {...comp.props} onPromptChange={(str) => handlePromptChange(index, str)} />
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
