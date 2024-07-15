const { Items } = require("../models/index.model");
const { fetchAutoincrementKey, operationHandler } = require("../enum/commonFunctions");
const path = require('path');

const add = async (req, res) => {
    try {
        const id = await fetchAutoincrementKey('item');
        const store = JSON.parse(req.body.data);
        store.item_img = req.file.filename;
        store.id = id;
        await Items.create(store);
        operationHandler.handleSuccess(res, null, 'Item added successfully');
    } catch (error) {
        operationHandler.handleError(res, error, 'item add error');
    }
};

const update = async (req, res) => {
    try {
        const store = JSON.parse(req.body.data);
        if (req.file) {
            store.item_img = req.file.filename;
        }
        await Items.updateOne({ _id: store['_id'] }, store);
        operationHandler.handleSuccess(res, null, 'Item updated successfully');
    } catch (error) {
        operationHandler.handleError(res, error, 'item update error');
    }
};

const findAll = async (req, res) => {
    try {
        const store = req.body;
        const output = await Items.find({ ...store, is_deleted: false })
            .populate({
                path: 'category_id',
                select: ['category']
            }).exec();
        operationHandler.handleSuccess(res, output, 'Data fetched successfully');
    } catch (error) {
        operationHandler.handleError(res, error, 'Some error occurred');
    }
};

const findOne = async (req, res) => {
    try {
        const store = req.body;
        const output = await Items.findOne({ ...store, is_deleted: false })
            .populate('category_id').exec();
        operationHandler.handleSuccess(res, output, 'Data fetched successfully');
    } catch (error) {
        operationHandler.handleError(res, error, 'Some error occurred');
    }
};

const fetchItemImage = async (req, res) => {
    try {
        const data = await Items.findOne({ _id: req.params.id });
        const pathName = path.join(__dirname, '..', 'uploads', 'item', data.item_img);
        return res.sendFile(pathName);
    } catch (error) {
        operationHandler.handleError(res, error, 'Some error occurred');
    }
};

const deleteItem = async (req, res) => {
    try {
        const store = req.body;
        await Items.updateOne({ id: Number(store.id) }, { is_deleted: true });
        operationHandler.handleSuccess(res, null, 'Item deleted successfully');
    } catch (error) {
        operationHandler.handleError(res, error, 'Some error occurred');
    }
};

module.exports = { add, findAll, findOne, deleteItem, fetchItemImage, update };