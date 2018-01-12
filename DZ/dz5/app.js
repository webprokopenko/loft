const express = require('express');
const path = require('path');
const app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  res.render('error', { message: err.message, error: err });
});

const server = app.listen(process.env.PORT || 2100, function() {
  console.log('Сервер запущен на порте: ' + server.address().port);
});
