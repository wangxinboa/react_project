import { useMemo } from "react";
import styles from "./ast_relations_drawer.module.scss";
import NodeOperationButton from "../../node_operations/node_operation_button.jsx";

const AstRelationCase = (props) => {
	const { showExamples, title, relationKey, astRelationCases } = props;

	const caseKeys = useMemo(() => {
		return astRelationCases.getCaseKeys();
	}, [astRelationCases]);

	const casesArray = useMemo(() => {
		return astRelationCases.getCases();
	}, [astRelationCases]);

	return (
		<div className={styles.ast_relation_cases}>
			<div className={styles.ast_relation_cases_title}>{title}</div>
			<div className={styles.ast_relation_cases_content}>
				{caseKeys.map((caseKey, index) => {
					return (
						<div key={caseKey} className={styles.ast_relation_case_conatiner}>
							<div className={styles.ast_relation_case_title}>
								{index + 1}. {caseKey} ({casesArray[index].length})
							</div>
							<div className={styles.ast_relation_case_operations}>
								<NodeOperationButton
									title="展示案例"
									onClick={() => {
										showExamples(relationKey, caseKey, casesArray[index]);
									}}
								/>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default AstRelationCase;
