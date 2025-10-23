import { useMemo, useCallback } from "react";
import { isNonEmptyArray } from "../../../../../../utils/data_type/is_type.js";
import AstRelationPanelCases from "./ast_relation_panel_cases.jsx";

import styles from "./ast_relations_drawer.module.scss";

const AstRelationPanel = (props) => {
	const { astRelation, showParentExamples, showChildrenExamples } = props;

	const parentCases = useMemo(() => {
		return astRelation.getParentCases();
	}, [astRelation]);
	const parentCaseKeys = useMemo(() => {
		return astRelation.getParentCaseKeys();
	}, [astRelation]);

	const childrenCases = useMemo(() => {
		return astRelation.getChildrenCases();
	}, [astRelation]);
	const childrenCaseKeys = useMemo(() => {
		return astRelation.getChildrenCaseKeys();
	}, [astRelation]);

	const handleOnShowParentExamples = useCallback(
		(caseKey, astRelationCases) => {
			showParentExamples(astRelation, caseKey, astRelationCases);
		},
		[astRelation, showParentExamples]
	);

	const handleOnShowChildrenExamples = useCallback(
		(caseKey, astRelationCases) => {
			showChildrenExamples(astRelation, caseKey, astRelationCases);
		},
		[astRelation, showChildrenExamples]
	);

	return (
		<div className={styles.ast_relation_panel}>
			{isNonEmptyArray(parentCaseKeys) ? (
				<AstRelationPanelCases
					title={`父节点 code struct (${parentCaseKeys.length})`}
					caseKeys={parentCaseKeys}
					cases={parentCases}
					showExamples={handleOnShowParentExamples}
				/>
			) : null}
			{isNonEmptyArray(childrenCaseKeys) ? (
				<AstRelationPanelCases
					title={`子节点 code struct (${childrenCaseKeys.length})`}
					caseKeys={childrenCaseKeys}
					cases={childrenCases}
					showExamples={handleOnShowChildrenExamples}
				/>
			) : null}
		</div>
	);
};

export default AstRelationPanel;
