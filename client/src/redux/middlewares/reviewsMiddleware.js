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

export function sendReview(review, product_id, user, user_id, stars) {
    return dispatch => {
        let date = new Date();
        fetch('http://localhost:8000/api/reviews/leave_review', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                product_id: product_id,
                user_id: user_id,
                stars: stars,
                user: user,
                review: review,
                date: `${date.getUTCFullYear()}/${date.getUTCMonth() + 1}/${date.getUTCDate()}`
            })
        }).then(async function(res) {
            let review_obj = await res.json();
            if (res.status !== 201) {
                console.log(res);
            } else {
                console.log(review_obj);
                dispatch(leaveReview(review_obj.review, product_id));
            }
        }).catch(err => console.log(err));
    }
}