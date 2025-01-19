const mongoose=require('mongoose');
const ProductSchema=mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
Pid:Number,
Pname:String,
Price:Number,
picname:String,
Pdesc:String,
cid:Number
});
const ProductModel = mongoose.model('Product', ProductSchema, 'products');



module.exports = ProductModel;
