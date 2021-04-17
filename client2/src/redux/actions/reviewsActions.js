import * as actionTypes from './actionTypes';

export const addReviews = (reviews, product_id) => {
    console.log(reviews);
    return {
        type: actionTypes.REVIEWS_ADD_REVIEWS,
        payload: {
            reviews: reviews,
            product_id: product_id
        }
    }
}

export const leaveReview = (review, product_id) => {
    return {
        type: actionTypes.REVIEWS_LEAVE_REVIEW,
        payload: {
            review: review,
            product_id: product_id
        }
    }
}