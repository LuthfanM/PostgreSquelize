const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const app = express();
const db = require("./models");

var corsOption = {
    origin: "localhost:8081"
}

app.use(cors(corsOption));

app.use(express.json());

app.use(express.urlencoded({ extended: true }))

db.sequelize.sync({ force: true })
    .then(() => {
        console.log("drop abd Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

app.get("/", (req, res) => {
    res.json("App Connected")
})

require('./routes/index')(app)

const PORT = process.env.PORT || 8080
app.listen(PORT, console.log("APP CONNECTED " + PORT))