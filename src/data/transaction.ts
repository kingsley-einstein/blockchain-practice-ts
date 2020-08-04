export interface Transaction {
 sender: string;
 receiver: string;
 amount: number;
}

export type Transactions = Array<Transaction>;
