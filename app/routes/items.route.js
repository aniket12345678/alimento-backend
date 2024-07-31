const items_route = require('express')();

const { multerFn, verifyToken } = require('../enum/commonFunctions');
const upload = multerFn('item');

const {
    add, findAll, findOne,
    deleteItem, fetchItemImage, update
} = require('../controllers/items.controller');

items_route.post('/add', [upload.single('attachments'), verifyToken], add);
items_route.post('/update', [upload.single('attachments'), verifyToken], update);
items_route.post('/find/all', verifyToken, findAll);
items_route.post('/find/one', verifyToken, findOne);
items_route.get('/img/:id', fetchItemImage);
items_route.post('/delete', verifyToken, deleteItem);

module.exports = { items_route }