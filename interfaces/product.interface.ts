export interface IProduct {
    id: number,
    imgUrl: string,
    title: string,
    quantity: number,
    price: number,
    description: string,
    status: string,
    transaction: Array<{buy: Number, sell: Number}>
}

export enum ProductStatus {
    OPEN = "OPEN",
    CLOSE = "CLOSE"
}