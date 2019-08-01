var express = require('express');
var router = express.Router();
const Category = require('../models/category')
const Config = require('../config')
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const environment = process.env.NODE_ENV;
const stage = require('../config')[environment];
const Joi = require('joi');
var multer  =   require('multer');

router.get('/list', function(req, res) {
  Category.getAll((err,category)=>{
     if (err) return res.status(500).send(Config.errorMesg.a500)

     return res.status(200).send({ data: category });
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
    //upload(req,res,function(err) {
      // req.file is the `avatar` file
      // req.body will hold the text fields, if there were any
        // if(err) {
        //     return res.send("Error uploading file.");
        // }
        var name = req.body.name;
        var category = new Category({
          name : name,
          path:req.file.filename
        })
        
        category.save(function(err,data){
           if (err){
              res.send({ auth: false, token: null,error:true, data:err });
           }
           else {
            //console.log(data)
            res.send({ auth: false, token: null,error:false, data:data });
           }
            
        })
        
    //});
});


// router.post('/register', function(req, res) {

//       //var hashedPassword = bcrypt.hashSync(req.body.password, 8);
//       var email = req.body.email;
//       var password = req.body.password;
//       var schema = Config.validation.register();
//       const {error} = Joi.validate({ email: email, password: password }, schema);

//       if(error)
//          return res.status(400).send({ auth: false, token: null,error:true, msg:error.details[0].message })

//       var hashedPassword = bcrypt.hashSync(req.body.password, 9);
//       var newUser = new User({
//         email : req.body.email,
//         password : hashedPassword,
//         userType : User.schema.path('userType').enumValues[0]
//       });

//       newUser.save(function(err,user) {
//          if (err) return res.status(500).send(err)
//         // create a token
//         var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//           expiresIn: 86400 // expires in 24 hours
//         });
//         res.status(200).send({ auth: true, token: token });
//       });

// });

module.exports = router;
