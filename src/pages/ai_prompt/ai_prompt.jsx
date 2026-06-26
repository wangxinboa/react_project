import { useState, useCallback, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Input, message } from "antd";
import { PromptComponentType, PromptComponentMap } from "./prompt_components/prompt_components.js";
import { fetchPromptById, createPrompt, updatePrompt } from "../../service/service_ai_prompt.js";
import styles from "./ai_prompt.module.scss";

/**
 * 提示词编辑器页面（新建/编辑）
 */
export function AIPromptEditor() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const editId = searchParams.get("id") ? parseInt(searchParams.get("id"), 10) : null;

	const [name, setName] = useState("");
	const [components, setComponents] = useState([]);
	const [saving, setSaving] = useState(false);
	const promptMapRef = useRef({});

	useEffect(() => {
		if (editId) {
			fetchPromptById(editId)
				.then((data) => {
					setName(data.name || "");
					const comps = [];
					if (data.components) {
						for (let i = 0; i < data.components.length; i++) {
							const { type, props } = data.components[i];
							comps.push({ type, props: props || {} });
						}
					}
					setComponents(comps);
				})
				.catch(() => message.error("加载失败"));
		}
	}, [editId]);

	const updateComponentProps = useCallback((index, newProps) => {
		setComponents((prev) => {
			const next = [];
			for (let i = 0; i < prev.length; i++) {
				if (i === index) {
					next.push({ ...prev[i], props: { ...prev[i].props, ...newProps } });
				} else {
					next.push(prev[i]);
				}
			}
			return next;
		});
	}, []);

	const handleAdd = (type) => {
		const defaultProps =
			type === PromptComponentType.TextArea ? { value: "" } : { rootPath: "", exclude: "", checkedKeys: [] };
		setComponents((prev) => {
			const next = [];
			for (let i = 0; i < prev.length; i++) next.push(prev[i]);
			next.push({ type, props: defaultProps });
			return next;
		});
	};

	const handleDelete = (index) => {
		delete promptMapRef.current[index];
		setComponents((prev) => {
			const next = [];
			for (let i = 0; i < prev.length; i++) {
				if (i !== index) next.push(prev[i]);
			}
			return next;
		});
	};

	const handlePromptChange = (index, str) => {
		promptMapRef.current[index] = str;
	};

	const handleSave = async () => {
		if (!name.trim()) {
			message.warning("请输入名称");
			return;
		}
		setSaving(true);
		try {
			const payload = components.map((c) => ({ type: c.type, props: c.props }));
			if (editId) {
				await updatePrompt(editId, { name: name.trim(), components: payload });
				message.success("更新成功");
			} else {
				await createPrompt({ name: name.trim(), components: payload });
				message.success("创建成功");
			}
			navigate("/AIPrompt");
		} catch (e) {
			message.error("保存失败");
		} finally {
			setSaving(false);
		}
	};

	const handlePrint = () => {
		let full = "";
		for (let i = 0; i < components.length; i++) {
			full += promptMapRef.current[i] || "";
		}
		console.info(full);
		navigator.clipboard.writeText(full);
	};

	return (
		<div className={styles.editor}>
			<div className={styles.toolbar}>
				<Input placeholder="提示词名称" value={name} onChange={(e) => setName(e.target.value)} style={{ width: 200 }} />
				<Button onClick={() => handleAdd(PromptComponentType.CodeTree)}>添加代码树</Button>
				<Button onClick={() => handleAdd(PromptComponentType.TextArea)}>添加文本域</Button>
				<Button type="primary" loading={saving} onClick={handleSave}>
					保存
				</Button>
				<Button onClick={handlePrint}>打印提示词</Button>
			</div>
			<div className={styles.componentList}>
				{components.map((comp, index) => {
					const Component = PromptComponentMap[comp.type];
					if (!Component) return null;
					const commonProps = {
						onPromptChange: (str) => handlePromptChange(index, str),
					};
					if (comp.type === PromptComponentType.CodeTree) {
						return (
							<div key={index} className={styles.componentItem}>
								<div className={styles.componentHeader}>
									<span>代码树</span>
									<Button size="small" danger onClick={() => handleDelete(index)}>
										删除
									</Button>
								</div>
								<Component
									rootPath={comp.props.rootPath}
									exclude={comp.props.exclude}
									checkedKeys={comp.props.checkedKeys}
									onConfigChange={(config) => updateComponentProps(index, config)}
									{...commonProps}
								/>
							</div>
						);
					}
					return (
						<div key={index} className={styles.componentItem}>
							<div className={styles.componentHeader}>
								<span>文本域</span>
								<Button size="small" danger onClick={() => handleDelete(index)}>
									删除
								</Button>
							</div>
							<Component
								value={comp.props.value}
								onChange={(value) => updateComponentProps(index, { value })}
								{...commonProps}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}
