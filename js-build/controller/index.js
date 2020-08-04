"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.MainController = void 0;
var uuid_1 = require("uuid");
var helpers_1 = require("../helpers");
var custom_1 = require("../custom");
var chain = new helpers_1.BlockChain();
var MainController = /** @class */ (function () {
    function MainController() {
    }
    MainController.generateUserId = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                try {
                    id = uuid_1.v4();
                    res.status(201).json({
                        code: 201,
                        response: id
                    });
                }
                catch (error) {
                    res.status(500).json({
                        code: 500,
                        response: error.message
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    MainController.createBlock = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var body, block, isValidChain, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        body = req.body;
                        return [4 /*yield*/, chain.addBlock({
                                owner: body.owner,
                                transactions: [{
                                        sender: body.owner,
                                        receiver: body.receiver,
                                        amount: body.amount
                                    }]
                            })];
                    case 1:
                        block = _a.sent();
                        return [4 /*yield*/, chain.chainIsValid()];
                    case 2:
                        isValidChain = _a.sent();
                        if (!isValidChain) {
                            throw new custom_1.CustomError(400, "Chain is not valid");
                        }
                        res.status(201).json({
                            code: 201,
                            response: block
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        res.status(error_1.code || 500).json({
                            code: error_1.code || 500,
                            response: error_1.message
                        });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MainController.getBlocks = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, chain.getBlocks()];
                    case 1:
                        response = _a.sent();
                        res.status(200).json({
                            code: 200,
                            response: response
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        res.status(500).json({
                            code: 500,
                            response: error_2.message
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MainController.findBlockById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        return [4 /*yield*/, chain.findBlockById(id)];
                    case 1:
                        response = _a.sent();
                        if (!response)
                            throw new custom_1.CustomError(404, "Block not found");
                        res.status(200).json({
                            code: 200,
                            response: response
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        res.status(error_3.code || 500).json({
                            code: error_3.code || 500,
                            response: error_3.message
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return MainController;
}());
exports.MainController = MainController;
