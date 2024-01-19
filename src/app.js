import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import  {router as bookRouter} from './routes/book.routes.js'


export const app = express();

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

// app.use('/api/v1/books', require('./routes/book.routes.js').default)
app.use('/api/v1/books', bookRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).end()
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


