// server.js
var express  = require('express');
var app      = express();
var port     = 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');
mongoose.connect(configDB.url); // connect tới database 

require('./config/passport')(passport); // 

// Cấu hình ứng dụng express
app.use(morgan('dev')); // sử dụng để log mọi request ra console
app.use(cookieParser()); // sử dụng để đọc thông tin từ cookie
app.use(bodyParser()); // lấy thông tin từ form HTML

app.set('view engine', 'ejs'); // chỉ định view engine là ejs
app.set('views','./views');

app.use(session({ secret: 'xxxxxxxxxxxxx' })); 
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 

require('./app/routes.js')(app, passport); // load các routes từ các nguồn

app.listen(port);