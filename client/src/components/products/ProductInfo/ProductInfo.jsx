import React, { useEffect, useState } from 'react';
import productInfoStyles from './ProductInfo.module.scss';
import Review from '../ProductReview/ProductReview';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews, sendReview } from '../../../redux/middlewares/reviewsMiddleware';

function ProductInfo(props) {

    const dispatch = useDispatch();
    let totalRating = localStorage.getItem(props.item.id) || null;
    useEffect(() => {
        dispatch(fetchReviews(props.item.id));
    }, []);
    const reviews = useSelector(state => {
        if (!state.productReviews[props.item.id]) {
            return null;
        }
        return state.productReviews[props.item.id];
    });
    const userInfo = useSelector(state => {
        return state.userInfo.shippingInfo;
    });
    const [userReview, setUserReview] = useState('');

    function renderReview() {
        if (!reviews) return;
        let stars_amount = 0;
        let reviews_amount = reviews.length;
        let reviews_layout = reviews.map(review => {
            stars_amount += review.stars;
            return (
                <li key={review.review_id}>
                    <Review review={review} />
                </li>
            );
        });
        localStorage.setItem(props.item.id, stars_amount / reviews_amount);
        return reviews_layout;
    }

    function handleChangeTextarea(event) {
        setUserReview(event.target.value);
    }

    function handleAddingReview() {
        console.log(userReview);
        dispatch(sendReview(
            userReview,
            props.item.id,
            {
                name: userInfo.recipientName || 'unknown',
                country: userInfo.country,
                using_time: 'month'
            })
        );
        setUserReview('');
    }

    return (
        <div className={productInfoStyles.productInfoBlock}>
            <button className={productInfoStyles.productInfoBlock__close}
                onClick={() => props.closeProductInfo(false)}>close</button>
            <div className={productInfoStyles.productSpecs}>
                <img src={`/images/${props.item.picture}`} alt="there should be a picture" />
                <div className={productInfoStyles.productDescription}>
                    <div>{props.item.name}</div>
                    <div>{props.item.description}</div>
                    <div>{props.item.price} {props.item.currency}</div>
                </div>
            </div>
            <div className={productInfoStyles.ratingsBlock}>
                <div>Product Rating: {(+totalRating).toFixed(2)}</div>
            </div>
            <div className={productInfoStyles.reviewsBlock}>
                <textarea className={productInfoStyles.reviewsBlock__reviewText}
                    onChange={(e) => handleChangeTextarea(e)} value={userReview}
                    placeholder="Leave your review here"></textarea>
                <button onClick={handleAddingReview} className={productInfoStyles.reviewsBlock__leaveReview}>Leave Review</button>
            </div>
            <ul className={productInfoStyles.reviewsList}>
                {renderReview()}
            </ul>
        </div>
    )
}

export default ProductInfo;