const { fetchAutoincrementKey } = require("../enum/commonFunctions");
const { Categories } = require("../models/index.model");
const path = require('path');

const add = async (req, res) => {
    try {
        const id = await fetchAutoincrementKey('category');
        const store = JSON.parse(req.body.data);
        store.category_img = req.file.filename;
        store.id = id;
        await Categories.create(store);
        return res.status(200).send({
            message: 'Category added successfully',
            code: 200
        });
    } catch (error) {
        console.log('category add error:- ', error);
        return res.status(500).send({
            message: 'category add error',
            code: 500
        });
    }
};

const update = async (req, res) => {
    try {
        const store = JSON.parse(req.body.data);
        if (req.file) {
            store.category_img = req.file.filename;
        }
        await Categories.updateOne({ _id: store['_id'] }, store);
        return res.status(200).send({
            message: 'Category updated successfully',
            code: 200
        });
    } catch (error) {
        console.log('category update error:- ', error);
        return res.status(500).send({
            message: 'category update error',
            code: 500
        });
    }
};

const findAll = async (req, res) => {
    try {
        const output = await Categories.find({ is_deleted: false });
        return res.status(200).send({
            message: 'data fetched successfully',
            data: output,
            code: 200
        });
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
        const data = await Categories.findOne({ _id: req.body.id });
        return res.status(200).send({
            message: 'data fetched successfully',
            data: data,
            code: 200
        });
    } catch (error) {
        console.log('findOne error:- ', error);
    }
};

const fetchCategoryImage = async (req, res) => {
    try {
        const data = await Categories.findOne({ _id: req.params.id });
        const pathName = path.join(__dirname, '..', 'uploads', 'category', data.category_img);
        return res.sendFile(pathName);
    } catch (error) {
        console.log('fetchCategoryImage error:- ', error);
    }
};

const deleteCategory = async (req, res) => {
    try {
        const store = req.body;
        await Categories.updateOne({ id: Number(store.id) }, { is_deleted: true });
        return res.status(200).send({
            message: 'Data deleted successfully',
            code: 200
        });
    } catch (error) {
        return res.status(500).send({
            message: 'Some error occurred',
            code: 500
        })
    }
};

module.exports = { add, update, findAll, findOne, fetchCategoryImage, deleteCategory };