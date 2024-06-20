const exApp = require('express')();
const PORT = 5000;

const { allRoutes } = require('./app/routes/index.route');
const { newConnection } = require('./app/config/connection');

exApp.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    newConnection().then((response) => {
        console.log('connection successfull');
    }).catch((err) => {
        console.log('err', err);
    });
});

exApp.get('/', (req, res) => {
    res.send({ message: 'Welcome to alimento' });
});

exApp.use('/api', allRoutes);