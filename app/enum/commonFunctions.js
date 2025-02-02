const { PrimaryIdTable } = require("../models/index.model");
const multer = require('multer');
const path = require('path');
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
        if (!authorization.includes('Bearer')) {
            throw { message: 'Invalid auth token', code: 401 };
        }
        const mainToken = authorization.split(' ');
        const decoded = jwt.verify(mainToken[1], process.env.JWTKEY);
        next();
    } catch (error) {
        console.log('error:- ', error);
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
    try {
        return async (req, res, next) => {
            const { error } = schema.validate(req.body);
            if (error) {
                const joiErrMessage = error.details.map((x) => x.message);
                operationHandler.handleError(res, error, 'Validation error');
            }
            else {
                next();
            }
        }
    } catch (error) {
        operationHandler.handleError(res, error, 'some error occured')
    }
}

function randomCodeGenerator(limit) {
    let arr = [
        ...Array(26).fill(0).map((_, i) => String.fromCharCode(i + 65)),
        ...Array(26).fill(0).map((_, i) => String.fromCharCode(i + 96)),
        ...Array(8).fill(0).map((_, i) => i + 1)
    ];
    let html = '';
    for (let i = 0; i < limit; i++) {
        html += arr[Math.floor(1 + Math.random() * 58)];
    }
    return html;
}

module.exports = {
    fetchAutoincrementKey,
    multerFn, verifyToken,
    joiMiddleware, operationHandler,
    randomCodeGenerator
}