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
var multer = require('multer');
 var fs = require('fs');


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
     var id = req.body.id;
     console.log(id)
       Item.getById(id,function(err,item){
         ItemImage.findByItem(id,function(err,images){
           item.images.push(images);
           return res.send({ auth: false, token: null,error:false, data:item });
         })
     })
 });
router.get('/items', (req, res) => {

    Item.getAll(function(err,data){
      return res.send({ auth: false, token: null,error:false, data:data });
    })
});
router.post('/upload', (req, res) => {
console.log(req.route )

  // const {error} = Joi.validate({name:name,price:price}, schema);
  // if(error)
  //    return res.status(400).send({ auth: false, token: null,error:true, msg:error.details[0].message });
  //    else{
   upload(req,res, function(err) {
         if (err) {
             return res.end(err.toString());
         }
         else{
           var name = req.body.name;
           var price =req.body.price;
           var weight =req.body.weight;
            //Validation error is checked
            var schema = Config.validation.item();
            const {error} = Joi.validate({name:name,price:price}, schema);
            if(error){
              //return a validation error to the client

              for(var i=0; i< req.files.length; i++ ){
               //array.push({item:item._id, path:req.files[i].filename })
               fs.unlink("./public/Images/"+req.files[i].filename)
               //console.log(req.files[i].originalname)
              }
              return res.status(400).send({ auth: false, token: null,error:true, msg:error.details[0].message });
            }
            else{
                //if no validation error occured then save data to database
                var item = new Item ({
                  name: name,
                  price: price,
                  weight:weight,
                  defaultImg:req.files[0].filename
                });

               item.save(function(err,item){
                 var array = [];

                  for(var i=0; i< req.files.length; i++ ){
                   array.push({item:item._id, path:req.files[i].filename })
                   //console.log(req.files[i].originalname)
                  }
                  ItemImage.insertMany(array,(err,data)=>{
                  //  if(data)

                  })
                  return res.send({ auth: false, token: null,error:false, data:item });
               })
            }

         }
    });
     //}



});


module.exports = router;
