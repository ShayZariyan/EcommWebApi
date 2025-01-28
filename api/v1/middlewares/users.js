const express=require('express');
const dotenv=require('dotenv');
const jwt=require('jsonwebtoken');
const login=require('../controllers/users');
module.exports = (req,res,next)=>{
    try{
        const PrivateKey = process.env.JWT_SECRET || 'Olala';
        const authString=req.headers.authorization;
        const arr=authString.split(' ');
        const token=arr[1];
        const obj=jwt.verify(token,PrivateKey);
        req.userDate=obj;
        console.log(obj);
        next();
        }
        catch(err){
        return res.status(500).json({msg:err.message});
    }
    }
