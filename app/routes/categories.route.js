const categoriesRoute = require('express')();

const { multerFn, verifyToken, joiMiddleware } = require('../enum/commonFunctions');
const upload = multerFn('category');

const {
    add, update, findAll,
    findOne, deleteCategory,
    fetchCategoryImage
} = require('../controllers/categories.controller');
const { validateCategory } = require('../validationSchema/schema');

categoriesRoute.post(
    '/add',
    [
        upload.single('attachments'), 
        joiMiddleware(validateCategory.add), 
        verifyToken
    ],
    add
);
categoriesRoute.post(
    '/update',
    [upload.single('attachments'), joiMiddleware(validateCategory.update), verifyToken],
    update
);
categoriesRoute.get('/find/all', verifyToken, findAll);
categoriesRoute.post('/find/one', verifyToken, findOne);
categoriesRoute.get('/img/:id', fetchCategoryImage);
categoriesRoute.post(
    '/delete',
    [joiMiddleware(validateCategory.delete), verifyToken],
    deleteCategory
);

module.exports = { categoriesRoute };