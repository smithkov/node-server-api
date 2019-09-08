const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const environment = process.env.NODE_ENV;
const stage = require('../config')[environment];

const userSchema = new Schema({
  // username: {
  //    type:String,
  //    unique:true,
  //    trim: true
  //  },
  email:{
    type:String,
     unique:true,
     trim: true
   },
  password:String,
  dor: {
     type: Date,
     default: Date.now
   },
   userType: {type: String, enum: ['Customer', 'Seller', 'Admin']}
})

var User = module.exports = mongoose.model('User', userSchema);



module.exports.getAll = function (callback, limit){
 User.find(callback).limit(limit);
}

module.exports.remove = (id, callback)=>{
	var query = {_id:id};

	User.remove(query,callback);
}

module.exports.getById = (id, callback)=> {
 User.findById(id, callback);
}

module.exports.login = (data, callback)=> {
 User.findOne({email: data.email}, callback);
}



// module.exports.getByUserId = function(id, callback) {
//  User.findOne({user: id}, callback).populate('hQualification').populate('nationality').populate('user').populate('cityOfChoice').populate('pQualification').populate('schoolWish1').populate('schoolWish2').populate('level').populate('course1').populate('course2');
// }
module.exports.add = function(data, callback) {
 User.insert(data, callback);
}


module.exports.update = (id,update, options, callback)=>{
	var query = {_id:id};

	User.findOneAndUpdate(query,update, options,callback);
}
