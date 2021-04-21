import React from 'react';
import priceStyles from './PricesBlock.module.scss';


function PricesBlock(props) {
    return (
        <div>
            <div className={priceStyles.prices}>
                <div className={priceStyles.prices__subtotal}><p>Subtotal sum:</p> <p>{props.itemsSum + props.currency}</p></div>
                <div className={priceStyles.prices__shipping}><p>Shipping:</p> <p>{props.shipping ? props.shipping + props.currency : 'Free'}</p></div>
                <div className={priceStyles.prices__taxes}><p>Taxes:</p> <p>{(props.itemsSum * 0.13).toFixed(2) + props.currency}</p></div>
            </div>
            <div className={priceStyles.totalPrice}><p>Total sum:</p> <p>{Number(props.itemsSum * 0.13 + props.itemsSum).toFixed(2) + props.currency}</p></div>
        </div>
    );
}

export default PricesBlock;
