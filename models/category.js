const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
     type:String
   }
})

var Category = module.exports = mongoose.model('Category', categorySchema);

module.exports.getAll = (callback, limit) =>{
 Category.find(callback).limit(limit);
}

module.exports.remove = (id, callback)=>{
	var query = {_id:id};

	Category.remove(query,callback);
}

module.exports.getById = (id, callback)=> {
 Category.findById(id, callback);
}

module.exports.getByName = (name, callback)=> {
 Category.findOne({name: name}, callback);
}

// module.exports.getByCategoryId = function(id, callback) {
//  Category.findOne({Category: id}, callback).populate('hQualification').populate('nationality').populate('Category').populate('cityOfChoice').populate('pQualification').populate('schoolWish1').populate('schoolWish2').populate('level').populate('course1').populate('course2');
// }
module.exports.add = (data, callback)=> {
 Category.insert(data, callback);
}


module.exports.update = (id,update, options, callback)=>{
	var query = {_id:id};

	Category.findOneAndUpdate(query,update, options,callback);
}
