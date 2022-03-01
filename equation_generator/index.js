const EquationSolver = require('../solver');

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
module.exports.generate = function generate(opt = {}) {
    const { min = -100, max = 100, symbols = ['+', '-', '*', '/'], count = 4 } = opt;
    const tokens = [getRandomInt(min, max)];
    for (let i = 0; i < count; i++) {
        const operator = symbols[getRandomInt(0, symbols.length)];
        const operand = getRandomInt(min, max);
        tokens.push(operator);
        tokens.push(operand);
    }
    const equation = tokens.join(' ');
    return { equation: equation };
};
