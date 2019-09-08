var express = require('express');
var router = express.Router();
const Config = require('../config')
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const environment = process.env.NODE_ENV;
const stage = require('../config')[environment];
const Joi = require('joi');
const ShopType =  require('../models').ShopType;
const Query = new require('../config/query');

router.get('/', function(req, res) {
  var queryShopType = new Query(ShopType);
  queryShopType.all().then(shopType=>{
    return res.send({ auth: false, token: null,error:false, data:shopType });
  })
});



module.exports = router;
