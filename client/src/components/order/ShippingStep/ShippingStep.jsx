import React, {useEffect, useState} from 'react';
import { useForm } from '../../../customHooks/useForm';
import steps_styles from '../Steps.module.scss';
import Stepper from '../Stepper/Stepper';
import { useSelector } from 'react-redux';
import Cleave from 'cleave.js/react';
import Modal from '../Modal/Modal';
import 'cleave.js/dist/addons/cleave-phone.ru';

function ShippingStep(props) {

    const userInfoIfExists = useSelector(state => {
        return state.userInfo.shippingInfo;
    });
    const {values, errors, handleInput, handleGoingToTheNextStep, errorMsg} = useForm(userInfoIfExists);    
    let chosenCountry = '';
    function renderCountriesOptions() {
        return props.countries.map(elem => {
            chosenCountry = elem;
            return <option value={elem} key={elem}>{elem}</option>
        });
    }
    const [regionCode, setRegionCode] = useState('ru'); // default value
    useEffect(() => {
        if (values.country) {
            import(`cleave.js/dist/addons/cleave-phone.us`)
            .then(() => {
                setRegionCode((values.country).toUpperCase());
                console.log('region code has set');
            })
            .catch(err => {
                console.log(err);
            });
        }
    }, [])

    return (
        <form className={steps_styles.generalWrapper}>
            <Stepper/>
            <Modal/>
            <div className={steps_styles.formWrapper}>
                <div className={steps_styles.formWrapper__title}>Shipping Info</div>
                <div className={`${steps_styles.formWrapper} ${steps_styles.m_20}`}>
                    <label className={steps_styles.formLabel}>Recipient</label>
                    {errorMsg?.recipientName && <div className={steps_styles.errorBlock}>{errorMsg?.recipientName}</div>}
                    <input name="recipientName" onChange={(e) => handleInput(e)} 
                        value={values.recipientName} placeholder="Full Name" className={errors.recipientName ? steps_styles.incorrectInput : null}/>
                    {errorMsg?.recipientPhone && <div className={steps_styles.errorBlock}>{errorMsg?.recipientPhone}</div>}
                    <div className={steps_styles.phoneWrapper}>
                        <Cleave name="recipientPhone" onChange={(e) => handleInput(e)} options={{phone: true, phoneRegionCode: regionCode}}
                            value={values.recipientPhone} placeholder="Daytime Phone" className={errors.recipientPhone ? steps_styles.incorrectInput : null}/>
                        <div>For deliver questions only</div>
                    </div>
                </div>
                {/* location block*/}
                <div className={`${steps_styles.formWrapper} ${steps_styles.m_20}`}>
                    <label className={steps_styles.formLabel}>Address</label>
                    {errorMsg?.streetAdress && <div className={steps_styles.errorBlock}>{errorMsg?.streetAdress}</div>}
                    <input name="streetAdress" onChange={(e) => handleInput(e)} value={values.streetAdress} 
                        placeholder="Street Address" className={errors.streetAdress ? steps_styles.incorrectInput : null}/>
                    {errorMsg?.building && <div className={steps_styles.errorBlock}>{errorMsg?.building}</div>}
                    <input name="building" onChange={(e) => handleInput(e)} value={values.building} 
                        placeholder="Apt, Suite, Bldg, Gate Code. (optional)" className={errors.building ? steps_styles.incorrectInput : null}/>
                    {errorMsg?.city && <div className={steps_styles.errorBlock}>{errorMsg?.city}</div>}
                    <input name="city" onChange={(e) => handleInput(e)} value={values.city} 
                        placeholder="City" className={errors.city ? steps_styles.incorrectInput : null}/>
                    <div className={steps_styles.countryInfoWrapper}>
                        <select className={steps_styles.mediumInput} name="country" onChange={(e) => handleInput(e)} value={values.country || chosenCountry} placeholder="Country">
                            {renderCountriesOptions()}
                        </select>
                        <input className={errors.streetAdress ? steps_styles.incorrectInput + ' ' + steps_styles.shortInput : steps_styles.shortInput} name="ZIP" type="number" onChange={(e) => handleInput(e)} 
                            value={values.ZIP} placeholder="ZIP"/>
                    </div>
                </div>
            </div>
            <button className={steps_styles.mediumInput} onClick={(e) => handleGoingToTheNextStep(e, 'shipping')}>Continue</button>
        </form>
    )
}

export default ShippingStep;