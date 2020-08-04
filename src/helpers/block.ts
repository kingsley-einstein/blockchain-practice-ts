import crypto from "crypto-js";
import { v4 as uuid } from "uuid";
import { Block } from "../data";

export class BlockCreator {
 block: Block;

 constructor(index: number, nonce: number, previousHash: string, data: any) {
  const id = uuid();
  const timestamp = Date.now();
  this.block = {
   id,
   index,
   nonce,
   previousHash,
   data,
   timestamp,
   hash: this.createHash(id, index, nonce, timestamp, previousHash, data)
  };
  this.block = this.mineBlock(this.block, 5);
 }

 private createHash(id: string, index: number, nonce: number, timestamp: number, previousHash: string, data: any): string {
  const encrypt = crypto.SHA256(id + index + nonce + timestamp + previousHash + JSON.stringify(data));
  return encrypt.toString();
 }

 private mineBlock(b: Block, difficulty: number) {
  while(b.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
   b.nonce = b.nonce + 1;
   b.hash = this.createHash(b.id, b.index, b.nonce, b.timestamp, b.previousHash, b.data);
  }
  return b;
 }

 getBlock(): Block {
  return this.block;
 }
}
