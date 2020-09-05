import React from 'react'
import Star from '@material-ui/icons/Star'
import * as actType from '../redux/action/actiontype'
import { useStateValue } from '../redux/StateProvider'
import './CheckoutProduct.css'

function CheckoutProduct({ id, title, price, rating, image }) {
    const [, dispatch] = useStateValue();

    const RemoveFromCart = () => {
        dispatch({
            type: actType.REMOVE_FROM_CART,
            id: id,
        })
    }

    return (
        <div className="checkoutProduct">
            <img src={image} className="checkoutProduct__image" alt="" />
            <div className="checkoutProduct__info">
                <p className="checkoutProduct__title">{title}</p>
                <p className="checkoutProduct__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="checkoutProduct__rating">
                    {Array(rating)
                        .fill()
                        .map((_, chiso) => (
                            <p key={chiso} ><Star className="product__star" /></p>
                        ))}
                </div>
                <button onClick={RemoveFromCart}>Xóa khỏi giỏ hàng</button>
            </div>
        </div>
    )
}

export default CheckoutProduct
