import { useCallback } from "react";
import { Tree, Button } from "antd";

import CFileUpload from "../../../../components/file_upload_button/file_upload_button.jsx";
import "./code_files.scss";

export default function CodeFiles(props = {}) {
	const { codeFiles, onUploadFiles, onSelect = () => {}, onExpand = () => {} } = props;

	const titleRender = useCallback((node) => {
		return <div className="code_files_tree_node">{node.name}</div>;
	}, []);

	return (
		<div id="codeFiles">
			<div className="code_files_header">
				<Button className="upload_code_files">
					上传文件
					<CFileUpload webkitdirectory="true" onInput={onUploadFiles} />
				</Button>
			</div>
			<div className="code_files_tree">
				{Array.isArray(codeFiles) && codeFiles.length > 0 ? (
					<Tree
						showLine
						titleRender={titleRender}
						expandedKeys={[
							"reproduction/",
							"reproduction/libs/",
							"reproduction/libs/parse-svg-path/",
							"reproduction/src/",
							"reproduction/src/_virtual/",
							"reproduction/src/accessibility/",
							"reproduction/src/scene/",
							"reproduction/src/scene/sprite/",
							"reproduction/src/scene/view/",
							"reproduction/src/rendering/",
							"reproduction/src/rendering/renderers/",
							"reproduction/src/assets/",
						]}
						onSelect={onSelect}
						onExpand={onExpand}
						fieldNames={{
							title: "name",
							key: "key",
							children: "children",
						}}
						treeData={codeFiles}
					/>
				) : null}
			</div>
		</div>
	);
}
