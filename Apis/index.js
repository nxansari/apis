const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const iotRoute = require('./route/iot');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(iotRoute);

app.listen(port, () => console.log(`App listening on port ${port}!`));