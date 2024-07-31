const categories_route = require('express')();

const { multerFn, verifyToken, joiMiddleware } = require('../enum/commonFunctions');
const upload = multerFn('category');

const {
    add, update, findAll,
    findOne, deleteCategory,
    fetchCategoryImage
} = require('../controllers/categories.controller');
const { validateCategory } = require('../validationSchema/schema');

categories_route.post(
    '/add',
    [
        upload.single('attachments'), 
        joiMiddleware(validateCategory.add), 
        verifyToken
    ],
    add
);
categories_route.post(
    '/update',
    [upload.single('attachments'), joiMiddleware(validateCategory.update), verifyToken],
    update
);
categories_route.get('/find/all', verifyToken, findAll);
categories_route.post('/find/one', verifyToken, findOne);
categories_route.get('/img/:id', fetchCategoryImage);
categories_route.post(
    '/delete',
    [joiMiddleware(validateCategory.delete), verifyToken],
    deleteCategory
);

module.exports = { categories_route };