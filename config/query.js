

function Query(model){
  var m = model;
  this.create = (obj)=> { return m.create(obj)};
  this.all = (array=null)=> m.findAll({include: array});
  this.update = (obj)=> m.update(obj,{where:{id:obj.id}});
  this.createMany = (array)=> m.bulkCreate(array);
  this.findById = (id, array=null)=> m.findByPk(id,{include: array});
  this.findOne = (queryObj,array=null)=>m.findOne({ where: queryObj,include:array});
  this.findParam = (queryObj)=>m.findAll({ where: queryObj});
  this.delete = (queryObj)=> m.destroy({where: queryObj});
}
module.exports = Query;
