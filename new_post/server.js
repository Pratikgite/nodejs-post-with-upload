const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* DB Start */

const DB = require("./config/config");

mongoose.connect(DB.url, {
    useNewUrlParser: true,
}).then(() => {
    console.log("DB Connected");
}).catch((err) => {
    console.log("DB Error: ", err);
})

/* DB End */

app.get("/", (req, res) => {
    res.send("Hello World");
})

require("./app/Routes/PostRoute")(app);


app.listen(3001, () => {
    console.log("app is running on port:3001")
})