const { Router } = require('express');
const router = Router();

const availableCountries = ['USA', 'Russia', 'China', 'Italy', 'Spain', 
    'Canada', 'Mexico', 'Germany', 'Holland', 'Portugal', 'UK', 'Ireland', 'Greece', 'Iceland', 'France'];

router.get('/get_available_countries', (req, res) => {
    if (!availableCountries) {
        res.status(204);
    } else {
        res.status(200).json({
            countries: availableCountries
        });
    }
});

module.exports = router;