const { PrimaryIdTable } = require("../models/index.model");
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const Joi = require("joi");

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

const operationHandler = {
    handleSuccess: (res, data, message) => {
        return res.status(200).send({
            message: message,
            data: data,
            code: 200
        });
    },
    handleError: (res, error, message) => {
        console.log(`${message}:- ${error}`);
        return res.status(500).send({
            message: message,
            code: 500
        })
    }
}

const joiMiddleware = (schema) => {
    return async (req, res, next) => {
        // req.body.name = 'aniket';
        const { error } = schema.validate(req.body);
        if (error) {
            const joiErrMessage = error.details.map((x) => x.message);
            operationHandler.handleError(res, error, joiErrMessage)
        }
        next();
    }
}

module.exports = { fetchAutoincrementKey, multerFn, verifyToken, joiMiddleware, operationHandler }