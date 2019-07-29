const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const finalOrderSchema = new Schema({
   date: {
      type: Date,
      default: Date.now
    },
   refId:String,
   receiptId:String,
   sum: Number,
   user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
})

var FinalOrder = module.exports = mongoose.model('FinalOrder', finalOrderSchema);

module.exports.getAll = (callback, limit) =>{
 FinalOrder.find(callback).limit(limit);
}

module.exports.remove = (id, callback)=>{
	var query = {_id:id};

	FinalOrder.remove(query,callback);
}

module.exports.getById = (id, callback)=> {
 FinalOrder.findById(id, callback);
}

module.exports.add = (data, callback)=> {
 FinalOrder.insert(data, callback);
}


module.exports.update = (id,update, options, callback)=>{
	var query = {_id:id};

	FinalOrder.findOneAndUpdate(query,update, options,callback);
}
