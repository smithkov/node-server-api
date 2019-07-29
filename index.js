const express = require ('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const logger = require('morgan');
var path = require('path');
const cors = require('cors');
const environment = process.env.NODE_ENV; // development
const stage = require('./config')[environment];
var user = require('./routes/user');
var itemImage = require('./routes/itemImage');
var category = require('./routes/category');
var item = require('./routes/item');
var index = require('./routes/index');
var exphbs = require('express-handlebars');


mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser: true},()=>console.log(`db connected`));
//console.log(UserType.schema.path('name').enumValues[0])

app.use(express.static(path.join(__dirname, 'images')));
app.use(cors());
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use('api/', user);
app.use('/api/category',category);
app.use('/api/image',itemImage);
app.use('/api/item',item);
app.use('/',index);
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});
