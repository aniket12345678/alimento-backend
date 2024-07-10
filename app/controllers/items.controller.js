const { Items } = require("../models/index.model");
const { fetchAutoincrementKey } = require("../enum/commonFunctions");
const path = require('path');

const add = async (req, res) => {
    try {
        const id = await fetchAutoincrementKey('item');
        const store = JSON.parse(req.body.data);
        store.item_img = req.file.filename;
        store.id = id;
        await Items.create(store);
        return res.status(200).send({
            message: 'Item added successfully',
            code: 200
        });
    } catch (error) {
        console.log('item add error:- ', error);
        return res.status(500).send({
            message: 'item add error',
            code: 500
        });
    }
};

const findAll = async (req, res) => {
    try {
        const store = req.body;
        const output = await Items.find({ ...store, is_deleted: false }).populate('category_id').exec();
        return res.status(200).send({
            message: 'data fetched successfully',
            data: output,
            code: 200
        })
    } catch (error) {
        console.log('findAll error:- ', error);
        return res.status(500).send({
            message: 'Some error occurred',
            code: 500
        })
    }
};

const findOne = async (req, res) => {
    try {
        const store = req.body;
        const output = await Items.findOne({ ...store, is_deleted: false }).populate('category_id').exec();
        return res.status(200).send({
            message: 'data fetched successfully',
            data: output,
            code: 200
        })
    } catch (error) {
        console.log('findAll error:- ', error);
        return res.status(500).send({
            message: 'Some error occurred',
            code: 500
        })
    }
};

const fetchItemImage = async (req, res) => {
    try {
        const data = await Items.findOne({ id: Number(req.params.id) });
        const pathName = path.join(__dirname, '..', 'uploads', 'item', data.item_img);
        return res.sendFile(pathName);
    } catch (error) {
        console.log('fetchCategoryImage error:- ', error);
    }
};

const deleteItem = async (req, res) => {
    try {
        const store = req.body;
        await Items.updateOne({ id: Number(store.id) }, { is_deleted: true });
        return res.status(200).send({
            message: 'Item deleted successfully',
            code: 200
        });
    } catch (error) {
        return res.status(500).send({
            message: 'Some error occurred',
            code: 500
        })
    }
};

module.exports = { add, findAll, findOne, deleteItem, fetchItemImage };