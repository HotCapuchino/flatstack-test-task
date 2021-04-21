import React, { useEffect, useState } from 'react';
import productInfoStyles from './ProductInfo.module.scss';
import Review from '../ProductReview/ProductReview';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews, sendReview } from '../../../redux/middlewares/reviewsMiddleware';
import { Rating } from '@material-ui/lab';

function ProductInfo(props) {

    const dispatch = useDispatch();
    let totalRating = localStorage.getItem(props.item.id) || null;
    let reviewsAmount = localStorage.getItem(`${props.item.id}review`) || 0;
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
    const [userRating, setUserRating] = useState(null);
    const [reviewError, setReviewError] = useState(false);
    const [ratingsError, setRatingsError] = useState(false);
    const [secondTitleVisibility, setSecondTitleVisibility] = useState(false);
    useEffect(() => {
        dispatch(fetchReviews(props.item.id));
        window.addEventListener('resize', handleWindowResizing);
        return () => {
            window.removeEventListener('resize', handleWindowResizing);
        }
    }, []);
    useEffect(() => {
        if (ratingsError) {
            setTimeout(() => {
                setRatingsError(false);
            }, 1000);
        }
    }, [ratingsError]);
    useEffect(() => {
        if (reviewError) {
            setTimeout(() => {
                setReviewError(false);
            }, 1000);
        }
    }, [reviewError]);

    function renderReview() {
        if (!reviews) return;
        let stars_amount = 0;
        let reviews_amount = reviews.length;
        let reviews_layout = reviews.map(review => {
            stars_amount += +review.stars;
            return (
                <li key={review.review_id}>
                    <Review review={review} />
                </li>
            );
        });
        localStorage.setItem(`${props.item.id}review`, reviews_amount);
        localStorage.setItem(props.item.id, stars_amount / reviews_amount);
        return reviews_layout;
    }

    function handleAddingReview() {
        if (!userReview) {
            setReviewError(true);
        }
        if (!userRating) {
            setRatingsError(true);
        }
        if (!userReview || !userRating) return;
        dispatch(sendReview(
            userReview,
            props.item.id,
            {
                name: userInfo.recipientName || 'unknown',
                country: userInfo.country,
                using_time: 'month'
            }, 99, userRating)
        );
        setUserReview('');
        setUserRating(null);
    }

    function handleChangingRating(event) {
        setRatingsError(false);
        setUserRating(event.target.value);
    }

    function handleWindowResizing() {
        if (window.innerWidth <= 480) {
            setSecondTitleVisibility(true);
        } else {
            setSecondTitleVisibility(false);
        }
    }

    return (
        <div className={productInfoStyles.productInfoBlock}>
            <button className={productInfoStyles.productInfoBlock__close}
                onClick={() => props.closeProductInfo(false)}>close</button>
            <div className={productInfoStyles.productSpecs}>
                <div className={secondTitleVisibility ? productInfoStyles.productDescription__name : 
                                productInfoStyles.none}>{props.item.name}</div>
                <img src={`/images/${props.item.picture}`} alt="there should be a picture" />
                <div className={productInfoStyles.productDescription}>
                    <div className={secondTitleVisibility ? productInfoStyles.none :
                                    productInfoStyles.productDescription__name}>{props.item.name}</div>
                    <div className={productInfoStyles.productDescription__description}>{props.item.description}</div>
                    <div className={productInfoStyles.productDescription__price}>{props.item.price} {props.item.currency}</div>
                </div>
            </div>
            <div className={productInfoStyles.ratingsBlock}>
                <span className={productInfoStyles.ratingsBlock__totalRating}>{(+totalRating).toFixed(1)}</span>
                <span className={productInfoStyles.ratingsBlock__reviewsTotal}>{`/reviews: ${reviewsAmount}`}</span>
            </div>
            <div className={productInfoStyles.reviewsBlock}>
                <div className={ratingsError ? productInfoStyles.reviewsBlock__reviewError : productInfoStyles.visibility}>Please rate a product!</div>
                <span>Your rate:</span>
                <Rating name="half-rating" defaultValue={userRating} precision={0.5} onClick={(e) => handleChangingRating(e)} value={userRating} />
                <textarea className={productInfoStyles.reviewsBlock__reviewText + (reviewError ? ` ${productInfoStyles.reviewsBlock__reviewText_wrongInput}` : '')}
                    onChange={(e) => setUserReview(e.target.value)} value={userReview}
                    onClick={() => setReviewError(false)}
                    placeholder={reviewError ? 'Revew cannot be empty!' : 'Leave your review here!'}></textarea>
                <button onClick={handleAddingReview} className={`${productInfoStyles.reviewsBlock__leaveReview} 
                    ${userReview ? productInfoStyles.activeButton : productInfoStyles.inactiveButton}`}>Leave Review</button>
            </div>
            <ul className={productInfoStyles.reviewsList}>
                {renderReview()}
            </ul>
        </div>
    )
}

export default ProductInfo;