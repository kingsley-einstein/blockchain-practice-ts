import { Transactions } from "./transaction";

export interface Block {
 id: string;
 index: number;
 nonce?: number;
 hash: string;
 previousHash: string;
 timestamp: number;
 data: {
  owner: string;
  transactions: Transactions;
 }
}

export type Blocks = Array<Block>;
