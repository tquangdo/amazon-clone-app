import React from 'react'
import './Subtotal.css'
import CurrencyFormat from "react-currency-format"
import { useStateValue } from '../redux/StateProvider'
import { getTotal } from '../redux/reducer/reducer'
import { useHistory } from 'react-router-dom'

function Subtotal() {
    const history = useHistory()
    const [{ cart }] = useStateValue()
    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText={value => (
                    <>
                        <p>
                            Tổng tiền ({cart.length} items): <strong>{`${value}`}</strong>
                        </p>
                        <small className="subtotal__gift">
                            <input type="checkbox" /> Hãy gói bao làm quà tặng
                        </small>
                    </>
                )}
                decimalScale={2}
                value={getTotal(cart)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
            <button onClick={() => history.push('/payment')}>Tiến hành thanh toán</button>
        </div>
    )
}

export default Subtotal