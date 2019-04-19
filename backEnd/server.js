const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const morganImport = require ('morgan');
const jwt = require('jsonwebtoken');
const config = require("./config");
const routesAuth = require('./routes/routesAuth');
const routesData = require('./routes/routesData');
const mongoose = require('mongoose');

/*************
 * MiddleWare *
 **************/
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
app.use(morganImport('dev'));

const auth = express.Router();
const data = express.Router();

routesAuth(auth);
routesData(data);

//app.use('/api',api);
app.use(`${config.rootAPI}/auth`,auth);
app.use(`${config.rootAPI}/data`,data);

const port = config.port;

app.listen(port, () => {
    console.log(`listening on port ${port}`)

    mongoose.connect('mongodb://localhost/compteWebAppdatabase',{
        useNewUrlParser:true,
    });

    mongoose.connection
        .once('open',() => {
            console.log('connection mongoose établie');
        }).on('error',(error) => {
            console.log('Erreur durant la connextion',error);      
        })

});