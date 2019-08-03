const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemImageSchema = new Schema({
  path: {
     type:String
   },
   item:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item'
    }
})

var ItemImage = module.exports = mongoose.model('ItemImage', itemImageSchema);

module.exports.getAll = (callback, limit) =>{
 ItemImage.find(callback).limit(limit);
}

module.exports.findByItem = (id,callback) =>{
 ItemImage.find({item:id},callback).populate('item');
}

module.exports.remove = (id, callback)=>{
	var query = {_id:id};

	ItemImage.remove(query,callback);
}

module.exports.getById = (id, callback)=> {
 ItemImage.findById(id, callback);
}

module.exports.getByName = (name, callback)=> {
 ItemImage.findOne({name: name}, callback);
}

// module.exports.getByItemImageId = function(id, callback) {
//  ItemImage.findOne({ItemImage: id}, callback).populate('hQualification').populate('nationality').populate('ItemImage').populate('cityOfChoice').populate('pQualification').populate('schoolWish1').populate('schoolWish2').populate('level').populate('course1').populate('course2');
// }
module.exports.add = (data, callback)=> {
 ItemImage.insertMany(data, callback);
}


module.exports.update = (id,update, options, callback)=>{
	var query = {_id:id};

	ItemImage.findOneAndUpdate(query,update, options,callback);
}
