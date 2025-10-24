import { useRef, useContext, useMemo, useState, useCallback, forwardRef, useImperativeHandle } from "react";
import { Drawer } from "antd";

import { JsCodeJsCodeAnalysisResultContext } from "../../../js_code_analysis_result.jsx";
import AstRelation from "./ast_relation.jsx";
import AstRelationsExamples from "./ast_relation_examples.jsx";

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

	const handleOnShowParentExamples = useCallback((astRelation, relationKey, parentCaseKey, astRelationParentCases) => {
		astRelationsExamplesRef.current.showParentExamples(astRelation, relationKey, parentCaseKey, astRelationParentCases);
	}, []);

	const handleOnShowChildrenExamples = useCallback(
		(astRelation, relationKey, childCaseKey, astRelationChildrenCases) => {
			astRelationsExamplesRef.current.showChildrenExamples(
				astRelation,
				relationKey,
				childCaseKey,
				astRelationChildrenCases
			);
		},
		[]
	);

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
				{astRelations.map((astRelation, index) => {
					return (
						<AstRelation
							key={astRelation.type}
							index={index}
							astRelation={astRelation}
							showParentExamples={handleOnShowParentExamples}
							showChildrenExamples={handleOnShowChildrenExamples}
						/>
					);
				})}
			</div>
			<AstRelationsExamples ref={astRelationsExamplesRef} />
		</Drawer>
	);
});

export default AstRelationsDrawer;
