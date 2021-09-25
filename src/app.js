const express = require('express'),
      path = require('path'),
      morgan = require('morgan'),
      mysql = require('mysql'),
      myConnection = require('express-myconnection');

const app = express();


// seteamos urlencoded para capturar los datos de formularios
app.use(express.urlencoded({extended:false}))
app.use(express.json())

/*
require('dotenv');
dotenv.config({path:'./env/.env'})
*/
// importing routes
const customerRoutes = require('./routes/customer');

// settings
app.set('port', process.env.PORT || 9000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
  host: '64.227.28.17',
  user: 'root',
  password: 'Ops.',
  database: 'mydb'
}, 'single'));
app.use(express.urlencoded({extended: false}));

// routes
app.use('/', customerRoutes);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
