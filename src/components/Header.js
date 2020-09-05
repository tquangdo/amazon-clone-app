import React from 'react'
import "./Header.css"
import { Link } from "react-router-dom"
import SearchIcon from '@material-ui/icons/Search'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { useStateValue } from '../redux/StateProvider'
import { auth } from '../utils/config/firebase'

function Header() {
    const [{ cart, user }] = useStateValue()

    const onLogout = () => {
        if (user) {
            auth.signOut()
        }
    }

    return (
        <nav className="header">
            {/* Image */}
            <Link to="/">
                <img
                    className="header__logo"
                    src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
                    alt="amazon logo" />
            </Link>
            {/* Search box */}
            <div className="header__search">
                <input type="text" className="header__searchInput" />
                <SearchIcon className="header__searchIcon" />
            </div>
            {/* Three links */}
            <div className="header__nav">
                {/* 1st link */}
                <Link to={!user && "/login"} className="header__link">
                    <div onClick={onLogout} className="header__option">
                        <span className="header__optionLineOne">Xin chào {user?.email}</span>
                        <span className="header__optionLineTwo">{user ? 'Sign out' : 'Sign in'}</span>
                    </div>
                </Link>
                {/* 2nd link */}
                <Link to="/" className="header__link">
                    <div className="header__option">
                        <span className="header__optionLineOne">Trở lại</span>
                        <span className="header__optionLineTwo">& mua hàng</span>
                    </div>
                </Link>
                {/* 3rd link */}
                <Link to="/" className="header__link">
                    <div className="header__option">
                        <span className="header__optionLineOne">Tài khoản Prime</span>
                        <span className="header__optionLineTwo">của bạn</span>
                    </div>
                </Link>
                {/* 4th link */}
                <Link to="checkout" className="header__link">
                    <div className="header__optionCart">
                        <ShoppingCartIcon />
                        <span className="header__optionLineTwo header__basketCount">{cart?.length}</span>
                    </div>
                </Link>
            </div>

        </nav>
    )
}

export default Header