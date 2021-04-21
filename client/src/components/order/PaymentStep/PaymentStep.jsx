import React, {useState} from 'react';
import steps_styles from '../Steps.module.scss';
import Stepper from '../Stepper/Stepper';
import {useForm} from '../../../customHooks/useForm';
import Cleave from 'cleave.js/react';
import Modal from '../Modal/Modal';

function PaymentStep() {

    const {values, handleInput, handleGoingToTheNextStep } = useForm({
        cardholderName: '',
        cardNumber: null,
        cardExpires: '',
        cardCode: null
    });
    const [cardType, setCardType] = useState(null);
    const [maxCVVLength, setMaxCVVLength] = useState(3);
    function handleDefineCardType(type) {
        switch(type) {
            case 'amex': setMaxCVVLength(4);
            break;
            default: setMaxCVVLength(3);
        }
        setCardType(type);
    }

    return (
        <form className={steps_styles.generalWrapper}>
            <Stepper/>
            <Modal/>
            <div className={steps_styles.formWrapper}>
                <div className={steps_styles.formWrapper__title}>Payment</div>
                <div className={steps_styles.securityDescription}>This is a secure 128-bit SSL encrypted payment</div>
                <label className={steps_styles.formLabel}>Cardholder Name</label>
                <input name="cardholderName" type="text" onChange={(e) => handleInput(e)} value={values.cardholderName}
                    className={steps_styles.longInput} placeholder="Name as it appears on your card"/>
                <label className={steps_styles.formLabel}>Card Number</label>
                <Cleave name="cardNumber" onChange={(e) => handleInput(e)} value={values.cardNumber} className={steps_styles.longInput} 
                    placeholder="Your credit card number" options={{creditCard: true, onCreditCardTypeChanged: (type) => handleDefineCardType(type)}}/>
                <div className={steps_styles.backSideInfoWrapper}>
                    <div>
                        <label className={steps_styles.formLabel}>Expire Date</label>
                        <Cleave name="cardExpires" onChange={(e) => handleInput(e)} value={values.cardExpires}
                             placeholder="MM/YY" options={{date: true, datePattern: ['m', 'y']}}/>
                    </div>
                    <div>
                        <label className={steps_styles.formLabel}>Security Code</label>
                        <Cleave name="cardCode" onChange={(e) => handleInput(e)} value={values.cardCode} type="password"
                            placeholder="CVV/CVV2" maxLength={maxCVVLength}/>
                    </div>
                </div>
            </div>
            <button className={steps_styles.mediumInput} onClick={(e) => handleGoingToTheNextStep(e, 'payment')}>Pay Securely</button>
        </form>
    )
}

export default PaymentStep;