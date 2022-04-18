const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');


const appRouter=require('./routes/appRouter');

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

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', appRouter);


module.exports = app;
