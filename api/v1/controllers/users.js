const mongoose=require('mongoose');
const UsersModel = require('../models/users');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const rounds=10;
module.exports = {
    
    getAll: (req, res) => {
        UsersModel.find()
            .then((users) => {
                res.status(200).json({msg:`All userss : ${users}`});
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ Msg: `Error Server Num 505`, error: err.message });
            });
    },
    getByID: (req, res) => {
        UsersModel.find({ Uid : req.params.id })
            .then((users) => {
                res.status(200).json(users);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ Msg: `Error Server Num 505`, error: err.message });
            });
    },

    login: (req, res) => {
        const { Uname, Upass } = req.body;
        UsersModel.findOne({ Uname })
            .then(user => {
                if (!user) {
                    return res.status(404).json({ Msg: `The User ${Uname} Doesn't Exist` });
                } 
                else 
                {
                    bcrypt.compare(Upass, user.Upass)
                        .then(exist => {
                            if (!exist) {
                                return res.status(404).json({ Msg: `Wrong Password` });
                            } else {
                                
                                const PrivateKey=Upass
                                const token=jwt.sign({Uname,fullname},PrivateKey,{expiresIn:'1h'});
                                res.status(200).json({ Msg: `Welcome ${Uname} `, token });

                            }
                        })
                        .catch(err => {
                            console.error(err);
                            res.status(500).json({ Msg: `Server Error - ${err}` });
                        });
                }
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ Msg: `Server Error - ${err}` });
            });
    },

    register: (req,res)=>{
    
        const{Uname,Upass,fullname,Udesc}=req.body;
        bcrypt.hash(Upass,rounds,(err,hashString)=>{
            if(err){
                return res.status(500).json({Msg:err.message});
            }
            else
            {
                exist=UsersModel.findOne({ Uname })
                if(!exist)
                {
                    UsersModel.insertMany({Uname,Upass:hashString,fullname,Udesc})
                    .then((data) => {
                        return res.status(200).json({Msg: `New User Added ${data}`});
                    })
                }
                else
                {
                    return res.status(500).json({Msg:`${Uname} Already Exist`});
                }
            }
        })
    },
  
    Update: (req, res) => {
        UsersModel.UpdateOne(({Uid:req.params.Uid},req.body).then((data)=>{
            return res.status(200).json(`Updated By ID : ${data}`);
        }))
            .catch((err) => {
                console.error(err);
                res.status(500).json({ Msg: `Error Server Num 505`, error: err.message });
            });
    },

    Delete: (req, res) => {
        UsersModel.deleteOne({ Uid: req.params.id },req.body)
            .then((data) => {
                if (!deletedusers) {
                    return res.status(404).json({ Msg: `users with Uid ${data} not found` });
                }
                res.status(200).json({ Msg: `users Deleted : ${data}`});
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ Msg: `Error Server Num 505`, error: err.message });
            });
    },
};