const express = require ('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const logger = require('morgan');
var path = require('path');
const cors = require('cors');
const environment = process.env.NODE_ENV; // development
const stage = require('./config')[environment];
var user = require('./routes/user');
var itemImage = require('./routes/itemImage');
var category = require('./routes/category');
var shopType = require('./routes/shopType');
var city = require('./routes/city');
var item = require('./routes/item');
var shop = require('./routes/shop');
var index = require('./routes/index');
var exphbs = require('express-handlebars');

//console.log(UserType.schema.path('name').enumValues[0])

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');


app.use('/api', user);
app.use('/api/category',category);
app.use('/api/shop',shop);
app.use('/api/image',itemImage);
app.use('/api/item',item);
app.use('/api/city',city);
app.use('/api/shopType',shopType);
app.use('/',index);

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});
