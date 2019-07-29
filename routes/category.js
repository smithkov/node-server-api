var express = require('express');
var router = express.Router();
const Category = require('../models/category')
const Config = require('../config')
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const environment = process.env.NODE_ENV;
const stage = require('../config')[environment];
const Joi = require('joi');

router.get('/', function(req, res) {
  Category.getAll((err,category)=>{
     if (err) return res.status(500).send(Config.errorMesg.a500)

     return res.status(200).send({ data: category });
  })
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
