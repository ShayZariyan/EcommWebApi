const express=require('express');
const catrouter=express.Router();
const{getAll,getByID,addNew,Update,Delete}=require('../controllers/category');
catrouter.get('/',getAll);
catrouter.get('/:id',getByID);
catrouter.post('/',addNew);
catrouter.put('/:id',Update);
catrouter.delete('/:id',Delete);
module.exports=catrouter;