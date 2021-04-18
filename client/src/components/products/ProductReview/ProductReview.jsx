import React from 'react';
import reviewStyle from './ProductReview.module.scss';

function ProductReview(props) {

    const {date, review, stars, user} = props.review;
    console.log(user);

    return (
        <div className={reviewStyle.generalWrapper}>
            <div className={reviewStyle.userInfo}>
                <div className={reviewStyle.userInfo__name}>{user.name}</div>
                <div className={reviewStyle.userInfo__country}>{user.country}</div>
            </div>
            <div className={reviewStyle.reviewInfo}>
                <div className={reviewStyle.reviewInfo__starsAmount}>Stars amount: {stars}</div>
                <div className={reviewStyle.reviewInfo__date}>{date}</div>
            </div>
            <div className={reviewStyle.review}>{review}</div>
            <div className={reviewStyle.usegeTime}>Usage time: {user.using_time}</div>
        </div>
    );
}

export default React.memo(ProductReview);
