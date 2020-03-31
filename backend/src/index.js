const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

//Securtiy the origin of request. Empty for development. 
app.use(cors({
    //origin: 'http://....'
}));

//Get the request body as json 
app.use(express.json());

app.use(routes);

//Start the server on port 3333
app.listen(3333);