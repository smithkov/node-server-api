const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  name: {
     type:String
   },
   date: {
      type: Date,
      default: Date.now
    },
   refId:String,
   quantity: Number,
   user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    item:{
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Item'
     }
})

var Order = module.exports = mongoose.model('Order', orderSchema);

module.exports.getAll = (callback, limit) =>{
 Order.find(callback).limit(limit);
}

module.exports.remove = (id, callback)=>{
	var query = {_id:id};

	Order.remove(query,callback);
}

module.exports.getById = (id, callback)=> {
 Order.findById(id, callback);
}

module.exports.getByName = (name, callback)=> {
 Order.findOne({name: name}, callback);
}

// module.exports.getByOrderId = function(id, callback) {
//  Order.findOne({Order: id}, callback).populate('hQualification').populate('nationality').populate('Order').populate('cityOfChoice').populate('pQualification').populate('schoolWish1').populate('schoolWish2').populate('level').populate('course1').populate('course2');
// }
module.exports.add = (data, callback)=> {
 Order.insert(data, callback);
}


module.exports.update = (id,update, options, callback)=>{
	var query = {_id:id};

	Order.findOneAndUpdate(query,update, options,callback);
}
