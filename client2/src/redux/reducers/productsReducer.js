import * as actionTypes from '../actions/actionTypes';
import initialState from '../initialState';

export function productsReducer(state = initialState.products, action) {
    switch(action.type) {
        case actionTypes.PRODUCTS_ADD_PRODUCT: {
            let {id, name, picture, description, price, currency, color, quantity} = action.payload; 
            return [
                ...state,
                {
                    id,
                    name,
                    picture, 
                    description, 
                    price,
                    currency, 
                    color, 
                    quantity
                }
            ];
        }
        case actionTypes.PRODUCTS_ADD_PRODUCTS: {
            return action.payload;
        }
        default: return state;
    } 
}