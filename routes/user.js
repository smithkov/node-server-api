var express = require('express');
var router = express.Router();
const Config = require('../config')
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const environment = process.env.NODE_ENV;
const stage = require('../config')[environment];
const Joi = require('joi');

const Query = new require('../config/query');
const User = require('../models').User;
const Role = require('../models').Role;
const Shop = require('../models').Shop;

router.post('/login', function(req, res) {
   var login = new Query(User);
   var shop = new Query(Shop);

   let hasShop = req.body.hasShop;
   // console.log("shop value: "+hasShop)
   //var data ={email: req.body.email, password:req.body.password}
   login.findOne({email:req.body.email}).then(user=> {

    if (!user) return res.send({auth:false, msg:'email or password is not correct.'});

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid)
     return res.status(401).send({ auth: false, token: null ,msg:'email or password is not correct.'});
     else{
       var token = jwt.sign({ id: user.id}, process.env.JWT_SECRET, {
         expiresIn: 86400 // expires in 24 hours
       });

       let userObject ={
         id:user.id,
         surname:user.surname,
         firstname:user.firstname,
         email:user.email,
         token:token,
         phone:user.phone,
         roleId:user.roleId
       }

        if(!hasShop){
            // console.log("No shop");
          res.send({ auth: true, user: userObject });
        }
        else{
          console.log("Has shop");
          shop.findOne({userId:user.id}).then(shop=>{
            // console.log(shop);
            res.send({ auth: true, user: userObject,shop:shop });
          })

        }

     }

  }).catch(err=>{
    if (err) return res.send(Config.errorMesg.a500)
   // create a token
  });
});


router.post('/register', function(req, res) {
      var userQuery = new Query(User);

      //var hashedPassword = bcrypt.hashSync(req.body.password, 8);
      var email = req.body.email;
      var password = req.body.password;
      let firstname = req.body.firstname;
      let surname = req.body.surname;
      var roleId = req.body.roleId;

      var schema = Config.validation.register();
      const {error} = Joi.validate({ email: email, password: password }, schema);

      if(error)
         return res.status(400).send({ auth: false, token: null,error:true, msg:error.details[0].message })

      let hashedPassword = bcrypt.hashSync(password, 8);
      let newUser = {
        email : email,
        firstname: firstname,
        surname:surname,
        password : hashedPassword,
        roleId: roleId
      };
      userQuery.findOne({email:email}).then(user=>{
        if(user)
        return res.status(400).send({ auth: false, token: null,error:true, msg:"email already exist" })
        else {
          userQuery.create(newUser).then(user=>{
            var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
              expiresIn: 86400 // expires in 24 hours
            });
            console.log(user);
            res.status(200).send({ auth: true, token: token,user:user });
          }).catch(err=>{
            if (err) return res.status(500).send(err)
          });
        }
      })

});

module.exports = router;
