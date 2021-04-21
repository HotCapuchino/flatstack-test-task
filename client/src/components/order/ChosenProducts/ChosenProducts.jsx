import React, {useEffect, useState} from 'react';
import chosenProducts from './ChosenProducts.module.scss';
import { useSelector } from 'react-redux';
import ChosenItem from '../ChosenItem/ChosenItem';
import { NavLink } from 'react-router-dom';
import PricesBlock from '../PricesBlock/PricesBlock';

function ChosenProducts() {

    let items_sum = 0;
    let currency = null;
    const [buttonsBlockVisibility, setButtonsBlockVisibility] = useState(false);
    const currentStep = useSelector(state => {
        return state.userInfo.currentStep;
    });
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
        if (currentStep === 'success') return;
        setButtonsBlockVisibility(prevState => !prevState);
    }

    function renderPricesBlock() {
        if (items_sum > 0) {
            return (<PricesBlock itemsSum={items_sum} currency={currency} shipping={shipping}/>);
        } else {
            return (
                <div className={chosenProducts.noProducts}>
                    <h2 className={chosenProducts.noProducts__message}>There's nothing here by now, try to add some items!</h2>
                    <NavLink to='/products' className={chosenProducts.noProducts__link}>Choose products</NavLink>
                </div>
            )
        }
    }

    return (
        <div className={chosenProducts.generalWrapper + `${currentStep === 'success' ? ` ${chosenProducts.blurred}` : ''}`}>
            <div className={chosenProducts.titlesWrapper}>
                <h2 className={chosenProducts.titlesWrapper__title}>Order Summary:</h2> 
                <button onClick={handleEditOrder} className={chosenProducts.titlesWrapper__edit}>Edit order</button>
            </div>
            <ul className={chosenProducts.chosenItems}>
                {chosenItemsList}
            </ul>
            {renderPricesBlock()}
        </div>
    )
}

export default ChosenProducts;