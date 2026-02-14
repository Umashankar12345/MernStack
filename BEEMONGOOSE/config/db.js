const express = require('express');

const mongoose = require('mongoose');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/BEE3')
.then(() => console.log("mongodb connect succesfuuly"))
.catch((err) => console.log(err));

app.listen(5000 , () => {
    console.log("server is running on port 5000");
})