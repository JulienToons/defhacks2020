const express = require('express');
const app = express();
port = 3000;
app.get('/', function (req, res) { res.sendFile('./index.html', { root: dirname }); });
app.get('/', function (req, res) { res.sendFile('./index2.html', { root: dirname }); });
app.use('/public', express.static('public'));
app.listen(process.env.port || 3000);
console.log('Runnning on Port 3000');
