var express = require('express');
var router = express.Router();
const Shop = require('../models/shop');
const Category = require('../models/category');
const Config = require('../config');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const Joi = require('joi');
var multer = require('multer');
 var fs = require('fs');
const Query = new require('../config/query');
const Item = require('../models').Item;
const model = require('../models');
const ItemImage =  require('../models').ItemImage;


var Storage = multer.diskStorage({
     destination: function(req, file,callback) {
         callback(null, "./public/Images");
     },
     filename: function(req, file, callback) {
         //file_name = file.fieldname + "_" +Date.now() + "_" + file.originalname;

         callback(null, file.fieldname + "_" +Date.now() + "_" + file.originalname);
     }
 });

 var upload = multer({
     storage: Storage
 }).array("photos", 10); //Field name and max count

 router.post('/item',function(req, res) {
   var queryItem = new Query(Item);
   var queryImage = new Query(ItemImage);

     var id = req.body.id;
     console.log(id)
     queryItem.findById(id, [{model: ItemImage}]).then(item=>{
       return res.send({ auth: false, token: null,error:false, data:item });
     })
 });
router.get('/getCategory/:id', (req, res) => {
    queryCategory = new Query(model.Category);
    var categoryId = req.params.id;
    queryCategory.findById(categoryId).then(data=>{
      return res.send({ auth: false, token: null,error:false, data:data });
    })
});
router.get('/', (req, res) => {
    queryItem = new Query(Item);
    //var categoryId = req.params.id;
    queryItem.all().then(data=>{
      return res.send({ auth: false, token: null,error:false, data:data });
    })
});
router.post('/itemsByShop',(req,res)=>{
  queryItem = new Query(Item);
  let shopId =req.body.shopId;
  queryItem.findParam({shopId:shopId}).then(items=>{
    return res.send({ error:false, data:items });
  }).catch(error=>{
    return res.send({ error:true, data:items });
  })
})

router.post('/delete',(req,res)=>{
  queryItem = new Query(Item);
  let itemId =req.body.itemId;
  queryItem.delete({id:itemId}).then(deleted=>{
    return res.send({ error:false, data:deleted });
  }).catch(error=>{
    return res.send({ error:true, data:null });
  })
})
router.post('/upload', (req, res) => {

queryItem = new Query(Item);
queryImage = new Query(ItemImage);
   upload(req,res, function(err) {
         if (err) {
             return res.end(err.toString());
         }
         else{
           var name = req.body.name;
           var definition = req.body.definition;
           var price =req.body.price;
           var shopId =req.body.shopId;
           var categoryId =req.body.categoryId;
           var weight =req.body.weight;
            //Validation error is checked
            var schema = Config.validation.item();
            const {error} = Joi.validate({name:name,price:price}, schema);
            if(error){
              //return a validation error to the client

              // for(var i=0; i< req.files.length; i++ ){
              //  //array.push({item:item._id, path:req.files[i].filename })
              //  fs.unlink("./public/Images/"+req.files[i].filename)
              //  //console.log(req.files[i].originalname)
              // }
              return res.status(400).send({ auth: false, token: null,error:true, msg:error.details[0].message });
            }
            else{
                //if no validation error occured then save data to database
                var item = {
                  name: name,
                  price: price,
                  weight:weight,
                  categoryId:categoryId,
                  definition:definition,
                  shopId:shopId,
                  defaultImg:req.files[0].filename
                };

               queryItem.create(item).then(item=>{
                 var array = [];

                  for(var i=0; i< req.files.length; i++ ){
                   array.push({itemId:item.id, path:req.files[i].filename })
                  }
                  queryImage.createMany(array).then(data=>{
                  //  if(data)
                    return res.send({ error:false, data:item });
                });

               })
            }

         }
    });
});


module.exports = router;
