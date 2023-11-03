const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* Database Connection */

const db = require('./config/database.config');

// mongoose.Promise = global.Promise;

mongoose.connect(db.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("DB Connected Successfully");
}).catch((err) => {
    console.log("Error: ",err);
});

/* Database Connection */

app.get("/", (req, res) => {
    res.json({"msg": "Hello There"});
})

require('./app/routes/note.routes')(app);
require('./app/routes/post.routes')(app);

app.listen(3000, () => {
    console.log("Server is running on Port: 3000");
});