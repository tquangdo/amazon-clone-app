import React from 'react'
import './Subtotal.css'
import CurrencyFormat from "react-currency-format"
import { useStateValue } from '../redux/StateProvider'
import { getTotal } from '../redux/reducer/reducer'

function Subtotal() {
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
            <button>Tiến hành thanh toán</button>
        </div>
    )
}

export default Subtotal