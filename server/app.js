const express = require('express');
let productRouter = require('./routes/productRoutes');
let countriesRouter = require('./routes/countriesRoutes');
let reviewsRouter = require('./routes/reviewsRouter');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); // this is critical option!!!
app.use('/api/products', productRouter);
app.use('/api/countries', countriesRouter);
app.use('/api/reviews', reviewsRouter);
app.get('/', cors(corsOptions), (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`app has been started on port ${port}!`);
});