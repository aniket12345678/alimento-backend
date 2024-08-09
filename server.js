require('dotenv').config();
const exApp = require('express')();
const cors = require('cors')
exApp.use(cors());

const bodyParser = require('body-parser');

exApp.use(bodyParser.json());
exApp.use(bodyParser.urlencoded({ extended: true }))

const { allRoutes } = require('./app/routes/index.route');
const { newConnection } = require('./app/config/connection');

exApp.listen(process.env.PORT, () => {
    console.log(`Server is running on ${process.env.PORT}`);
    newConnection().then((response) => {
        console.log('connection made successfull');
    }).catch((err) => {
        console.log('err', err);
    });
});

exApp.get('/', (req, res) => {
    res.send({ message: 'Welcome to alimento' });
});

exApp.use('/api', allRoutes);