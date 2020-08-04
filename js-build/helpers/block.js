"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.BlockCreator = void 0;
var crypto_js_1 = __importDefault(require("crypto-js"));
var uuid_1 = require("uuid");
var BlockCreator = /** @class */ (function () {
    function BlockCreator(index, nonce, previousHash, data) {
        var id = uuid_1.v4();
        var timestamp = Date.now();
        this.block = {
            id: id,
            index: index,
            nonce: nonce,
            previousHash: previousHash,
            data: data,
            timestamp: timestamp,
            hash: this.createHash(id, index, nonce, timestamp, previousHash, data)
        };
        this.block = this.mineBlock(this.block, 5);
    }
    BlockCreator.prototype.createHash = function (id, index, nonce, timestamp, previousHash, data) {
        var encrypt = crypto_js_1["default"].SHA256(id + index + nonce + timestamp + previousHash + JSON.stringify(data));
        return encrypt.toString();
    };
    BlockCreator.prototype.mineBlock = function (b, difficulty) {
        while (b.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            b.nonce = b.nonce + 1;
            b.hash = this.createHash(b.id, b.index, b.nonce, b.timestamp, b.previousHash, b.data);
        }
        return b;
    };
    BlockCreator.prototype.getBlock = function () {
        return this.block;
    };
    return BlockCreator;
}());
exports.BlockCreator = BlockCreator;
