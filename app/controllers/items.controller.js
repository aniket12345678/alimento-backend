const add = (req, res) => {
    console.log('this is an add function');
    console.log('req.body:- ', req.body);
};

const findAll = (req, res) => {
    console.log('this is a findall function');
    console.log('req.body:- ', req.body);
};

const findOne = (req, res) => {
    console.log('this is a findone function');
    console.log('req.body:- ', req.body);
};

module.exports = { add, findAll, findOne };