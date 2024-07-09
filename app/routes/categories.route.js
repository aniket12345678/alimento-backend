const categories_route = require('express')();

const { multerFn } = require('../enum/commonFunctions');
const upload = multerFn('category');

const {
    add,
    findAll,
    findOne,
    fetchCategoryImage,
    deleteCategory
} = require('../controllers/categories.controller');

categories_route.post('/add', upload.single('attachments'), add);
categories_route.get('/find/all', findAll);
categories_route.post('/find/one', findOne);
categories_route.get('/img/:id', fetchCategoryImage);
categories_route.post('/delete', deleteCategory);

module.exports = { categories_route };