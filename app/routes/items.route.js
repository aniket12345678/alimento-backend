const itemsRoute = require('express')();

const { multerFn, verifyToken } = require('../enum/commonFunctions');
const upload = multerFn('item');

const {
    add, findAll, findOne,
    deleteItem, fetchItemImage, update
} = require('../controllers/items.controller');

itemsRoute.post('/add', [upload.single('attachments'), verifyToken], add);
itemsRoute.post('/update', [upload.single('attachments'), verifyToken], update);
itemsRoute.post('/find/all', verifyToken, findAll);
itemsRoute.post('/find/one', verifyToken, findOne);
itemsRoute.get('/img/:id', fetchItemImage);
itemsRoute.post('/delete', verifyToken, deleteItem);

module.exports = { itemsRoute }