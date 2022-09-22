const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server =  app.listen(PORT, () => {
    console.log(`Server listening on port ${server.address().port}`)
});

server.on('error', error => console.log(`Server error: ${error}`));