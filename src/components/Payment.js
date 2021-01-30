import React, { useState, useEffect } from 'react'
import './Payment.css'
import { useStateValue } from '../redux/StateProvider'
import CheckoutProduct from "./CheckoutProduct"
import { Link, useHistory } from "react-router-dom"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import CurrencyFormat from "react-currency-format"
import { getTotal } from "../redux/reducer/reducer"
import axios from '../axios'
import { db } from "../utils/config/firebase"

function Payment() {
    const [{ cart, user }, dispatch] = useStateValue()
    const history = useHistory()
    const stripe = useStripe()
    const elements = useElements()
    const [succeeded, setSucceeded] = useState(false)
    const [processing, setProcessing] = useState("")
    const [error, setError] = useState(null)
    const [disabled, setDisabled] = useState(true)
    const [clientSecret, setClientSecret] = useState(true)

    useEffect(() => {
        // generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // Stripe expects the total in a currencies subunits
                url: `/payments/create?total=${getTotal(cart) * 100}`
            })
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret()
    }, [cart])

    console.log('👱', user)

    const handleSubmit = async (event) => {
        // do all the fancy stripe stuff...
        event.preventDefault()
        setProcessing(true)
        await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            // paymentIntent: payment confirmation
            db
                .collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    cart: cart,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created
                })
            setSucceeded(true)
            setError(null)
            setProcessing(false)
            dispatch({
                type: 'EMPTY_BASKET'
            })
            history.replace('/orders')
        })
    }

    const handleChange = event => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty)
        setError(event.error ? event.error.message : "")
    }

    return (
        <div className='payment'>
            <div className='payment__container'>
                <h1>
                    Checkout (
                        <Link to="/checkout">{cart?.length} items</Link>
                        )
                </h1>
                {/* Payment section - delivery address */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment__address'>
                        <p>{user?.email}</p>
                        <p>Japn Tokyo</p>
                        <p>Adachi Shinden</p>
                    </div>
                </div>
                {/* Payment section - Review Items */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className='payment__items'>
                        {cart.map(item => (
                            <CheckoutProduct key={item.id}
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>
                {/* Payment section - Payment method */}
                <div className='payment__section'>
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className='payment__priceContainer'>
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <h3>Order Total: {value}</h3>
                                    )}
                                    decimalScale={2}
                                    value={getTotal(cart)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
