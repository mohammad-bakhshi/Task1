const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const cors = require('cors');
const createError = require('http-errors');


const appRouter = require('./routes/appRouter');

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "User API",
			version: "1.0.0",
			description: "User Api",
		},
		servers: [
			{
				url: "http://localhost:3000",
			},
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				}
			}
		},
		security: [{
			bearerAuth: []
		}]
	},
	apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);

const config = dotenv.config({ path: path.join(__dirname, './config.env') });
if (config.error) console.log('[-] dotenv config > ' + config.error.message);

//connect to DB
(async () => {
	try {
		await mongoose.connect(process.env.DATABASE);
	} catch (error) {
		console.log("Error: Database connection can not be established...!\n", error.message);
		process.exit(1);
	}
})();

mongoose.connection.on('open', function () {
	console.log("Database Connection Established...!");
});

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//documentation endpoint
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

// goes to app route
app.use('/api', appRouter);

//404 error
app.use((req, res, next) => {
	next(createError.NotFound());
})


//error handler
app.use(function (err, req, res, next) {
	console.log(err);
	return res.status(err.status || 500).json({ err: err.message });
});

module.exports = app;
