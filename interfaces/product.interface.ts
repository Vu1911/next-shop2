export interface IProduct {
    _id: number,
    imgUrl: string,
    title: string,
    quantity: number,
    price: number,
    description: string,
    status: string,
    transaction: Array<{transType: TransType, volume: number, quantity: number, time: Date}>
}

export enum ProductStatus {
    OPEN = "OPEN",
    CLOSE = "CLOSE"
}

export enum TransType {
    BUY = "Buy",
    SELL = "Sell"
}
