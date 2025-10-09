/**
 * 赋值表达式操作符类型常量集合
 * @type {Object}
 * @namespace AssignmentOperatorTypes
 */
const AssignmentOperatorTypes = {
	/**
	 * 简单赋值运算符: =
	 * @type {string}
	 */
	ASSIGN: "=",
	/**
	 * 加法赋值运算符: +=
	 * @type {string}
	 */
	ASSIGN_ADD: "+=",
	/**
	 * 减法赋值运算符: -=
	 * @type {string}
	 */
	ASSIGN_SUB: "-=",
	/**
	 * 乘法赋值运算符: *=
	 * @type {string}
	 */
	ASSIGN_MUL: "*=",
	/**
	 * 除法赋值运算符: /=
	 * @type {string}
	 */
	ASSIGN_DIV: "/=",
	/**
	 * 取余赋值运算符: %=
	 * @type {string}
	 */
	ASSIGN_MOD: "%=",
	/**
	 * 指数赋值运算符: **=
	 * @type {string}
	 */
	ASSIGN_EXP: "**=",
	/**
	 * 左移位赋值运算符: <<=
	 * @type {string}
	 */
	ASSIGN_LSHIFT: "<<=",
	/**
	 * 右移位赋值运算符: >>=
	 * @type {string}
	 */
	ASSIGN_RSHIFT: ">>=",
	/**
	 * 无符号右移位赋值运算符: >>>=
	 * @type {string}
	 */
	ASSIGN_URSHIFT: ">>>=",
	/**
	 * 按位与赋值运算符: &=
	 * @type {string}
	 */
	ASSIGN_BIT_AND: "&=",
	/**
	 * 按位异或赋值运算符: ^=
	 * @type {string}
	 */
	ASSIGN_BIT_XOR: "^=",
	/**
	 * 按位或赋值运算符: |=
	 * @type {string}
	 */
	ASSIGN_BIT_OR: "|=",
	/**
	 * 逻辑与赋值运算符: &&=
	 * @type {string}
	 */
	ASSIGN_LOGICAL_AND: "&&=",
	/**
	 * 逻辑或赋值运算符: ||=
	 * @type {string}
	 */
	ASSIGN_LOGICAL_OR: "||=",
	/**
	 * 逻辑空赋值运算符: ??=
	 * @type {string}
	 */
	ASSIGN_NULLISH: "??=",
};

export default AssignmentOperatorTypes;
