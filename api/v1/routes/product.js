const express=require('express');
const router=express.Router();
const{getAll,getByID,addNew,Update,Delete}=require('../controllers/product');
router.get('/',getAll);
router.get('/:id',getByID);
router.post('/',addNew);
router.put('/:id',Update);
router.delete('/:id',Delete);
module.exports=router;