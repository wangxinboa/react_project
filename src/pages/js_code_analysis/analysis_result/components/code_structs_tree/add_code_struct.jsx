import { forwardRef, useState, useImperativeHandle, useCallback } from "react";
import { Drawer, Select, message } from "antd";

import AntdQuickForm from "../../../../../components/antd_quick_form/antd_quick_form.jsx";
import CodeStructsClassMap from "../../code_struct/code_struct_utils/code_structs_class_map.js";
import AllStructOptions from "../../code_struct/code_struct_utils/all_struct_options.js";

import styles from "./code_structs_tree.module.scss";

const AddCodeStruct = forwardRef((props, ref) => {
	const { onAddCodeStruct } = props;
	const [parentCodeStruct, setParentCodeStruct] = useState(null);
	const [selectedStructTypes, setSelectedStructTypes] = useState([]);

	const handleOnDrawerOK = useCallback(() => {
		setParentCodeStruct(null);
	}, []);

	const handleOnDrawerClose = useCallback(() => {
		setParentCodeStruct(null);
	}, []);

	useImperativeHandle(
		ref,
		() => {
			return {
				startAddCodeStruct(_parentCodeStruct) {
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
			onOk={handleOnDrawerOK}
			onClose={handleOnDrawerClose}
		>
			<Select
				mode="tags"
				style={{ width: "100%" }}
				options={AllStructOptions}
				value={selectedStructTypes}
				onChange={setSelectedStructTypes}
			/>
			{AllStructOptions.map((structOptions) => {
				const _childStructType = structOptions.value;

				if (selectedStructTypes.length > 0 && !selectedStructTypes.includes(_childStructType)) {
					return null;
				}

				return (
					<div className={styles.add_code_struct_component_form_container} key={_childStructType}>
						<div className={styles.add_code_struct_component_form_container_title}>结构类型: {_childStructType}</div>
						<AntdQuickForm
							onFinish={(values) => {
								try {
									onAddCodeStruct(
										CodeStructsClassMap[structOptions.value].createStructFromForm(parentCodeStruct, values)
									);
									setParentCodeStruct(null);
								} catch (e) {
									message.error(`添加代码结构失败: ${String(e)}`);
								}
							}}
							submitTitle="添加结构"
							options={CodeStructsClassMap[structOptions.value].quickFormOption}
						/>
					</div>
				);
			})}
		</Drawer>
	);
});

export default AddCodeStruct;
