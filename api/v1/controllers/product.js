const mongoose = require('mongoose');
const ProductModel = require('../models/products');

module.exports = {

    getAll: (req, res) => {
        ProductModel.find()
            .then((products) => {
                res.status(200).json(products);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ Msg: `Error Server Num 505`, error: err.message });
            });
    },
    getByID: (req, res) => {
        const prodid = req.params.id;
        ProductModel.find({ Pid: prodid })
            .then((product) => {
                if (product.length === 0) {
                    return res.status(404).json({ Msg: `Product with Pid ${prodid} not found` });
                }
                res.status(200).json(product);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ Msg: `Error Server Num 505`, error: err.message });
            });
    },
    addNew: (req, res) => {
        const product = new ProductModel({
            _id: new mongoose.Types.ObjectId(),
            Pid: req.body.Pid,
            Pname: req.body.Pname,
            Price: req.body.Price,
            Pdesc: req.body.Pdesc,
        });
        product
            .save()
            .then((savedProduct) => {
                res.status(200).json({ Msg: `New Product Added`, product: savedProduct });
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ Msg: `Error Server Num 505`, error: err.message });
            });
    },
    Update: (req, res) => {
        const prodid = req.params.id;
        ProductModel.findOneAndUpdate(
            { Pid: prodid },
            {
                Pid: req.body.Pid,
                Pname: req.body.Pname,
                Price: req.body.Price,
                Pdesc: req.body.Pdesc,
            },
            { new: true }
        )
            .then((updatedProduct) => {
                if (!updatedProduct) {
                    return res.status(404).json({ Msg: `Product with Pid ${prodid} not found` });
                }
                res.status(200).json({ Msg: `Product Updated`, product: updatedProduct });
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ Msg: `Error Server Num 505`, error: err.message });
            });
    },
    Delete: (req, res) => {
        const prodid = req.params.id;
        ProductModel.findOneAndDelete({ Pid: prodid })
            .then((deletedProduct) => {
                if (!deletedProduct) {
                    return res.status(404).json({ Msg: `Product with Pid ${prodid} not found` });
                }
                res.status(200).json({ Msg: `Product Deleted`, product: deletedProduct });
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ Msg: `Error Server Num 505`, error: err.message });
            });
    },
};