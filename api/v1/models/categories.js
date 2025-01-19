const mongoose=require('mongoose');
const CategorySchema=mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
Cid:Number,
Cname:String,
picname:String,
Cdesc:String,
ParentCat:String,

});
const CategoryModel = mongoose.model('Categories', CategorySchema,'categories');



module.exports = CategoryModel;