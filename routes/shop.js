var express = require('express');
var router = express.Router();
const Shop = require('../models/shop');
const Address = require('../models/address')
const Config = require('../config')
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const environment = process.env.NODE_ENV;
const stage = require('../config')[environment];
const Joi = require('joi');
var multer  =   require('multer');

router.get('/list', function(req, res) {
  Shop.getAll((err,data)=>{
     if (err) return res.status(500).send(Config.errorMesg.a500)

     return res.status(200).send({ data: data});
  })
});

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
      console.log(file);
      var filetype = '';
      if(file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});
var upload = multer({storage: storage});

router.post('/add',upload.single('file'),function(req,res){
  
  var name = req.body.name;
  var phone = req.body.phone;
  var postCode = req.body.postCode;
  var city = req.body.city;
  var address = req.body.address;
  var user = req.body.user;
  var shop = new Shop({
    name : name,
    phone:phone,
    city:city,
    user:user,
    logo:req.file.filename
  })

  shop.save(function(err,data){
     if (err){
        res.send({ auth: false, token: null,error:true, data:err });
     }
     else {
      var address = new Address({
        address: address,
        user:user,
        shop:data.id,
        postCode:postCode,
        city:city
      });
      address.save(function(err,data){
        if(err)
          res.send({ auth: false, token: null,error:true, data:err });
      })
      //console.log(data)
      res.send({ auth: false, token: null,error:false, data:data });
     }
      
  })
        
    //});
});




module.exports = router;
