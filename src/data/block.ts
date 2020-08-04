import { Transactions } from "./transaction";

export interface Block {
 index: number;
 nonce?: number;
 hash: string;
 previousHash: string;
 data: {
  owner: string;
  transactions: Transactions;
 }
}

export type Blocks = Array<Block>;
