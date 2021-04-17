import { addProducts } from '../actions/productActions';
import {addReviews, leaveReview} from '../actions/reviewsActions';

export function fetchReviews(product_id) {
    return dispatch => {
        fetch('http://localhost:8000/api/reviews/get_reviews', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({product_id: product_id})
        }).then(async function(res) {
            if (res.status === 200) {
                let requested_reviews = await res.json();
                console.log(requested_reviews);
                dispatch(addReviews(requested_reviews.reviews, product_id));
            } else {
                throw Error(res.text);
            }
        }).catch(err => {
            dispatch({type: 'do_nothing'});
            console.log(err);
        });
    }    
}

export function sendReview(review, product_id) {
    return dispatch => {
        fetch('http://localhost:8000/api/reviews/get_reviews', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({review: review, product_id: product_id})
        }).then(async function(res) {
            if (res.status !== 201) {
                console.log(res);
            } else {
                dispatch(leaveReview(review, product_id));
            }
        }).catch(err => console.log(err));
    }
}