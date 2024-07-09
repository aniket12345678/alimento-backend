const items_route = require('express')();

const { multerFn } = require('../enum/commonFunctions');
const upload = multerFn('item');

const {
    add,
    findAll,
    findOne,
    deleteItem,
    fetchItemImage
} = require('../controllers/items.controller');

items_route.post('/add', upload.single('attachments'), add);
items_route.post('/find/all', findAll);
items_route.post('/find/one', findOne);
items_route.get('/img/:id', fetchItemImage);
items_route.post('/delete', deleteItem);

module.exports = { items_route }