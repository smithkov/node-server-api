var express = require('express');
var router = express.Router();
const User = require('../models/user')
const Config = require('../config')
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const environment = process.env.NODE_ENV;
const stage = require('../config')[environment];
const Joi = require('joi');

router.post('/login', function(req, res) {
   var data ={email: req.body.email, password:req.body.password}
   User.login(data,function(err,user) {
     if (err) return res.status(500).send(Config.errorMesg.a500)
    // create a token
    if (!user) return res.status(404).send({auth:true, msg:'email or password is not correct.'});

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null ,msg:'email or password is not correct.'});
    var token = jwt.sign({ id: user._id, role:user.role }, process.env.JWT_SECRET, {
      expiresIn: 86400 // expires in 24 hours
    });

    res.status(200).send({ auth: true, token: token });
  });
});


router.post('/register', function(req, res) {

      //var hashedPassword = bcrypt.hashSync(req.body.password, 8);
      var email = req.body.email;
      var password = req.body.password;
      var schema = Config.validation.register();
      const {error} = Joi.validate({ email: email, password: password }, schema);

      if(error)
         return res.status(400).send({ auth: false, token: null,error:true, msg:error.details[0].message })

      var hashedPassword = bcrypt.hashSync(req.body.password, 9);
      var newUser = new User({
        email : req.body.email,
        password : hashedPassword,
        userType : User.schema.path('userType').enumValues[0]
      });

      newUser.save(function(err,user) {
         if (err) return res.status(500).send(err)
        // create a token
        var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token });
      });

});

module.exports = router;
