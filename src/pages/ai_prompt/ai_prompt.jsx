import React, { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button, Input, message } from "antd";
import {
	PromptComponentType,
	PromptComponentMap,
	generatePromptStringByType,
} from "./prompt_components/prompt_components.js";
import { serviceFetchPromptById, serviceCreatePrompt, serviceUpdatePrompt } from "../../service/service_ai_prompt.js";
import { history } from "../../router/router.js";
import styles from "./ai_prompt.module.scss";

/**
 * 组件配置项结构
 * @typedef {Object} ComponentConfig
 * @property {string} type
 * @property {Object} props
 * @property {string[]} [props.checkedKeys]
 * @property {Object<string, AppType.FileInfo>} [props.codeFilesMap]
 * @property {string} [props.value]
 */

/**
 * AI 提示词编辑器（新建 / 编辑）
 * @component
 * @returns {JSX.Element}
 */
export const AIPrompt = React.memo(function AIPrompt() {
	const [searchParams] = useSearchParams();
	const initialId = searchParams.get("id") ? parseInt(searchParams.get("id"), 10) : null;
	const [promptId, setPromptId] = useState(initialId);
	const [name, setName] = useState("");
	const [components, setComponents] = useState([]);
	const [saving, setSaving] = useState(false);

	const updateComponentProps = useCallback(
		(index, newProps) => {
			const next = [];
			for (let i = 0; i < components.length; i++) {
				if (i === index) {
					next.push({ ...components[i], props: { ...components[i].props, ...newProps } });
				} else {
					next.push(components[i]);
				}
			}
			setComponents(next);
		},
		[components],
	);

	const handleAdd = (type) => {
		const defaultProps =
			type === PromptComponentType.TextArea
				? { value: "" }
				: { rootPath: "", exclude: "", checkedKeys: [], codeFilesMap: {} };
		const next = [];
		for (let i = 0; i < components.length; i++) next.push(components[i]);
		next.push({ type, props: defaultProps });
		setComponents(next);
	};

	const handleDelete = (index) => {
		const next = [];
		for (let i = 0; i < components.length; i++) {
			if (i !== index) next.push(components[i]);
		}
		setComponents(next);
	};

	const handleSave = async () => {
		if (!name.trim()) {
			message.warning("请输入名称");
			return;
		}
		setSaving(true);
		try {
			const payload = [];
			for (let i = 0; i < components.length; i++) {
				const c = components[i];
				const { codeFilesMap, ...restProps } = c.props;
				payload.push({ type: c.type, props: restProps });
			}
			if (promptId) {
				await serviceUpdatePrompt(promptId, { name: name.trim(), components: payload });
				message.success("更新成功");
			} else {
				const data = await serviceCreatePrompt({ name: name.trim(), components: payload });
				setPromptId(data.id);
				const newHash = `#${history.location.pathname}?id=${data.id}`;
				window.history.replaceState(null, "", newHash);
				message.success("创建成功");
			}
		} catch (e) {
			message.error("保存失败");
		} finally {
			setSaving(false);
		}
	};

	const handlePrint = () => {
		let full = "";
		for (let i = 0; i < components.length; i++) {
			const comp = components[i];
			full += generatePromptStringByType(comp.type, comp.props);
		}
		console.info(full);
		navigator.clipboard.writeText(full);
	};

	useEffect(() => {
		if (initialId) {
			serviceFetchPromptById(initialId)
				.then((data) => {
					setName(data.name || "");
					const comps = [];
					if (data.components) {
						for (let i = 0; i < data.components.length; i++) {
							const { type, props } = data.components[i];
							comps.push({ type, props: { ...props, codeFilesMap: {} } });
						}
					}
					setComponents(comps);
				})
				.catch(() => message.error("加载失败"));
		}
	}, [initialId]);

	return (
		<div className={styles.editor}>
			<div className={styles.toolbar}>
				<Input
					className={styles.nameInput}
					placeholder="提示词名称"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
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
									onCodeFilesMapChange={(map) => updateComponentProps(index, { codeFilesMap: map })}
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
							<Component value={comp.props.value} onChange={(value) => updateComponentProps(index, { value })} />
						</div>
					);
				})}
			</div>
		</div>
	);
});
