import * as actionTypes from '../actions/actionTypes';
import initialState from '../initialState';

export function userReducer(state = initialState.userInfo, action) {
    let availableSteps = ['shipping', 'billing', 'payment', 'success'];
    switch(action.type) {
        case actionTypes.USER_SET_SHIPPING_INFO: {
            return {
                ...state,
                shippingInfo: action.payload
            }
        }
        case actionTypes.USER_SET_BILLING_INFO: {
            return {
                ...state,
                billingInfo: action.payload
            }
        }
        case actionTypes.USER_SET_CURRENT_STEP: {
            let validStep = availableSteps.find(item => {
                return item === action.payload.toLowerCase();
            }) || 'shipping'; 
            return {
                ...state,
                currentStep: validStep
            }
        }
        default: return state;
    }
}