const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: {
     type:String
   },
   price:String,
   weight:String,
   defaultImg:String,
   images : [],
   category:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    },
    shop:{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Shop'
     }
})

var Item = module.exports = mongoose.model('Item', itemSchema);

module.exports.getAll = (callback, limit) =>{
 Item.find(callback).limit(limit);
}

module.exports.remove = (id, callback)=>{
	var query = {_id:id};

	Item.remove(query,callback);
}

module.exports.getById = (id, callback)=> {
 Item.findById(id, callback);
}

module.exports.getByName = (name, callback)=> {
 Item.findOne({name: name}, callback);
}

// module.exports.getByItemId = function(id, callback) {
//  Item.findOne({Item: id}, callback).populate('hQualification').populate('nationality').populate('Item').populate('cityOfChoice').populate('pQualification').populate('schoolWish1').populate('schoolWish2').populate('level').populate('course1').populate('course2');
// }
module.exports.add = (data, callback)=> {
 Item.save(data, callback);
}


module.exports.update = (id,update, options, callback)=>{
	var query = {_id:id};

	Item.findOneAndUpdate(query,update, options,callback);
}
