export interface ITransaction {
    id: number,
    productId: number,
    type: string,
    transactionAmount: number,
    productQuantity: number,
    timestamp: Date
}

export enum TransactionType {
    SELL = "Sell",
    ADD = "Add"
}