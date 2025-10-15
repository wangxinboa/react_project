import ClassBodyStruct from "../../ast_struct/classes/class_body_struct.js";
import ClassDeclarationStruct from "../../ast_struct/classes/class_declaration_struct.js";
import ClassExpressionStruct from "../../ast_struct/classes/class_expression_struct.js";
import ClassMethodStruct from "../../ast_struct/classes/class_method_struct.js";
import FunctionDeclarationStruct from "../../ast_struct/declarations/function_declaration_struct.js";
import VariableDeclarationStruct from "../../ast_struct/declarations/variable_declaration_struct.js";
import VariableDeclaratorStruct from "../../ast_struct/declarations/variable_declarator_struct.js";
import ArrayExpressionStruct from "../../ast_struct/expressions/array_expression_struct.js";
import ArrowFunctionExpressionStruct from "../../ast_struct/expressions/arrow_function_expression_struct.js";
import AwaitExpressionStruct from "../../ast_struct/expressions/await_expression_struct.js";
import AssignmentExpressionStruct from "../../ast_struct/expressions/binary_operations/assignment_expression/assignment_expression_struct.js";
import BinaryExpressionStruct from "../../ast_struct/expressions/binary_operations/binary_expression/binary_expression_struct.js";
import LogicalExpressionStruct from "../../ast_struct/expressions/binary_operations/logical_expression_struct.js";
import MemberExpressionStruct from "../../ast_struct/expressions/binary_operations/member_expression_struct.js";
import OptionalMemberExpressionStruct from "../../ast_struct/expressions/binary_operations/optional_member_expression_struct.js";
import SpreadElementStruct from "../../ast_struct/expressions/binary_operations/spread_element_struct.js";
import CallExpressionStruct from "../../ast_struct/expressions/call_expression_struct.js";
import ConditionalExpressionStruct from "../../ast_struct/expressions/conditional_expression_struct.js";
import FunctionExpressionStruct from "../../ast_struct/expressions/function_expression_struct.js";
import ImportStruct from "../../ast_struct/expressions/import_struct.js";
import NewExpressionStruct from "../../ast_struct/expressions/new_expression_struct.js";
import ObjectExpressionStruct from "../../ast_struct/expressions/object_expression/object_expression_struct.js";
import ObjectMethodStruct from "../../ast_struct/expressions/object_expression/object_method_struct.js";
import ObjectPropertyStruct from "../../ast_struct/expressions/object_expression/object_property_struct.js";
import OptionalCallExpressionStruct from "../../ast_struct/expressions/optional_call_expression_struct.js";
import SequenceExpressionStruct from "../../ast_struct/expressions/sequence_expression_struct.js";
import SuperStruct from "../../ast_struct/expressions/super_struct.js";
import ThisExpressionStruct from "../../ast_struct/expressions/this_expression_struct.js";
import UnaryExpressionStruct from "../../ast_struct/expressions/unary_operations/unary_expression_struct.js";
import UpdateExpressionStruct from "../../ast_struct/expressions/unary_operations/update_expression_struct.js";
import BooleanLiteralStruct from "../../ast_struct/literals/boolean_literal_struct.js";
import IdentifierStruct from "../../ast_struct/literals/identifier_struct.js";
import NullLiteralStruct from "../../ast_struct/literals/null_literal_struct.js";
import NumericLiteralStruct from "../../ast_struct/literals/numeric_literal_struct.js";
import RegExpLiteralStruct from "../../ast_struct/literals/reg_exp_literal_struct.js";
import StringLiteralStruct from "../../ast_struct/literals/string_literal_struct.js";
import ExportDefaultDeclarationStruct from "../../ast_struct/modules/exports/export_default_declaration_struct.js";
import ExportNamedDeclarationStruct from "../../ast_struct/modules/exports/export_named_declaration_struct.js";
import ExportSpecifierStruct from "../../ast_struct/modules/exports/export_specifier_struct.js";
import ImportDeclarationStruct from "../../ast_struct/modules/imports/import_declaration_struct.js";
import ImportDefaultSpecifierStruct from "../../ast_struct/modules/imports/import_default_specifier_struct.js";
import ImportNamespaceSpecifierStruct from "../../ast_struct/modules/imports/import_namespace_specifier_struct.js";
import ImportSpecifierStruct from "../../ast_struct/modules/imports/import_specifier_struct.js";
import ArrayPatternStruct from "../../ast_struct/patterns/array_pattern_struct.js";
import AssignmentPatternStruct from "../../ast_struct/patterns/assignment_pattern_struct.js";
import ObjectPatternStruct from "../../ast_struct/patterns/object_pattern_struct.js";
import RestElementStruct from "../../ast_struct/patterns/rest_element_struct.js";
import BlockStatementStruct from "../../ast_struct/statements/block_statement_struct.js";
import IfStatementStruct from "../../ast_struct/statements/choice/if_statement_struct.js";
import SwitchCaseStruct from "../../ast_struct/statements/choice/switch_case_struct.js";
import SwitchStatementStruct from "../../ast_struct/statements/choice/switch_statement_struct.js";
import BreakStatementStruct from "../../ast_struct/statements/control_flow/break_statement_struct.js";
import ContinueStatementStruct from "../../ast_struct/statements/control_flow/continue_statement_struct.js";
import ReturnStatementStruct from "../../ast_struct/statements/control_flow/return_statement_struct.js";
import EmptyStatementStruct from "../../ast_struct/statements/empty_statement_struct.js";
import CatchClauseStruct from "../../ast_struct/statements/exceptions/catch_clause_struct.js";
import ThrowStatementStruct from "../../ast_struct/statements/exceptions/throw_statement_struct.js";
import TryStatementStruct from "../../ast_struct/statements/exceptions/try_statement_struct.js";
import ExpressionStatementStruct from "../../ast_struct/statements/expression_statement_struct.js";
import DoWhileStatementStruct from "../../ast_struct/statements/loops/do_while_statement_struct.js";
import ForInStatementStruct from "../../ast_struct/statements/loops/for_in_statement_struct.js";
import ForOfStatementStruct from "../../ast_struct/statements/loops/for_of_statement_struct.js";
import ForStatementStruct from "../../ast_struct/statements/loops/for_statement_struct.js";
import WhileStatementStruct from "../../ast_struct/statements/loops/while_statement_struct.js";
import TemplateElementStruct from "../../ast_struct/template_literals/template_element_struct.js";
import TemplateLiteralStruct from "../../ast_struct/template_literals/template_literal_struct.js";

const TransformAstToCodeStructRuleMap = {
	// classes
	ClassExpression: {
		structClass: ClassExpressionStruct,
		astProperties: ["superClass", "body"],
	},
	ClassDeclaration: {
		structClass: ClassDeclarationStruct,
		astProperties: ["superClass", "body"],
	},
	ClassBody: {
		structClass: ClassBodyStruct,
		astProperties: ["body"],
	},
	ClassMethod: {
		structClass: ClassMethodStruct,
		astProperties: ["params", "body"],
	},
	// declarations
	FunctionDeclaration: {
		structClass: FunctionDeclarationStruct,
		astProperties: ["params", "body"],
	},
	VariableDeclaration: {
		structClass: VariableDeclarationStruct,
		astProperties: ["declarations"],
	},
	VariableDeclarator: {
		structClass: VariableDeclaratorStruct,
		astProperties: ["id", "init"],
	},
	// binary_operations
	// expressions/binary_operations/assignment_expression
	AssignmentExpression: {
		structClass: AssignmentExpressionStruct,
		astProperties: ["left", "right"],
	},
	// binary_expression
	BinaryExpression: {
		structClass: BinaryExpressionStruct,
		astProperties: ["left", "right"],
	},
	LogicalExpression: {
		structClass: LogicalExpressionStruct,
		astProperties: ["left", "right"],
	},
	MemberExpression: {
		structClass: MemberExpressionStruct,
		astProperties: ["object", "property"],
	},
	OptionalMemberExpression: {
		structClass: OptionalMemberExpressionStruct,
		astProperties: ["object", "property"],
	},
	SpreadElement: {
		structClass: SpreadElementStruct,
		astProperties: ["argument"],
	},
	// object_expression
	ObjectExpression: {
		structClass: ObjectExpressionStruct,
		astProperties: ["properties"],
	},
	ObjectProperty: {
		structClass: ObjectPropertyStruct,
		astProperties: ["key", "value"],
	},
	ObjectMethod: {
		structClass: ObjectMethodStruct,
		astProperties: ["params"],
	},
	// unary_operations
	UnaryExpression: {
		structClass: UnaryExpressionStruct,
		astProperties: ["argument"],
	},
	UpdateExpression: {
		structClass: UpdateExpressionStruct,
		astProperties: ["argument"],
	},
	ArrayExpression: {
		structClass: ArrayExpressionStruct,
		astProperties: ["elements"],
	},
	ArrowFunctionExpression: {
		structClass: ArrowFunctionExpressionStruct,
		astProperties: ["params"],
	},
	AwaitExpression: {
		structClass: AwaitExpressionStruct,
		astProperties: ["argument"],
	},
	CallExpression: {
		structClass: CallExpressionStruct,
		astProperties: ["arguments", "callee"],
	},
	OptionalCallExpression: {
		structClass: OptionalCallExpressionStruct,
		astProperties: ["arguments", "callee"],
	},
	ConditionalExpression: {
		structClass: ConditionalExpressionStruct,
		astProperties: ["test", "consequent", "alternate"],
	},
	FunctionExpression: {
		structClass: FunctionExpressionStruct,
		astProperties: ["params", "body"],
	},
	Super: {
		structClass: SuperStruct,
	},
	Import: {
		structClass: ImportStruct,
	},
	NewExpression: {
		structClass: NewExpressionStruct,
		astProperties: ["arguments", "callee"],
	},
	SequenceExpression: {
		structClass: SequenceExpressionStruct,
		astProperties: ["expressions"],
	},
	ThisExpression: {
		structClass: ThisExpressionStruct,
	},
	// literals
	BooleanLiteral: {
		structClass: BooleanLiteralStruct,
	},
	Identifier: {
		structClass: IdentifierStruct,
	},
	NullLiteral: {
		structClass: NullLiteralStruct,
	},
	NumericLiteral: {
		structClass: NumericLiteralStruct,
	},
	RegExpLiteral: {
		structClass: RegExpLiteralStruct,
	},
	StringLiteral: {
		structClass: StringLiteralStruct,
	},
	// module
	// export
	ExportDefaultDeclaration: {
		structClass: ExportDefaultDeclarationStruct,
		astProperties: ["declaration"],
	},
	ExportNamedDeclaration: {
		structClass: ExportNamedDeclarationStruct,
		astProperties: ["specifiers", "declaration", "assertions"],
	},
	ExportSpecifier: {
		structClass: ExportSpecifierStruct,
	},
	// imports
	ImportDeclaration: {
		structClass: ImportDeclarationStruct,
		astProperties: ["specifiers"],
	},
	ImportDefaultSpecifier: {
		structClass: ImportDefaultSpecifierStruct,
	},
	ImportNamespaceSpecifier: {
		structClass: ImportNamespaceSpecifierStruct,
	},
	ImportSpecifier: {
		structClass: ImportSpecifierStruct,
	},
	// patterns
	ArrayPattern: {
		structClass: ArrayPatternStruct,
	},
	AssignmentPattern: {
		structClass: AssignmentPatternStruct,
		astProperties: ["left", "right"],
	},
	ObjectPattern: {
		structClass: ObjectPatternStruct,
		astProperties: ["properties"],
	},
	RestElement: {
		structClass: RestElementStruct,
	},
	// statements
	// choice
	IfStatement: {
		structClass: IfStatementStruct,
		astProperties: ["test", "consequent", "alternate"],
	},
	SwitchStatement: {
		structClass: SwitchStatementStruct,
		astProperties: ["discriminant", "cases"],
	},
	SwitchCase: {
		structClass: SwitchCaseStruct,
		astProperties: ["test", "consequent"],
	},
	// control flow
	BreakStatement: {
		structClass: BreakStatementStruct,
	},
	ContinueStatement: {
		structClass: ContinueStatementStruct,
	},
	ReturnStatement: {
		structClass: ReturnStatementStruct,
		astProperties: ["argument"],
	},
	// exceptions
	ThrowStatement: {
		structClass: ThrowStatementStruct,
	},
	TryStatement: {
		structClass: TryStatementStruct,
		astProperties: ["block", "handler", "finalizer"],
	},
	CatchClause: {
		structClass: CatchClauseStruct,
		astProperties: ["param", "body"],
	},
	// loops
	DoWhileStatement: {
		structClass: DoWhileStatementStruct,
		astProperties: ["test", "body"],
	},
	ForInStatement: {
		structClass: ForInStatementStruct,
		astProperties: ["left", "right", "body"],
	},
	ForOfStatement: {
		structClass: ForOfStatementStruct,
		astProperties: ["left", "right", "body"],
	},
	ForStatement: {
		structClass: ForStatementStruct,
		astProperties: ["init", "test", "update", "body"],
	},
	WhileStatement: {
		structClass: WhileStatementStruct,
		astProperties: ["test", "body"],
	},
	BlockStatement: {
		structClass: BlockStatementStruct,
		astProperties: ["body"],
	},
	EmptyStatement: {
		structClass: EmptyStatementStruct,
	},
	ExpressionStatement: {
		structClass: ExpressionStatementStruct,
		astProperties: ["expression"],
	},
	// template_literals
	TemplateLiteral: {
		structClass: TemplateLiteralStruct,
		astProperties: ["expressions", "quasis"],
	},
	TemplateElement: {
		structClass: TemplateElementStruct,
	},
};

export default TransformAstToCodeStructRuleMap;

// const AstChildAstPropertiesMap = {
// 	VariableDeclaration: ["declarations"],
// };

// export default AstChildAstPropertiesMap;
