const { fetchAutoincrementKey, operationHandler } = require("../enum/commonFunctions");
const { Categories } = require("../models/index.model");
const path = require('path');

const add = async (req, res) => {
    try {
        const id = await fetchAutoincrementKey('category');
        const store = JSON.parse(req.body.data);
        store.category_img = req.file.filename;
        store.id = id;
        await Categories.create(store);
        operationHandler.handleSuccess(res, null, 'Category added successfully');
    } catch (error) {
        operationHandler.handleError(res, error, 'Some error occurred');
    }
};

const update = async (req, res) => {
    try {
        const store = JSON.parse(req.body.data);
        if (req.file) {
            store.category_img = req.file.filename;
        }
        await Categories.updateOne({ _id: store['_id'] }, store);
        operationHandler.handleSuccess(res, null, 'Category updated successfully');
    } catch (error) {
        operationHandler.handleError(res, error, 'Some error occurred');
    }
};

const findAll = async (req, res) => {
    try {
        const output = await Categories.find({ is_deleted: false });
        operationHandler.handleSuccess(res, output, 'data fetched successfully');
    } catch (error) {
        operationHandler.handleError(res, error, 'Some error occurred');
    }
};

const findOne = async (req, res) => {
    try {
        const data = await Categories.findOne({ _id: req.body.id });
        operationHandler.handleSuccess(res, data, 'data fetched successfully');
    } catch (error) {
        operationHandler.handleError(res, error, 'Some error occurred');
    }
};

const fetchCategoryImage = async (req, res) => {
    try {
        const data = await Categories.findOne({ _id: req.params.id });
        const pathName = path.join(__dirname, '..', 'uploads', 'category', data.category_img);
        return res.sendFile(pathName);
    } catch (error) {
        operationHandler.handleError(res, error, 'Some error occurred');
    }
};

const deleteCategory = async (req, res) => {
    try {
        const store = req.body;
        await Categories.updateOne({ id: Number(store.id) }, { is_deleted: true });
        operationHandler.handleSuccess(res, null, 'Data deleted successfully');
    } catch (error) {
        operationHandler.handleError(res, error, 'Some error occurred');
    }
};

module.exports = { add, update, findAll, findOne, fetchCategoryImage, deleteCategory };