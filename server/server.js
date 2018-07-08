const path = require('path');
const express = require('express');
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

const server = express();
server.use(express.static(publicPath));

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})

server.get('/hello', (req, res) => {
    res.send('Hello World');
});

module.exports.server = server;