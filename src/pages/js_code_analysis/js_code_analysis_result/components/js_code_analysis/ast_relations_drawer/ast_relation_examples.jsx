import { useMemo, useState, forwardRef, useImperativeHandle } from "react";

import AstRelationsExample from "./ast_relation_example.jsx";

import styles from "./ast_relations_drawer.module.scss";

const ExampleTypesEnum = {
	parent: "parent",
	children: "children",
};

const AstRelationsExamples = forwardRef((props, ref) => {
	const [astRelation, setAstRelation] = useState(null);
	const [relationKey, setRelationKey] = useState(null);
	const [caseKey, setCaseKey] = useState(null);
	const [astRelationCases, setAstRelationCases] = useState(null);

	const [examplesType, setExamplesType] = useState(null);
	const isParent = useMemo(() => {
		return examplesType === ExampleTypesEnum.parent;
	}, [examplesType]);
	const isChildren = useMemo(() => {
		return examplesType === ExampleTypesEnum.children;
	}, [examplesType]);

	useImperativeHandle(
		ref,
		() => {
			return {
				showParentExamples(astRelation, relationKey, parentCaseKey, astRelationParentCases) {
					setAstRelation(astRelation);
					setRelationKey(relationKey);
					setCaseKey(parentCaseKey);
					setAstRelationCases(astRelationParentCases);

					setExamplesType(ExampleTypesEnum.parent);
				},
				showChildrenExamples(astRelation, relationKey, childCaseKey, astRelationChildrenCases) {
					setAstRelation(astRelation);
					setRelationKey(relationKey);
					setCaseKey(childCaseKey);
					setAstRelationCases(astRelationChildrenCases);

					setExamplesType(ExampleTypesEnum.children);
				},
			};
		},
		[]
	);

	if (
		astRelation === null ||
		relationKey === null ||
		caseKey === null ||
		astRelationCases === null ||
		examplesType === null
	) {
		return null;
	}

	return (
		<div className={styles.ast_relations_examples_container}>
			<div className={styles.ast_relations_examples_title}>
				{astRelation.type} {isChildren ? `属性 ${relationKey} 子节点为 ${caseKey}` : ""}
				{isParent ? `在父节点 ${relationKey} ${caseKey} 属性` : ""} 的 ast 案例
			</div>
			<div className={styles.ast_relations_examples_content}>
				{astRelationCases.map((astRelationParentCase, index) => {
					return (
						<AstRelationsExample
							key={astRelationParentCase.key}
							index={index}
							astRelationParentCase={astRelationParentCase}
						/>
					);
				})}
			</div>
		</div>
	);
});

export default AstRelationsExamples;
