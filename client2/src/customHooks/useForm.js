import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentStep, setShippingInfo, setBillingInfo } from '../redux/actions/userActions';


const useForm = (formFields) => {
    const dispatch = useDispatch();
    const [values, setValues] = useState(formFields);
    const [errors, setErrors] = useState({});
    const [errorMsg, setErrorMsg] = useState({}); // this field is responsible for displaying error only on first incorrect input

    function createModalEvent(message) {
        return new CustomEvent('modal_message', {
            detail: {
                message: message
            }
        });
    }
    const userItemsAmount = useSelector(state => {
        return state.chosenItems.length;
    });

    function handleInput(e) {
        setValues(prevState => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        });
    }

    function handleGoingToTheNextStep(e, currentStep) {
        e.preventDefault();
        setErrors({});
        if (validateInputs()) {
            switch (currentStep) {
                case 'shipping': { 
                        if (!userItemsAmount) {
                            document.getElementById('modal-root').dispatchEvent(createModalEvent('Add at least one item to your cart!'));
                            break;
                        } 
                        dispatch(setShippingInfo(values));
                        dispatch(setCurrentStep('billing'));  
                    }
                    break;
                case 'billing': { 
                        dispatch(setBillingInfo(values));
                        dispatch(setCurrentStep('payment'));
                    }   
                    break;
                case 'payment': { 
                        dispatch(setCurrentStep('success'));
                    }   
                    break;
                default: break;
            }
        }
    }

    function validateInputs() {
        let first_error_field = false;
        let correct = true;
        for (const value in values) {
            switch (value) {
                case 'email': {
                    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values[value])) {
                        setErrors(prevState => {
                            return {
                                ...prevState,
                                [value]: true
                            }
                        });
                        if (!first_error_field) {
                            setErrorMsg({[value]: 'Email is incorrect!'});
                            first_error_field = true;
                        } 
                        correct = false;
                    }
                }
                break;
                case 'recipientPhone' || 'ZIP' || 'cardCode': {
                    let inputString = values[value];
                    for (let i = 0; i < inputString?.length; i++) {
                        if (isNaN(+inputString[i])) {
                            setErrors(prevState => {
                                return {
                                    ...prevState,
                                    [value]: true
                                }
                            });
                            if (!first_error_field) {
                                setErrorMsg({[value]: 'This field cannot contain letters!'});
                                first_error_field = true;
                            } 
                            correct = false;
                        }
                    }
                }
                break;

            }
            if (!values[value]) {
                setErrors(prevState => {
                    return {
                        ...prevState,
                        [value]: true
                    }
                });
                if (!first_error_field) {
                    setErrorMsg({[value]: 'This field cannot be empty!'});
                    first_error_field = true;
                } 
                correct = false;
            }
        }
        return correct;
    }

    return { values, errors, handleInput, handleGoingToTheNextStep, setValues, errorMsg};
}

export { useForm };