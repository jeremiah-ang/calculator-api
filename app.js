const express = require('express');
const cors = require('cors');
const createError = require('http-errors');

const EquationSolver = require('./solver');

const app = express();
app.use(cors());

app.get('/', (req, res, next) => {
    return res.send('Hello!');
});

app.get('/calculator', (req, res, next) => {
    const { equation } = req.query;
    if (!equation) return next(createError(400, 'Missing "equation" Query String'));
    let result;
    try {
        const solution = new EquationSolver(equation);
        result = solution.result.pop();
        if (solution.error) {
            console.log(result);
            return next(createError(400, result));
        }
    } catch (error) {
        if (error === 'Divide By Zero') {
            return next(createError(400, error));
        }
        throw error;
    }
    return res.status(200).json({ result: result.q / result.d });
});

app.use((req, res, next) => {
    return next(createError(404, 'Not Found!'));
});

app.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || 'Unknown Error!';
    console.error(error);
    return res.status(status).json({ message });
});

module.exports = app;
