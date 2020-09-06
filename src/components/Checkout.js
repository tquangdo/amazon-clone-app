import React, { useEffect } from 'react'
import { useStateValue } from '../redux/StateProvider'
import './Checkout.css'
import CheckoutProduct from './CheckoutProduct'
import Subtotal from './Subtotal'
import { useHistory } from 'react-router-dom'

function Checkout() {
    const [{ user, cart }] = useStateValue()
    const history = useHistory()
    useEffect(() => {
        if (!user) {
            history.push('/login')
        }
    }, [user, history])
    return (
        <div className="checkout">
            <div className="checkout__left">
                <img
                    className="checkout__ad"
                    src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
                    alt=""
                />
                {cart?.length === 0 ? (
                    <div>
                        <h2 className="checkout__title">Giỏ hàng Amazon của bạn đang rỗng</h2>
                        <img
                            className="checkout__emptyImg"
                            src="https://m.media-amazon.com/images/G/01/cart/empty/kettle-desaturated._CB445243794_.svg"
                            alt=""
                        />
                    </div>
                ) : (
                        <div>
                            <h2 className="checkout__title">Sản phẩm trong giỏ hàng:</h2>
                            {cart.map((cart_item, chiso) => (
                                <CheckoutProduct
                                    key={chiso}
                                    id={cart_item.id}
                                    title={cart_item.title}
                                    rating={cart_item.rating}
                                    price={cart_item.price}
                                    image={cart_item.image}
                                />
                            ))}
                        </div>
                    )}
            </div>
            {cart.length > 0 && (
                <div className="checkout__right">
                    <Subtotal />
                </div>
            )}
        </div>
    )
}

export default Checkout