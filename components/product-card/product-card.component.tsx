import { Button } from "antd"
import { useEffect, useState } from "react"
import productCardStyle from "./product-card.module.css"

export default function ProductCard(props: any) {

    const [product, setProduct] = useState(props.product)

    useEffect(() => {
        let mount = true
        setProduct(props.product)
        return () => {
            mount = false
        }
    }, [props.product])

    return (
    <div className={productCardStyle.productContainer}>
        <div className={productCardStyle.productCard}>
            <img className={productCardStyle.productImg} src={product.imgUrl} alt={product.title}/>
            <div className={productCardStyle.productInfo}>
                <h1 className={productCardStyle.productTitle}>{product.title}</h1>
                <h1 className={productCardStyle.productPrice}>Price: {product.price} </h1>
                <h4 className={productCardStyle.productPrice}>Quantity {product.quantity} </h4>
                <h4 className={productCardStyle.productPrice}>Status {product.status} </h4>
                <hr/>
                <Button type="primary" onClick={props.onCreateTransaction}>Create Transaction</Button>
            </div> 
        </div>
    <hr/>
        <div className={productCardStyle.productDescription}><p>{product.description}</p></div>
    </div>
    )
}