import { forwardRef, useState, useImperativeHandle, useCallback, useContext } from "react";
import { Button, Drawer, Select } from "antd";

import { AnalysisResultContext } from "../../analysis_result.jsx";

import styles from "./analysis_message.module.scss";

const AddCodeStructUsedStatusTypes = {
	/** 添加调用该代码结构的代码结构 */
	AddUsedCodeStruct: 0,
	/** 添加调用该代码结构的后续代码结构 */
	AddNextUsedCodeStruct: 1,
};

const AddCodeStructUsed = forwardRef((props, ref) => {
	const { onAddUsedCodeStructOk, onAddNextUsedCodeStructOk } = props;
	const { allCodeStructSelectOptions } = useContext(AnalysisResultContext);

	const [status, setStatus] = useState(null);
	const [title, setTitle] = useState("");
	const [startUsedCodeStruct, setStartUsedCodeStruct] = useState(null);
	const [drawerVisible, setDrawerVisible] = useState(false);
	const [selectedStructUsedKeys, setSelectedStructUsedKeys] = useState([]);

	/** 确认添加代码引用 */
	const handleOnDrawerOK = useCallback(() => {
		// onOk?.(selectedStructUsedKeys);
		switch (status) {
			case AddCodeStructUsedStatusTypes.AddUsedCodeStruct:
				onAddUsedCodeStructOk(selectedStructUsedKeys);
				break;
			case AddCodeStructUsedStatusTypes.AddNextUsedCodeStruct:
				onAddNextUsedCodeStructOk(startUsedCodeStruct, selectedStructUsedKeys);
				break;
			default:
				break;
		}

		setDrawerVisible(false);
	}, [onAddNextUsedCodeStructOk, onAddUsedCodeStructOk, selectedStructUsedKeys, startUsedCodeStruct, status]);
	/** 关闭添加代码引用 */
	const handleOnDrawerClose = useCallback(() => {
		// setSelectedStructUsedKeys([]);
		setDrawerVisible(false);
	}, []);
	/** 自定义渲染下拉选项 */
	const optionRender = useCallback((option) => {
		return <div className={styles.code_struct_option}>{option.value}</div>;
	}, []);

	useImperativeHandle(
		ref,
		() => {
			return {
				startAddCodeStructUsed() {
					setStatus(AddCodeStructUsedStatusTypes.AddUsedCodeStruct);
					setTitle("添加代码结构调用信息");
					setDrawerVisible(true);
				},
				startAddNextUsedCodeStruct(startUsedCodeStruct) {
					setStatus(AddCodeStructUsedStatusTypes.AddNextUsedCodeStruct);
					setTitle(`添加下级代码结构调用信息`);
					setStartUsedCodeStruct(startUsedCodeStruct);
					setDrawerVisible(true);
				},
			};
		},
		[]
	);

	return (
		<Drawer
			title={title}
			placement="left"
			width={600}
			open={drawerVisible}
			onOk={handleOnDrawerOK}
			onClose={handleOnDrawerClose}
		>
			<div className={styles.add_code_struct_used}>
				<div className={styles.add_code_struct_used_body}>
					<Select
						allowClear
						mode="tags"
						style={{ width: "100%" }}
						options={allCodeStructSelectOptions}
						optionRender={optionRender}
						value={selectedStructUsedKeys}
						onChange={setSelectedStructUsedKeys}
					/>
				</div>
				<div className={styles.add_code_struct_used_footer}>
					<Button onClick={handleOnDrawerClose}>取消</Button>
					<Button type="primary" onClick={handleOnDrawerOK}>
						确认
					</Button>
				</div>
			</div>
		</Drawer>
	);
});

export default AddCodeStructUsed;
