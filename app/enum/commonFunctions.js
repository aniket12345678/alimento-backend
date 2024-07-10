const { PrimaryIdTable } = require("../models/index.model");
const multer = require('multer');
const path = require('path');
// const jwt = process.env.JWTKEY;
const jwt = require('jsonwebtoken');

async function findPrimaryKey(tbl_name) {
    const findCollections = await PrimaryIdTable.findOne({ table_name: tbl_name });
    return findCollections;
}

async function fetchAutoincrementKey(tbl_name) {
    const findCollections = await findPrimaryKey(tbl_name);
    let output;
    if (findCollections) {
        await PrimaryIdTable.updateOne({ table_name: tbl_name }, { id: findCollections.id + 1 });
        output = await findPrimaryKey(tbl_name);
    } else {
        output = await PrimaryIdTable.create({ id: 1, table_name: tbl_name });
    }

    return output.id;
}

function multerFn(data) {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '..', 'uploads', data));
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + '-' + file.originalname);
        }
    });

    return multer({ storage: storage });
}

const verifyToken = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            throw { message: 'Auth token is missing', code: 401 };
        }
        const decoded = jwt.verify(authorization, process.env.JWTKEY);
        next();
    } catch (error) {
        return res.status(401).send(error)
    }
}

module.exports = { fetchAutoincrementKey, multerFn, verifyToken }