import { useRef, useContext, useMemo, useState, useCallback, forwardRef, useImperativeHandle } from "react";
import { Collapse, Drawer } from "antd";

import { JsCodeJsCodeAnalysisResultContext } from "../../../js_code_analysis_result.jsx";
import AstRelationPanel from "./ast_relation_panel.jsx";
import AstRelationsExamples from "./ast_relations_examples.jsx";

import styles from "./ast_relations_drawer.module.scss";

const AstRelationsDrawer = forwardRef((props, ref) => {
	const { astRelationManager } = useContext(JsCodeJsCodeAnalysisResultContext);

	const astRelationsExamplesRef = useRef(null);

	const astRelations = useMemo(() => {
		return astRelationManager.getAstRelations();
	}, [astRelationManager]);

	const [visible, setVisible] = useState(false);

	const handleOnDrawerClose = useCallback(() => {
		setVisible(false);
	}, []);

	const handleOnShowParentExamples = useCallback((astRelation, parentCaseKey, astRelationParentCases) => {
		astRelationsExamplesRef.current.showParentExamples(astRelation, parentCaseKey, astRelationParentCases);
	}, []);

	const handleOnShowChildrenExamples = useCallback((astRelation, childCaseKey, astRelationChildrenCases) => {
		console.info("astRelation:", astRelation);
		console.info("childCaseKey:", childCaseKey);
		console.info("astRelationChildrenCases:", astRelationChildrenCases);

		astRelationsExamplesRef.current.showChildrenExamples(astRelation, childCaseKey, astRelationChildrenCases);
	}, []);

	useImperativeHandle(
		ref,
		() => {
			return {
				show() {
					setVisible(true);
				},
				hide() {
					setVisible(false);
				},
			};
		},
		[]
	);

	return (
		<Drawer
			classNames={{
				body: styles.ast_relations_drawer_body,
			}}
			title="ast 关系展示"
			open={visible}
			placement="left"
			width={800}
			onClose={handleOnDrawerClose}
		>
			<div className={styles.ast_relations_container}>
				<Collapse
					size="middle"
					bordered={false}
					items={astRelations.map((astRelation, index) => {
						return {
							key: astRelation.type,
							classNames: {
								header: styles.ast_relations_collapse_header,
								body: styles.ast_relations_collapse_body,
							},
							label: `${index + 1}. ${astRelation.type}`,
							children: (
								<AstRelationPanel
									key={astRelation.type}
									astRelation={astRelation}
									showParentExamples={handleOnShowParentExamples}
									showChildrenExamples={handleOnShowChildrenExamples}
								/>
							),
						};
					})}
				/>
			</div>
			<AstRelationsExamples ref={astRelationsExamplesRef} />
		</Drawer>
	);
});

export default AstRelationsDrawer;
