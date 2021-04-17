import React, { useEffect } from 'react';
import productInfoStyles from './ProductInfo.module.scss';
import Review from '../ProductReview/ProductReview';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews } from '../../../redux/middlewares/reviewsMiddleware';

function ProductInfo(props) {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchReviews(props.item.id));
    }, []);
    const reviews = useSelector(state => {
        if (!state.productReviews[props.item.id]) {
            return null;
        }
        return state.productReviews[props.item.id];
    });

    function renderReview() {
        if (!reviews) return;
        return reviews.map(review => {
            return <Review key={review.review_id} review={review}/>
        });
        return <Review/>;
    }

    function handleAddingReview(params) {
        console.log('sss');
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
                <div>There should be rating stars</div>
                <div>Leave reply</div>
            </div>
            <div className={productInfoStyles.reviewsBlock}>
                <textarea className={productInfoStyles.reviewsBlock__leaveReview} onKeyPress={() => handleAddingReview}></textarea>
                {renderReview()}
            </div>
        </div>
    )
}

export default ProductInfo;
