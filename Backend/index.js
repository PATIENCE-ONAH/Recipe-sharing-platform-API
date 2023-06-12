const express = require('express');
const dotenv = require('dotenv');
const { dbConnection } = require('./config/connection');
const { routeManager } = require('./routes/routeMger');
const bodyParser = require('body-parser')
const app = express();
const port = 3000;
dotenv.config()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/', routeManager)

const startServer = async () => {
    try {
        // connect to the database
        dbConnection(process.env.ATLAS_URL);

        app.listen(port, () =>{
            console.log('server is running')
        })
        ;
    } catch (error) {
        console.log(error);
    }
};

startServer();
