const { Router } = require('express');
const router = Router();

const products = [
    {
        id: 1,
        name: 'The Chelsea Boot',
        picture: 'chelsea-boot.png',
        description: 'desc',
        price: '235',
        currency: '$',
        color: ['Black'],
        quantity: '100'
    },
    {
        id: 2,
        name: 'The Twill Snap Backpack',
        picture: 'twill-snap-backpack.jpg',
        description: 'desc',
        price: '65',
        currency: '$',
        color: ['Reverse Denim + Brown Leather'],
        quantity: '100'
    },
    {
        id: 3,
        name: 'The Twill Zip Tote',
        picture: 'twill-zip-tote.jpeg',
        description: 'desc',
        price: '48',
        currency: '$',
        color: ['Reverse Denim + Black Leather'],
        quantity: '100'
    }];

router.get('/get_products', (req, res) => {
    if (!products) {
        res.status(204);
    } else {
        res.status(200).json({
            products: products
        });
    }
});

router.post('/buy_products', (req, res) => {
    let id = req.body?.id;
    let amount = req.body?.amount;
    console.log(req.body);
    if (!id || !amount) {
        res.status(417);
    } else {
        res.status(200).json({
            'requested_id': id, 
            'requested_amount': amount
        });
    }
});

module.exports = router;