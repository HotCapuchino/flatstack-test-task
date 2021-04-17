import React from 'react';


function PricesBlock(props) {
    return (
        <>
            <div className="prices">
                <div className="prices__subtotal">Subtotal sum: {props.itemsSum + props.currency}</div>
                <div className="prices__shipping">Shipping: {props.shipping ? props.shipping + props.currency : 'Free'}</div>
                <div className="prices__taxes">Taxes: {(props.itemsSum * 0.13).toFixed(2) + props.currency}</div>
            </div>
            <hr/>
            <div className="total-price">Total sum: {Number(props.itemsSum * 0.13 + props.itemsSum).toFixed(2) + props.currency}</div>
        </>
    )
}

export default PricesBlock;
