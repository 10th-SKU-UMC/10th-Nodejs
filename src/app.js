const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const passport = require('./config/passport');
const apiRouter = require('./routes');
const errorHandler = require('./common/middlewares/error-handler.middleware');

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', apiRouter);
app.use(errorHandler);

module.exports = app;
