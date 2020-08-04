"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var config_1 = __importDefault(require("./config"));
// console.log("In app");
var app = express_1["default"]();
config_1["default"](app);
var port = process.env.PORT || 4444;
app.listen(port, function () {
    console.log("App is running on port " + port);
});
