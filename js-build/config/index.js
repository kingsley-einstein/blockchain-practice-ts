"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var router_1 = __importDefault(require("../router"));
var morgan_1 = __importDefault(require("morgan"));
exports["default"] = (function (app) {
    app.use(express_1["default"].json());
    app.use(express_1["default"].urlencoded({
        extended: false
    }));
    app.use(morgan_1["default"]("dev"));
    app.use("/api/v1", router_1["default"]);
});
