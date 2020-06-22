const express = require('express');
const app = express();
var path = require("path");
var __dirname = path.resolve();
port = 3000;
app.get('/', function (req, res) { res.sendFile('./index_real.html', { root: __dirname }); });
app.use('/public', express.static('public'));
app.listen(process.env.port || 3000);
console.log('Runnning on Port 3000');
