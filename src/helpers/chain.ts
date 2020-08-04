import crypto from "crypto-js";
import { Block, Blocks, Transactions } from "../data";
import { BlockCreator } from "./block";

export class BlockChain {
 blocks: Blocks;

 constructor() {
  this.blocks = [this.genesisBlock()];
 }

 genesisBlock(): Block {
  const creator = new BlockCreator(1, 0, "00000", {
   owner: "",
   transactions: [{ sender: "", receiver: "", amount: 0 }]
  });
  return creator.getBlock();
 }

 addBlock(data: { owner: string, transactions: Transactions }) {
  const index = this.blocks[this.blocks.length - 1].index + 1;
  const previousHash = this.blocks[this.blocks.length - 1].hash;
  const creator = new BlockCreator(index, 0, previousHash, data);
  this.blocks = [...this.blocks, creator.getBlock()];
  return creator.getBlock();
 }

 // Recalculate hash to know if block has been tampered with
 private hashPure(b: Block): boolean {
  const encrypt = crypto.SHA256(b.index + b.nonce + b.previousHash + JSON.stringify(b.data));
  return b.hash === encrypt.toString();
 }

 // Check if the chain is valid or genuine
 chainIsValid(): boolean {
  for (let i = 1; i < this.blocks.length; i++) {
   const currentBlock = this.blocks[i];
   const previousBlock = this.blocks[i - 1];
   if (!this.hashPure(currentBlock)) return false;
   if (previousBlock.hash !== currentBlock.previousHash) return false;
  }
  return true;
 }
}
