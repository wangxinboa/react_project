import NodeOperationButton from "../../node_operations/node_operation_button.jsx";
import styles from "./ast_relations_drawer.module.scss";

const AstRelationPanelCases = (props) => {
	const { showExamples, title, caseKeys, cases } = props;

	return (
		<div className={styles.ast_relation_panel_cases}>
			<div className={styles.ast_relation_cases_title}>{title}</div>
			<div className={styles.ast_relation_cases_content}>
				{caseKeys.map((caseKey, index) => {
					const astRelationCase = cases[index];
					return (
						<div key={caseKey} className={styles.ast_relation_case_container}>
							<div className={styles.ast_relation_case_title}>
								{index + 1}. {caseKey} ({astRelationCase.length})
							</div>
							<div className={styles.ast_relation_case_operations}>
								<NodeOperationButton
									title="展示案例"
									onClick={() => {
										showExamples(caseKey, astRelationCase);
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

export default AstRelationPanelCases;
