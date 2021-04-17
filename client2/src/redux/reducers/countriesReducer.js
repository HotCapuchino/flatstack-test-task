import { bindActionCreators } from 'redux';
import * as actionTypes from '../actions/actionTypes';
import initialState from '../initialState';

export function countryReducer(state = initialState.availableCountries, action) {
    switch(action.type) {
        case actionTypes.COUNTRIES_ADD_COUNTRY: {
            return [...state, action.payload];
        }
        case actionTypes.COUNTRIES_ADD_COUNTRIES: {
            return action.payload;
        }
        default: return state;
    }
}