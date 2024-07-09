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

const findAll = async (req, res) => {
    try {
        const output = await Categories.find();
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
        console.log('this is a findone function');
        console.log('req.body:- ', req.body);
        const data = await Categories.findOne({ id: Number(req.body.id) });
        console.log('data:- ', data);
    } catch (error) {
        console.log('findOne error:- ', error);
    }
};

const fetchCategoryImage = async (req, res) => {
    try {
        const data = await Categories.findOne({ id: Number(req.params.id) });
        const pathName = path.join(__dirname, '..', 'uploads', 'category', data.category_img);
        return res.sendFile(pathName);
    } catch (error) {
        console.log('fetchCategoryImage error:- ', error);
    }
};

const deleteCategory = async (req, res) => {
    try {
        const store = req.body;
        const data = await Categories.updateOne({ id: Number(store.id) }, { is_deleted: false });
        return res.status(200).send({
            message: 'data deleted successfully',
            code: 200
        });
    } catch (error) {
        console.log('deleteCategory error:- ', error);
    }
};

module.exports = { add, findAll, findOne, fetchCategoryImage, deleteCategory };