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

 addBlock(data: { owner: string, transactions: Transactions }): Promise<Block> {
  const index = this.blocks[this.blocks.length - 1].index + 1;
  const previousHash = this.blocks[this.blocks.length - 1].hash;
  const creator = new BlockCreator(index, 0, previousHash, data);
  this.blocks = [...this.blocks, creator.getBlock()];
  return Promise.resolve(creator.getBlock());
 }

 // Recalculate hash to know if block has been tampered with
 private hashPure(b: Block): boolean {
  const encrypt = crypto.SHA256(b.id + b.index + b.nonce + b.timestamp + b.previousHash + JSON.stringify(b.data));
  return b.hash === encrypt.toString();
 }

 // Check if the chain is valid or genuine
 chainIsValid(): Promise<boolean> {
  for (let i = 1; i < this.blocks.length; i++) {
   const currentBlock = this.blocks[i];
   const previousBlock = this.blocks[i - 1];
   if (!this.hashPure(currentBlock)) return Promise.resolve(false);
   if (previousBlock.hash !== currentBlock.previousHash) return Promise.resolve(false);
  }
  return Promise.resolve(true);
 }

 getBlocks(): Promise<Blocks> {
  return Promise.resolve(this.blocks);
 }

 findBlockById(id: string): Promise<Block> {
  return Promise.resolve(
   this.blocks.find((b) => b.id === id)
  );
 }
}
