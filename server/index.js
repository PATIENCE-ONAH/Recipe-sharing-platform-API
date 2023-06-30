const express = require('express');
const dotenv = require('dotenv');
const { dbConnection } = require('./config/connection');
const { routeManager } = require('./routes/routeMger');
const bodyParser = require('body-parser');
// const { errorResponse } = require('./errors-Handler/client-error');
//const Cors = require('cors')
const app = express();
dotenv.config()
 
//app.use(Cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/', routeManager)
// app.use(errorResponse)

const startServer = async () => {
    try {
        // connect to the database
        dbConnection(process.env.ATLAS_URL);

        app.listen(process.env.PORT, () =>{
            console.log(`server is running on port ${process.env.PORT}`)
        })
        ;
    } catch (error) {
        console.log(error);
    }
};

startServer();
