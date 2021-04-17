import React, {useState} from 'react';
import chosenProducts from './ChosenProducts.module.scss';
import { useSelector } from 'react-redux';
import ChosenItem from '../ChosenItem/ChosenItem';
import { NavLink } from 'react-router-dom';
import PricesBlock from '../PricesBlock/PricesBlock';

function ChosenProducts() {

    let items_sum = 0;
    let currency = null;
    const [buttonsBlockVisibility, setButtonsBlockVisibility] = useState(false);
    let chosenItemsList = useSelector(state => {
        return state.chosenItems;
    }).map(item => {
        for (let i = 0; i < item.amount; i++) {
            items_sum += +item.price;
            items_sum.toFixed(2);
        }
       currency = item.currency;
        return <ChosenItem item={item} key={item.id} buttonsVisible={buttonsBlockVisibility}/>;
    });
    const shipping = 0; 

    function handleEditOrder() {
        setButtonsBlockVisibility(prevState => !prevState);
    }

    function renderPricesBlock() {
        if (items_sum > 0) {
            return (<PricesBlock itemsSum={items_sum} currency={currency} shipping={shipping}/>);
        } else {
            return (
                <>
                    <h2>There's nothing here by now, try to add some items!</h2>
                    <NavLink to='/products'>Choose products</NavLink>
                </>
            )
        }
    }

    return (
        <div className={chosenProducts.generalWrapper}>
            <div className={chosenProducts.titlesWrapper}>
                <div>Order Summary:</div> 
                <button onClick={handleEditOrder}>Edit order</button>
            </div>
            <ul>
                {chosenItemsList}
            </ul>
            {renderPricesBlock()}
        </div>
    )
}

export default ChosenProducts;