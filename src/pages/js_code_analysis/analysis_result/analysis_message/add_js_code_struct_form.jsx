import React, { useState, useImperativeHandle, useCallback } from "react";
import { Modal } from "antd";

export default React.forwardRef(function AddJsCodeStructForm(props, ref) {
	const [visible, setVisible] = useState(false);
	const [title, setTitle] = useState("");

	const handleOnOK = useCallback(() => {
		console.info("handleOnOK");
	}, []);

	const handleOnCancel = useCallback(() => {
		console.info("handleOnCancel");
		setVisible(false);
	}, [setVisible]);

	useImperativeHandle(
		ref,
		() => {
			return {
				setModalVisible(_visible) {
					setVisible(_visible);
				},
				setModalTitle(_title) {
					setTitle(_title);
				},
			};
		},
		[]
	);

	return (
		<Modal
			style={{ display: "flex", flexDirection: "column" }}
			title={title}
			open={visible}
			onOk={handleOnOK}
			onCancel={handleOnCancel}
		>
			AddJsCodeStructForm
		</Modal>
	);
});
