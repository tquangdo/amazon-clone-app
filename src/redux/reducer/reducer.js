import * as actType from '../action/actiontype'

export const myInitialState = {
    cart: [],
    user: null,
}

// selector
export const getTotal = arg_cart => (
    arg_cart?.reduce((amount, itemOfCart) => itemOfCart.price + amount, 0)
    //nghĩa là return amount += itemOfCart.price
    // ",0" nghĩa là inital value of amount = 0
)

const myReducer = (state, action) => {
    switch (action.type) {
        case actType.SET_USER:
            return {
                ...state,
                user: action.user,
            }
        case actType.ADD_TO_CART:
            return {
                ...state,
                cart: [...state.cart, action.itemOfCart],
            }
        case actType.REMOVE_FROM_CART:
            let newCart = [...state.cart]
            const index = state.cart.findIndex(
                (cartItem) => cartItem.id === action.id
            )
            if (index >= 0) {
                newCart.splice(index, 1)
            } else {
                console.warn(
                    `KO thể xóa sản phẩm (id: ${action.id})`
                )
            }
            return { ...state, cart: newCart }
        default:
            return state
    }
}

export default myReducer