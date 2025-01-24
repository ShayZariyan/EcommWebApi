const mongoose=require('mongoose');
const UsersSchema=mongoose.Schema({
_id:mongoose.Schema.Types.ObjectId,
Uname:String,
Upass:String,
fullname:String,
Udesc:String

});
module.exports = mongoose.model('users', UsersSchema);



