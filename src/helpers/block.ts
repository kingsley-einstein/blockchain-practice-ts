import crypto from "crypto-js";
import { Block } from "../data";

export class BlockCreator {
 block: Block;

 constructor(index: number, nonce: number, previousHash: string, data: any) {
  this.block = {
   index,
   nonce,
   previousHash,
   data,
   hash: this.createHash(index, nonce, previousHash, data)
  };
  this.block = this.mineBlock(this.block, 5);
 }

 private createHash(index: number, nonce: number, previousHash: string, data: any): string {
  const encrypt = crypto.SHA256(index + nonce + previousHash + JSON.stringify(data));
  return encrypt.toString();
 }

 private mineBlock(b: Block, difficulty: number) {
  while(b.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
   b.nonce = b.nonce + 1;
   b.hash = this.createHash(b.index, b.nonce, b.previousHash, b.data);
  }
  return b;
 }

 getBlock(): Block {
  return this.block;
 }
}
