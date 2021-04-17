import React from 'react';
import order_styles from './Order.module.scss';
import ShippingStep from '../ShippingStep/ShippingStep.jsx';
import BillingStep from '../BillingStep/BillingStep.jsx';
import PaymentStep from '../PaymentStep/PaymentStep.jsx';
import SuccessStep from '../SuccessStep/SuccessStep.jsx';
import { useSelector } from 'react-redux';

function Order() {
    const step = useSelector(state => {
        return state.userInfo.currentStep;
    });
    const countries = useSelector(state => {
        return state.availableCountries;
    });

    function renderStep() {
        switch (step) {
            case 'shipping': return <ShippingStep countries={countries}/>;
            case 'billing': return <BillingStep countries={countries}/>;
            case 'payment': return <PaymentStep/>;
            case 'success': return <SuccessStep/>;
            default: break;
        }
    } 

    return(
        <div className={order_styles.generalWrapper}>
            {renderStep()}
        </div>
    );
}

export default Order;
