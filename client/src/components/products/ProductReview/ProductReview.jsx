import React from 'react';
import reviewStyle from './ProductReview.module.scss';

function ProductReview(props) {

    const {date, review, stars, user, user_id} = props.review;
    console.log(user);

    return (
        <div className={reviewStyle.generalWrapper}>
            <div className={reviewStyle.userInfo}>
                <div className={reviewStyle.userInfo__name}>{user.name}</div>
                <div className={reviewStyle.userInfo__country}>{user.country}</div>
                <div className={reviewStyle.userInfo__useTime}>{user.using_time}</div>
            </div>
            <div className={reviewStyle.starsAmount}>{stars}</div>
            <div className={reviewStyle.review}>{review}</div>
            <div className={reviewStyle.date}>{date}</div>
        </div>
    );
}

export default ProductReview;
