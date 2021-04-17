import * as actionTypes from './actionTypes';

export const setShippingInfo = (shipping_info) => {
    return {
        type: actionTypes.USER_SET_SHIPPING_INFO,
        payload: shipping_info
    }
}

export const setBillingInfo = (billing_info) => {
    return {
        type: actionTypes.USER_SET_BILLING_INFO,
        payload: billing_info
    }
}

export const setCurrentStep = (currentStep) => {
    return {
        type: actionTypes.USER_SET_CURRENT_STEP,
        payload: currentStep
    }
}