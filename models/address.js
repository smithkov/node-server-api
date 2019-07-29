const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const addressSchema = new Schema({
  address: {
     type:String
   },
  postcode:{
    type:String
   },
  user:{
     type: mongoose.Schema.Types.ObjectId,
     ref: 'User'
   },
   shop:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shop'
    },

})

var Address = module.exports = mongoose.model('Address', addressSchema);

module.exports.getAll = (callback, limit) =>{
 Address.find(callback).limit(limit);
}

module.exports.remove = (id, callback)=>{
	var query = {_id:id};

	Address.remove(query,callback);
}

module.exports.getById = (id, callback)=> {
 Address.findById(id, callback);
}



// module.exports.getByAddressId = function(id, callback) {
//  Address.findOne({Address: id}, callback).populate('hQualification').populate('nationality').populate('Address').populate('cityOfChoice').populate('pQualification').populate('schoolWish1').populate('schoolWish2').populate('level').populate('course1').populate('course2');
// }
module.exports.add = (data, callback)=> {
 Address.insert(data, callback);
}


module.exports.update = (id,update, options, callback)=>{
	var query = {_id:id};

	Address.findOneAndUpdate(query,update, options,callback);
}
