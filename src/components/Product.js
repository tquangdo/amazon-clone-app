import React from 'react'
import './Product.css'
import Star from '@material-ui/icons/Star'
import * as actType from '../redux/action/actiontype'
import { useStateValue } from '../redux/StateProvider'
import { useHistory } from 'react-router-dom'

function Product({ id, title, price, rating, image }) {
    const [{ user }, dispatch] = useStateValue()
    const history = useHistory()

    const addToCart = () => {
        if (user) {
            dispatch({
                type: actType.ADD_TO_CART,
                itemOfCart: {
                    id,
                    title,
                    price,
                    rating,
                    image,
                },
            })
        } else {
            history.push('/login')
        }
    }

    return (
        <div className="product">
            <div className="product__info">
                <p>{title}</p>
                <p className="product__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="product__rating">
                    {/* Creating an array of size $rating */}
                    {Array(rating)
                        .fill()
                        .map((_, chiso) => (
                            <p key={chiso}>
                                <Star className="product__star" />
                            </p>
                        ))}
                </div>
            </div>
            <img src={image} alt="" />
            <button onClick={addToCart}>Thêm vô giỏ hàng</button>
        </div>
    )
}

export default Product 