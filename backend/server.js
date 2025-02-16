"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var geminiControllers_1 = require("./controllers/geminiControllers");
var express = require('express');
var Cors = require('cors');
var app = express();
var port = 3001;
//this is for middleware
app.use(Cors()); // cors is used for security of browser
app.use(express.json());
app.listen(port, function () { return console.log("listening to port :  ".concat(port)); });
//an api for getting gemini response
app.post('/getGeminiResponse', geminiControllers_1.default);
