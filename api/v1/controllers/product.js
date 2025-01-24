const mongoose = require('mongoose');
const ProductModel = require('../models/products');

module.exports = {

    getAll: (req, res) => {
        ProductModel.find()
            .then((Product) => {
                res.status(200).json(Product);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ Msg: `Error Server Num 505`, error: err.message });
            });
    },
    getByID: (req, res) => {
        ProductModel.find({ pid : req.params.id })
            .then((Product) => {
                res.status(200).json(Product);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ Msg: `Error Server Num 505`, error: err.message });
            });
    },
    addNew: (req, res) => {
        try {
            ProductModel.insertMany(req.body)
                .then((data) => {
                    return res.status(200).json({Msg: `New Product Added ${data}`});
                })
                .catch((err) => {
                    return res.status(500).json({ error: "Error adding Product", details: err });
                });
        } catch (error) {
            return res.status(500).json({ error: "Unexpected error occurred", details: error.message });
        }
    },
  
    Update: (req, res) => {
        ProductModel.UpdateOne(({pid:req.params.pid},req.body).then((data)=>{
            return res.status(200).json(`Updated By ID : ${data}`);
        }))
            .catch((err) => {
                console.error(err);
                res.status(500).json({ Msg: `Error Server Num 505`, error: err.message });
            });
    },

    Delete: (req, res) => {
        ProductModel.deleteOne({ pid: req.params.id },req.body)
            .then((data) => {
                if (!deletedProduct) {
                    return res.status(404).json({ Msg: `Product with pid ${data} not found` });
                }
                res.status(200).json({ Msg: `Product Deleted : ${data}`});
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ Msg: `Error Server Num 505`, error: err.message });
            });
    },
};