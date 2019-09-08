var express = require('express');
var router = express.Router();
const Config = require('../config')
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const environment = process.env.NODE_ENV;
const stage = require('../config')[environment];
const Joi = require('joi');
const Shop =  require('../models').Shop;
const Address =  require('../models').Address;
var multer  =   require('multer');
const Query = new require('../config/query');

router.get('/', function(req, res) {
  var queryShop = new Query(Shop);
  queryShop.all().then(shop=>{
    return res.send({ auth: false, token: null,error:false, data:shop });
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


router.post('/getByUser', (req, res) => {
  var userId = req.body.userId;
    queryShop = new Query(Shop);

    queryShop.findOne({'userId':userId}).then(data=>{
      return res.send({ error:false, data:data });
    }).catch(error=>{
      return res.send({ error:true, data:error });
    })
});
router.post('/',upload.single('file'),function(req,res){

  var name = req.body.name;
  var phone = req.body.phone;
  var shopTypeId = req.body.shopTypeId;
  var postCode = req.body.postCode;
  var cityId = req.body.cityId;
  var userId = req.body.userId;
  var addressName = req.body.address;

 var queryShop = new Query(Shop);

  let shop = {
    name : name,
    phone:phone,
    shopTypeId:shopTypeId,
    userId: userId,
    logo: req.file.filename
  }
  queryShop.create(shop).then(data=>{
    var address = {
      name:addressName,
      shopId:data.id,
      postCode:postCode,
      cityId:cityId,

    };
    var queryAddress = new Query(Address);
     queryAddress.create(address).then(data2=>{
       res.send({ auth: false, token: null,error:false, data:shop });
     })
  }).catch(error=>{
    res.send({ auth: false, token: null,error:true, data:error });
  });
});




module.exports = router;
