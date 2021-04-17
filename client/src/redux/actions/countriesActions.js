import * as actionTypes from './actionTypes';

export const addCountry = (country) => {
    return {
        type: actionTypes.COUNTRIES_ADD_COUNTRY,
        payload: country
    }
}

export const addCountries = (countries) => {
    return {
        type: actionTypes.COUNTRIES_ADD_COUNTRIES,
        payload: countries
    }
} 