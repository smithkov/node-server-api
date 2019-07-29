const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shopSchema = new Schema({
  name: {
     type:String
   },
   phone: {
      type:String
  },
   user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    userType: {type: String, enum: ['African', 'Asian']}
})

var User = module.exports = mongoose.model('Shop', shopSchema);

module.exports.getAll = (callback, limit) =>{
 Shop.find(callback).limit(limit);
}

module.exports.remove = (id, callback)=>{
	var query = {_id:id};

	Shop.remove(query,callback);
}

module.exports.getById = (id, callback)=> {
 Shop.findById(id, callback);
}

module.exports.getByName = (name, callback)=> {
 Shop.findOne({name: name}, callback);
}

// module.exports.getByShopId = function(id, callback) {
//  Shop.findOne({Shop: id}, callback).populate('hQualification').populate('nationality').populate('Shop').populate('cityOfChoice').populate('pQualification').populate('schoolWish1').populate('schoolWish2').populate('level').populate('course1').populate('course2');
// }
module.exports.add = (data, callback)=> {
 Shop.insert(data, callback);
}


module.exports.update = (id,update, options, callback)=>{
	var query = {_id:id};

	Shop.findOneAndUpdate(query,update, options,callback);
}
