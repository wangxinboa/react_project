import React, { useState, useImperativeHandle, useCallback, useMemo } from "react";
import { Drawer, Select } from "antd";

import AntdQuickForm from "../../../../../components/antd_quick_form/antd_quick_form.jsx";
import CodeStructMessage from "../../code_struct/code_struct_message.js";

import styles from "./add_code_struct.module.scss";

const AddCodeStruct = React.forwardRef(function AddCodeStruct(props, ref) {
	const { onFinish } = props;
	const [parentCodeStruct, setParentCodeStruct] = useState(null);
	const [selectedStructTypes, setSelectedStructTypes] = useState([]);

	const childrenStructSelectOptions = useMemo(() => {
		return CodeStructMessage[parentCodeStruct?.type]?.childrenStructSelectOptions ?? [];
	}, [parentCodeStruct]);

	const childrenStructQuickFormOptions = useMemo(() => {
		return CodeStructMessage[parentCodeStruct?.type]?.QuickFormOptions ?? [];
	}, [parentCodeStruct]);

	const handleOnOK = useCallback(() => {
		setParentCodeStruct(null);
	}, []);

	const handleOnClose = useCallback(() => {
		setParentCodeStruct(null);
	}, []);

	useImperativeHandle(
		ref,
		() => {
			return {
				setModalParentCodeStruct(_parentCodeStruct) {
					setParentCodeStruct(_parentCodeStruct);
				},
			};
		},
		[]
	);

	return (
		<Drawer
			title={parentCodeStruct?.key}
			placement="right"
			width={500}
			open={parentCodeStruct !== null}
			onOk={handleOnOK}
			onClose={handleOnClose}
		>
			<Select
				mode="tags"
				style={{ width: "100%" }}
				options={childrenStructSelectOptions}
				value={selectedStructTypes}
				onChange={setSelectedStructTypes}
			/>
			{childrenStructQuickFormOptions.map((quickFormOption) => {
				if (selectedStructTypes.length > 0 && !selectedStructTypes.includes(quickFormOption.type)) {
					return null;
				}

				return (
					<div className={styles.add_code_struct_component_form_container} key={quickFormOption.type}>
						<div className={styles.add_code_struct_component_form_container_title}>
							结构类型: {quickFormOption.type}
						</div>
						<AntdQuickForm
							onFinish={(values) => {
								onFinish(new quickFormOption.Struct(parentCodeStruct, values));
								setParentCodeStruct(null);
							}}
							submitTitle="添加结构"
							options={quickFormOption.options}
						/>
					</div>
				);
			})}
		</Drawer>
	);
});

export default AddCodeStruct;
