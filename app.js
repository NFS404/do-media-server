require('dotenv').config();
require('./system/mongo.js');
const express = require('express');
const app = express();
const system = require('./system');

app.set('port', process.env.PORT ? process.env.PORT : 3000);

app.use(function(req, res, next) {
	console.log(req.method, req.url);
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE,OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token,Authorization');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

app.use(express.urlencoded());
app.use(express.json());

app.use('/api', system);
app.use('/', express.static('public'));

const server = app.listen(app.get('port'), function() {
	console.log(server.address());
});