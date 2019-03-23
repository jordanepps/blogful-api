require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');

const ArticlesService = require('./articles-service');

const app = express();

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';

app.use(morgan(morganOption));
app.use(cors());
app.use(helmet());

app.get('/articles', (req, res, next) => {
	const knexInstance = req.app.get('db');
	ArticlesService.getAllArticles(knexInstance)
		.then(articles => {
			res.json(articles);
		})
		.catch(next);
});

app.get('/', (req, res) => {
	res.send('Hello, boilerplate!');
});

app.use(function errorHandler(error, req, res, next) {
	let response =
		NODE_ENV === 'production'
			? { error: { message: 'server error' } }
			: { message: error.message, error };
	res.status(500).json(response);
});

module.exports = app;
