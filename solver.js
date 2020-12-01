const Stack = require('./stack');
const Rational = require('./rational');

class EquationSolver {
    constructor(stmt) {
        this.result;
        this.error = false;
        if (this.isValidEquation(stmt)) {
            this.result = this.solve(this.infixToPostfix(stmt.split('').join(' ').trim()));
        } else {
            this.error = true;
        }
    }
    setResult(result) {
        this.result = result;
    }
    infixToPostfix(infix) {
        let tokens = new Stack();
        let postfix = new Stack();

        let sc = infix.split(' ');
        let token;
        let numberToken = '';

        while (sc.length > 0) {
            token = sc.shift();
            if (this.isOperator(token)) {
                if (this.isValidNumberToken(numberToken)) {
                    postfix.push(numberToken);
                }

                if (this.isMinus(token)) {
                    if (this.isEmptyToken(numberToken) && !this.isAfterCloseBracket(numberToken)) {
                        postfix.push(0);
                        numberToken = this.isMinus(numberToken) ? '' : '-';
                        token = '--';
                    } else {
                        numberToken = this.isMinus(numberToken) ? numberToken : '';
                    }
                }

                if (this.isOpenBracket(token)) {
                    if (!this.isEmptyToken(numberToken)) {
                        tokens.push('*');
                        numberToken = '';
                    }
                    postfix.push(numberToken + '1');
                    tokens.push(token);
                } else if (this.isCloseBracket(token)) {
                    while (!this.isOpenBracket(tokens.peek())) {
                        postfix.push(tokens.pop());
                    }
                    tokens.pop();
                    postfix.push('*');
                    numberToken = 'a';
                } else {
                    if (this.precedence(token) < this.precedence(tokens.peek())) {
                        postfix.push(tokens.pop());
                    }
                    tokens.push(token);
                    numberToken = this.isMinus(numberToken) ? numberToken : '';
                }
            } else {
                numberToken = numberToken + token;
            }
        }

        if (this.isValidNumberToken(numberToken)) {
            postfix.push(numberToken);
        }

        while (!tokens.isEmptyList()) {
            postfix.push(tokens.pop());
        }

        return postfix;
    }
    solve(postfix) {
        if (postfix.isEmptyList() || !this.isOperator(postfix.peek())) {
            return postfix;
        }

        let token;
        let num1, num2;
        token = postfix.pop();
        num1 = this.solveFirst(postfix);
        num2 = this.solveFirst(postfix);

        postfix.push(this.operate(num1, num2, token));
        return postfix;
    }
    solveFirst(postfix) {
        if (this.isArithmeticOperand(postfix.peek())) {
            postfix = this.solve(postfix);
            return postfix.pop();
        } else {
            return postfix.pop();
        }
    }
    isPlus(token) {
        return token === '+';
    }
    isMinus(token) {
        return token === '-';
    }
    isMult(token) {
        return token === '*';
    }
    isDiv(token) {
        return token === '/';
    }
    isSpecialMinus(token) {
        return token === '--';
    }
    isAfterCloseBracket(token) {
        return token === 'a';
    }
    isOpenBracket(token) {
        return token === '(';
    }
    isCloseBracket(token) {
        return token === ')';
    }
    isPow(token) {
        return token === '^';
    }
    isEmptyToken(token) {
        return token === '';
    }
    isValidNumberToken(token) {
        return !this.isEmptyToken(token) && !this.isMinus(token) && !this.isAfterCloseBracket(token);
    }
    isValidToken(token) {
        return this.isOperator(token) || !isNaN(parseInt(token));
    }
    isOperator(token) {
        return this.isArithmeticOperand(token) || this.isOpenBracket(token) || this.isCloseBracket(token);
    }
    isOperand(token) {
        return !this.isOperator(token);
    }
    isArithmeticOperand(token) {
        return (
            this.isPlus(token) ||
            this.isMinus(token) ||
            this.isSpecialMinus(token) ||
            this.isMult(token) ||
            this.isDiv(token) ||
            this.isPow(token)
        );
    }
    precedence(token) {
        if (this.isPlus(token) || this.isMinus(token)) {
            return 1;
        } else if (this.isMult(token) || this.isDiv(token)) {
            return 2;
        } else if (this.isPow(token)) {
            return 3;
        } else if (this.isSpecialMinus(token)) {
            return 4;
        } else {
            return 0;
        }
    }
    operate(a, b, operator) {
        a = a instanceof Rational ? a : Rational.string_to_rational(a + '');
        b = b instanceof Rational ? b : Rational.string_to_rational(b + '');

        if (this.isPlus(operator) || this.isSpecialMinus(operator)) {
            return Rational.add(a, b);
        } else if (this.isMinus(operator)) {
            return Rational.minus(b, a);
        } else if (this.isMult(operator)) {
            return Rational.mul(a, b);
        } else if (this.isDiv(operator)) {
            return Rational.divide(b, a);
        } else if (this.isPow(operator)) {
            return Rational.pow(b, a);
        } else {
            return 0;
        }
    }
    isValidEquation(statement) {
        const nodes = statement.split('');
        let node;

        let brackets = new Stack();
        let operator = '';

        if (nodes.length == 0) {
            this.setResult(EquationSolver.ERROR_EMPTY_INPUT());
            return false;
        } else if (this.isArithmeticOperand(nodes[0]) && !this.isMinus(nodes[0])) {
            this.setResult(EquationSolver.ERROR_INVALID_ARITHMETIC(statement));
            return false;
        }

        while (nodes.length != 0) {
            node = nodes.shift();
            if (!this.isValidToken(node)) {
                this.setResult(EquationSolver.ERROR_INVALID_TOKEN(statement, node));
                return false;
            }
            if (this.isOpenBracket(node)) {
                operator = '';
                brackets.push(node);
            } else if (this.isCloseBracket(node)) {
                operator = '';
                if (brackets.isEmptyList()) {
                    this.setResult(EquationSolver.ERROR_MISMATCH_BRACKET());
                    return false;
                }
                brackets.pop();
            } else if (this.isArithmeticOperand(node)) {
                if (this.isArithmeticOperand(operator) && !this.isMinus(node)) {
                    this.setResult(EquationSolver.ERROR_INVALID_ARITHMETIC(statement));
                    return false;
                }
                operator = node;
            } else {
                operator = '';
            }
        }
        if (brackets.isEmptyList() && this.isEmptyToken(operator)) {
            return true;
        } else {
            this.setResult(EquationSolver.ERROR_INVALID_ARITHMETIC(statement));
            return false;
        }
    }
    static ERROR_INVALID_TOKEN(statement, token) {
        return EquationSolver.ERROR(`Invalid Token: ${token}, Statement: ${statement}`);
    }
    static ERROR_MISMATCH_BRACKET() {
        return EquationSolver.ERROR(`Mismatch Brackets!`);
    }
    static ERROR_INVALID_ARITHMETIC(statement) {
        return EquationSolver.ERROR(`Invalid Arithmetic Statement: ${statement}`);
    }
    static ERROR_EMPTY_INPUT() {
        return EquationSolver.ERROR(`No input!`);
    }
    static ERROR(msg) {
        const s = new Stack();
        s.add(msg);
        return s;
    }
}

module.exports = EquationSolver;
