"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.BlockChain = void 0;
var crypto_js_1 = __importDefault(require("crypto-js"));
var block_1 = require("./block");
var BlockChain = /** @class */ (function () {
    function BlockChain() {
        this.blocks = [this.genesisBlock()];
    }
    BlockChain.prototype.genesisBlock = function () {
        var creator = new block_1.BlockCreator(1, 0, "00000", {
            owner: "",
            transactions: [{ sender: "", receiver: "", amount: 0 }]
        });
        return creator.getBlock();
    };
    BlockChain.prototype.addBlock = function (data) {
        var index = this.blocks[this.blocks.length - 1].index + 1;
        var previousHash = this.blocks[this.blocks.length - 1].hash;
        var creator = new block_1.BlockCreator(index, 0, previousHash, data);
        this.blocks = __spreadArrays(this.blocks, [creator.getBlock()]);
        return Promise.resolve(creator.getBlock());
    };
    // Recalculate hash to know if block has been tampered with
    BlockChain.prototype.hashPure = function (b) {
        var encrypt = crypto_js_1["default"].SHA256(b.id + b.index + b.nonce + b.timestamp + b.previousHash + JSON.stringify(b.data));
        return b.hash === encrypt.toString();
    };
    // Check if the chain is valid or genuine
    BlockChain.prototype.chainIsValid = function () {
        for (var i = 1; i < this.blocks.length; i++) {
            var currentBlock = this.blocks[i];
            var previousBlock = this.blocks[i - 1];
            if (!this.hashPure(currentBlock))
                return Promise.resolve(false);
            if (previousBlock.hash !== currentBlock.previousHash)
                return Promise.resolve(false);
        }
        return Promise.resolve(true);
    };
    BlockChain.prototype.getBlocks = function () {
        return Promise.resolve(this.blocks);
    };
    BlockChain.prototype.findBlockById = function (id) {
        return Promise.resolve(this.blocks.find(function (b) { return b.id === id; }));
    };
    return BlockChain;
}());
exports.BlockChain = BlockChain;
