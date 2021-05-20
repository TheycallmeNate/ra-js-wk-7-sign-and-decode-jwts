const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

app.listen(5000, () => console.log("app started"));
