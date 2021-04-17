import * as actionTypes from './actionTypes';

export const addProduct = (product) => {
    return {
        type: actionTypes.PRODUCTS_ADD_PRODUCT,
        payload: product
    }
}

export const addProducts = (products_list) => {
    return {
        type: actionTypes.PRODUCTS_ADD_PRODUCTS,
        payload: products_list
    }
} 