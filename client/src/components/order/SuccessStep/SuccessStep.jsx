import React from 'react';
import step_style from './SuccessStep.module.scss';
import {useSelector} from 'react-redux';

function SuccessStep() {

    const email = useSelector(state => {
        return state.userInfo.billingInfo.email;
    });

    function calculateDeliveryDay() {
        return 'Friday 1st April 2021';
    }

    return (
        <div className={step_style.success}>
            <h1 className={step_style.success__title}>Thank you for your order!</h1>
            <div className={step_style.success__orderNumber}><b>Order number is: {Date.now() % 100000000    }</b></div>
            <div className={step_style.success__emailConfirmation}>You will receive an 
                email confirmation shortly to <span className={step_style.userEmail}>{email}</span></div>
            <div className={step_style.success__estimatedDelivery}>Estimated delivery Day is: 
                <b>{calculateDeliveryDay()}</b></div>
            <button className={step_style.success__printRecipe}>Print Recipe</button>
        </div>
    );
}

export default SuccessStep;