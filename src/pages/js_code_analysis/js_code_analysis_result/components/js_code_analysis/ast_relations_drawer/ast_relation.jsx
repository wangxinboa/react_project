import { useState, useMemo, useCallback } from "react";
import { isNonEmptyArray } from "../../../../../../utils/data_type/is_type.js";

import styles from "./ast_relations_drawer.module.scss";
import AstRelationCases from "./ast_relation_cases.jsx";

const AstRelation = (props) => {
	const { index, astRelation, showParentExamples, showChildrenExamples } = props;

	const [showCase, setShowCase] = useState(false);

	const handleOnClickAstRelationTitle = useCallback(() => {
		setShowCase(!showCase);
	}, [showCase]);

	const parentRelations = useMemo(() => {
		return astRelation.getParentRelations();
	}, [astRelation]);
	const parentRelationKeys = useMemo(() => {
		return astRelation.getParentRelationKeys();
	}, [astRelation]);

	const childrenRelations = useMemo(() => {
		return astRelation.getChildrenRelations();
	}, [astRelation]);
	const childrenRelationKeys = useMemo(() => {
		return astRelation.getChildrenRelationKeys();
	}, [astRelation]);

	const handleOnShowParentExamples = useCallback(
		(relationKey, caseKey, astRelationCases) => {
			showParentExamples(astRelation, relationKey, caseKey, astRelationCases);
		},
		[astRelation, showParentExamples]
	);

	const handleOnShowChildrenExamples = useCallback(
		(relationKey, caseKey, astRelationCases) => {
			showChildrenExamples(astRelation, relationKey, caseKey, astRelationCases);
		},
		[astRelation, showChildrenExamples]
	);

	return (
		<div className={styles.ast_relation_container}>
			<div className={styles.ast_relation_title} onClick={handleOnClickAstRelationTitle}>
				{index + 1}. {astRelation.type}
			</div>
			{showCase && isNonEmptyArray(parentRelationKeys) ? (
				<div className={styles.ast_relation_cases_container}>
					<div className={styles.ast_relation_cases_container_title}>父节点 code struct</div>
					{parentRelationKeys.map((parentRelationKey, index) => {
						return (
							<AstRelationCases
								key={parentRelationKey}
								title={`父节点类型 ${parentRelationKey}`}
								relationKey={parentRelationKey}
								astRelationCases={parentRelations[index]}
								showExamples={handleOnShowParentExamples}
							/>
						);
					})}
				</div>
			) : null}

			{showCase && isNonEmptyArray(childrenRelationKeys) ? (
				<div className={styles.ast_relation_cases_container}>
					<div className={styles.ast_relation_cases_container_title}>子节点 code struct</div>
					{childrenRelationKeys.map((childrenRelationKey, index) => {
						return (
							<AstRelationCases
								key={childrenRelationKey}
								title={`子节点所在属性 ${childrenRelationKey}`}
								relationKey={childrenRelationKey}
								astRelationCases={childrenRelations[index]}
								showExamples={handleOnShowChildrenExamples}
							/>
						);
					})}
				</div>
			) : null}
		</div>
	);
};

export default AstRelation;
