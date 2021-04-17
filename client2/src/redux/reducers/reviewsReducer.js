import * as actionTypes from '../actions/actionTypes';
import initialState from '../initialState';

export const reviewsReducer = (state = initialState.productReviews, action) => {
    switch(action.type) {
        case actionTypes.REVIEWS_ADD_REVIEWS: {
            console.log(state);
            for (const product_id in state) {
                if (product_id === action.payload.product_id) {
                    return {
                        ...state,
                        [product_id]: [...state[product_id], ...action.payload.reviews]
                    }
                }
            }
            return {
                ...state,
                [action.payload.product_id]: action.payload.reviews
            }
        }
        case actionTypes.REVIEWS_LEAVE_REVIEW: {
            if (state[action.payload.product_id]) {
                return {
                    ...state, 
                    [action.payload.product_id]: [...state[action.payload.product_id], action.payload.review]
                }
            } else {
                return {
                    ...state, 
                    [action.payload.product_id]: [action.payload.review]
                }
            }
        }
        default: return state;
    }
}