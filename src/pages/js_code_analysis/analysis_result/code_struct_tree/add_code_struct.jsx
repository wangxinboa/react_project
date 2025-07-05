import React, { useState, useImperativeHandle, useCallback } from "react";
import { Drawer } from "antd";

export default React.forwardRef(function AddCodeStruct(props, ref) {
	const [parentCodeStruct, setParentCodeStruct] = useState(null);

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
		></Drawer>
	);
});
