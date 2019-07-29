var express = require('express');
var router = express.Router();
const Item = require('../models/item');
const ItemImage = require('../models/itemImage');
const Shop = require('../models/shop');
const Category = require('../models/category');
const Config = require('../config');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const Joi = require('joi');
var mongoose = require('mongoose');

 router.post('/item',function(req, res) {
     var id = req.body.id;
     var id = mongoose.Types.ObjectId(id);
     console.log(id)
       Item.getById(id,function(err,item){
         ItemImage.findByItem(item.id,function(err,images){
           //item.images.push();
           for(var i =0; images.length>i; i++){
             item.images.push(images[i].path)
           }
           return res.send({ auth: false, token: null,error:false, data:item });
         })
     })
 });



module.exports = router;