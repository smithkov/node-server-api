var express = require('express');
var router = express.Router();
const Config = require('../config')
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const environment = process.env.NODE_ENV;
const stage = require('../config')[environment];
const Joi = require('joi');
const City =  require('../models').City;
const Query = new require('../config/query');

router.get('/', function(req, res) {
  var queryCity = new Query(City);
  queryCity.all().then(city=>{
    return res.send({ auth: false, token: null,error:false, data:city });
  })
});

module.exports = router;
