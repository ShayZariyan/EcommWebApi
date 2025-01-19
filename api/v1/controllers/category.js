const mongoose=require('mongoose');
const category=require('../models/categories');
const CategoryModel = require('../models/categories');

module.exports = {

    getAll: (req, res) => {
        CategoryModel.find()
            .then((category) => {
                res.status(200).json(category);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ Msg: `Error Server Num 505`, error: err.message });
            });
    },
    getByID: (req, res) => {
        CategoryModel.find({ cid : req.params.id })
            .then((category) => {
                res.status(200).json(category);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ Msg: `Error Server Num 505`, error: err.message });
            });
    },
    addNew: (req, res) => {
        try {
            CategoryModel.insertMany(req.body)
                .then((data) => {
                    return res.status(200).json({Msg: `New Category Added ${data}`});
                })
                .catch((err) => {
                    return res.status(500).json({ error: "Error adding category", details: err });
                });
        } catch (error) {
            return res.status(500).json({ error: "Unexpected error occurred", details: error.message });
        }
    },
  
    Update: (req, res) => {
        CategoryModel.UpdateOne(({cid:req.params.cid},req.body).then((data)=>{
            return res.status(200).json(`Updated By ID : ${data}`);
        }))
            .catch((err) => {
                console.error(err);
                res.status(500).json({ Msg: `Error Server Num 505`, error: err.message });
            });
    },

    Delete: (req, res) => {
        CategoryModel.deleteOne({ Cid: req.params.id },req.body)
            .then((data) => {
                if (!deletedcategory) {
                    return res.status(404).json({ Msg: `Category with Cid ${data} not found` });
                }
                res.status(200).json({ Msg: `Category Deleted : ${data}`});
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ Msg: `Error Server Num 505`, error: err.message });
            });
    },
};