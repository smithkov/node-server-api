const Joi = require('joi');
module.exports = {
  development: {
    port: process.env.PORT || 591,
    saltingRounds: 11
  },
  errorMesg:{
    a500:"Something went wrong, try again later."
  },
  validation:{
    register:()=>{
      return Joi.object().keys({
          //username: Joi.string().alphanum().min(3).max(30).required(),
          password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
          //access_token: [Joi.string(), Joi.number()],
          //birthyear: Joi.number().integer().min(1900).max(2013),
          email: Joi.string().email({ minDomainAtoms: 2 })
      });
    },
    item:()=>{
      return Joi.object().keys({
          name: Joi.string().min(3).max(30).required(),
          price: Joi.string().min(1).max(30).required(),
      });
    }
  }
}
