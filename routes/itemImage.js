var express = require('express');
var router = express.Router();
const Config = require('../config');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const Joi = require('joi');
const Query = new require('../config/query');
const Item = require('../models').Item;
const model = require('../models');
const ItemImage =  require('../models').ItemImage;

//  router.post('/item',function(req, res) {
//      var id = req.body.id;
//      var id = mongoose.Types.ObjectId(id);
//      console.log(id)
//        Item.getById(id,function(err,item){
//          ItemImage.findByItem(item.id,function(err,images){
//            //item.images.push();
//            for(var i =0; images.length>i; i++){
//              item.images.push(images[i].path)
//            }
//            return res.send({ auth: false, token: null,error:false, data:item });
//          })
//      })
//  });
//
// router.get('/item/:id',function(req, res) {
//   var itemId = req.params.id;
//   ItemImage.findByItem(itemId,function(err, data){
//     if(err)
//       return res.status(500).send({ auth: false,error:true, msg:"Oops! something went wrong" });
//     else
//       return res.send({ auth: true, token: null,error:false, data:data});
//
//   })
// });


module.exports = router;
