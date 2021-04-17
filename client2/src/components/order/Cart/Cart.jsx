import React from 'react';
import ChosenProducts from '../ChosenProducts/ChosenProducts';
import Order from '../OrderBlock/OrderBlock';
import cart_styles from './Cart.module.scss';

function Cart() {
    return(
        <div className={cart_styles.generalWrapper}>
            <Order />
            <ChosenProducts />
        </div>
    )
}

export default Cart;