import {productsReducer} from './reducers/productsReducer';
import {userReducer} from './reducers/userInfoReducer';
import {itemsReducer} from './reducers/chosenItemsReducer';
import {countryReducer} from './reducers/countriesReducer';
import {reviewsReducer} from './reducers/reviewsReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    products: productsReducer,
    userInfo: userReducer,
    chosenItems: itemsReducer, 
    availableCountries: countryReducer, 
    productReviews: reviewsReducer
});

export default rootReducer;