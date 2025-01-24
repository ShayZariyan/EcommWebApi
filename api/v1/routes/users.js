const router=require('express').Router();
const bcrypt=require('bcrypt');
const UsersModel=require('../models/users');
const {register,login,getAll,getByID,Update,Delete}=require('../controllers/users')

router.get('/',getAll);
router.get('/:id',getByID);
router.post('/',register);
router.post('/login',login);
router.put('/:id',Update);
router.delete('/:id',Delete);






module.exports=router;