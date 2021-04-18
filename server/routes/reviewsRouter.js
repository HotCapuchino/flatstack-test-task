const { Router } = require('express');
const router = Router();
const md5 = require('crypto-js/md5');

const reviews = {
    1: [{
            review_id: 'JHJh4k21j3lkjds',
            user_id: 4,
            stars: 5,
            user: {
                name: 'John',
                country: 'USA',
                using_time: 'year and a half'
            },
            review: 'Excellent shoes! Perfectly suitable for casual style!',
            date: '2019/12/19'
        }],
    2: [{
            review_id: 'y98j30j0DF',
            user_id: 1,
            stars: 4,
            user: {
                name: 'Lisa',
                country: 'Italy',
                using_time: '3 months'
            },
            review: 'Quite good for its price though I ripped it off after only three months of use, but it was my fault..',
            date: '2020/03/23'
        }, 
        {
            review_id: 'hkjl98uJK4kKJd',
            user_id: 502,
            product_id: 2,
            stars: 3,
            user: {
                name: 'Margareth',
                country: 'Spain',
                using_time: '1 months'
            },
            review: 'Color differs from the photo, high price for such backpack!',
            date: '2021/01/15'
        }],
    3: [{
            review_id: 'Nifoo34n93d',
            user_id: 100,
            stars: 3,
            user: {
                name: 'Ivan',
                country: 'Russia',
                using_time: '6 months'
            },
            review: 'Очень дорогая авоська для похода по магазинам! Подарил бабушке на ее 90 летие, а она в ней банки огурцов засоленных хранит(',
            date: '2021/04/10'
        }]
};

let earlier_requested = {};

router.post('/get_reviews', (req, res) => {
    let {product_id} = req.body;
    if (!product_id) {
        res.status(417).send('Some of the arguments are probably missing!');
    }
    if (reviews[product_id]) {
        // checking if the resource was requested earlier
        if (earlier_requested[product_id]) {
            console.log('you have requested this resource!');
            // if at least one review was added send all requested reviews
            if (reviews[product_id].length !== earlier_requested[product_id]) {
                res.status(200).json({
                    reviews: reviews[product_id]
                });
            // if no reviews were added just send 304
            } else {
                res.status(304).send('No changes!');
            }
        } else {
            console.log('you havent requested this resource!');
            earlier_requested[product_id] = reviews[product_id].length;
            res.status(200).json({
                reviews: reviews[product_id]
            });
        }
    } else {
        res.status(204).send('No such product id!');
    }
});

router.post('/leave_review', (req, res) => {
    let {product_id, user_id, stars, user, review, date} = req.body;
    let new_review = {
        user_id,
        stars,
        user,
        review, 
        date
    };
    new_review.review_id = md5(Date.now()).toString();
    console.log(new_review);
    for (const key in new_review) {
        if (!new_review[key]) {
            res.status(417).send('Seems like some params are missing!');
        }
    }
    if (reviews[product_id]) {
        reviews[product_id].push(new_review);
    } else {
        let new_array = [];
        new_array.push(new_review);
        reviews[product_id] = new_array;
    }
    res.status(201).json({
        review: new_review
    });
});

module.exports = router;