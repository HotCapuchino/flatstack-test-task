import React from 'react';
import steps_styles from '../Steps.module.scss';
import Stepper from '../Stepper/Stepper';
import { useForm } from '../../../customHooks/useForm';
import { useSelector } from 'react-redux';
import Modal from '../Modal/Modal';

function BillingStep() {

    const userInfoIfExists = useSelector(state => {
        return state.userInfo.billingInfo;
    });
    const shippingValues = useSelector(state => {
        return state.userInfo.shippingInfo;
    });
    const { values, errors, handleInput, handleGoingToTheNextStep, setValues, errorMsg} = useForm(userInfoIfExists);

    function FillInShippingInfo() {
        let new_values = {
            fullName: shippingValues.recipientName,
            email: values.email,
            streetAdress: shippingValues.streetAdress,
            building: shippingValues.building,
            city: shippingValues.city,
            country: shippingValues.country,
            ZIP: shippingValues.ZIP
        };
        setValues(new_values);
    }

    return (
        <form className={steps_styles.generalWrapper}>
            <Stepper/>
            <Modal/>
            <div className={steps_styles.formWrapper}>
                <div className={steps_styles.titleWrapper}>
                    <span className={steps_styles.formWrapper__title}>Billing Information</span>
                    <span onClick={FillInShippingInfo}>Same as shipping</span>
                </div>
                <div className={`${steps_styles.formWrapper} ${steps_styles.m_20}`}>
                    <label className={steps_styles.formLabel}>Recipient</label>
                    {errorMsg?.fullName && <div className={steps_styles.errorBlock}>{errorMsg?.fullName}</div>}
                    <input name="fullName" onChange={(e) => handleInput(e)} value={values.fullName} 
                        placeholder="Full Name" className={errors.fullName ? steps_styles.incorrectInput : null}/>
                    {errorMsg?.email && <div className={steps_styles.errorBlock}>{errorMsg?.email}</div>}
                    <input name="email" type="email" onChange={(e) => handleInput(e)} value={values.email} 
                        placeholder="Email Address" className={errors.email ? steps_styles.incorrectInput : null}/>
                </div>
                {/* location block*/}
                <div className={`${steps_styles.formWrapper} ${steps_styles.m_20}`}>
                    <label className={steps_styles.formLabel}>Billing Address</label>
                    {errorMsg?.streetAdress && <div>{errorMsg?.streetAdress}</div>}
                    <input name="streetAdress" onChange={(e) => handleInput(e)} value={values.streetAdress} 
                        placeholder="Street Address" className={errors.streetAdress ? steps_styles.incorrectInput : null}/>
                    {errorMsg?.building && <div className={steps_styles.errorBlock}>{errorMsg?.building}</div>}
                    <input name="building" onChange={(e) => handleInput(e)} value={values.building} 
                        placeholder="Apt, Suite, Bldg, Gate Code. (optional)" className={errors.building ? steps_styles.incorrectInput : null}/>
                    {errorMsg?.city && <div className={steps_styles.errorBlock}>{errorMsg?.city}</div>}
                    <input name="city" onChange={(e) => handleInput(e)} value={values.city} 
                        placeholder="City" className={errors.city ? steps_styles.incorrectInput : null}/>
                    <div className={steps_styles.countryInfoWrapper}>
                        <select className={steps_styles.w_60} name="country" onChange={(e) => handleInput(e)} placeholder="Country">
                            <option value="Russia">Russia</option>
                            <option value="USA">USA</option>
                        </select>
                        <input className={errors.streetAdress ? steps_styles.incorrectInput + ' ' + steps_styles.w_30 : steps_styles.w_30} 
                            name="ZIP" onChange={(e) => handleInput(e)} value={values.ZIP} placeholder="ZIP" />
                    </div>
                </div>
            </div>
            <button className={steps_styles.w_60} onClick={(e) => handleGoingToTheNextStep(e, 'billing')}>Continue</button>
        </form>
    )
}

export default BillingStep;