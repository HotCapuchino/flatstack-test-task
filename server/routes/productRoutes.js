const { Router } = require('express');
const router = Router();

const products = [
    {
        id: 1,
        name: 'The Chelsea Boot',
        picture: 'chelsea-boot.png',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        price: '235',
        currency: '$',
        color: ['Black'],
        quantity: '100'
    },
    {
        id: 2,
        name: 'The Twill Snap Backpack',
        picture: 'twill-snap-backpack.jpg',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        price: '65',
        currency: '$',
        color: ['Reverse Denim + Brown Leather'],
        quantity: '100'
    },
    {
        id: 3,
        name: 'The Twill Zip Tote',
        picture: 'twill-zip-tote.jpeg',
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
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