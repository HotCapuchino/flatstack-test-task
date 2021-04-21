import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import navBarStyles from './Navbar.module.scss';
import { setCurrentStep } from '../../redux/actions/userActions';
import { clearUserItems } from '../../redux/actions/itemsActions';

function NavBar() {

    const dispatch = useDispatch();
    const chosen_items_amount = useSelector(state => {
        let itemsAmount = state.chosenItems.reduce(function(previousValue, item) {
            return previousValue += item.amount;
        }, 0);
        if (state.userInfo.currentStep === 'success') {
            return 0;
        }
        return itemsAmount;
    });
    const currentStep = useSelector(state => {
        return state.userInfo.currentStep;
    });
    
    const [trolley_products_class, setTrolleyProductsClass] = useState(navBarStyles.trolleyWrapper__productsAmount);
    
    useEffect(() => {
        if (+chosen_items_amount > 0) {
            setTrolleyProductsClass(navBarStyles.trolleyWrapperImg__productsAmount);
        } else {
            setTrolleyProductsClass(navBarStyles.none);
        }
    }, [chosen_items_amount]); 

    function handleLastStep() {
        if (currentStep === 'success') {
            dispatch(setCurrentStep('shipping'));
            dispatch(clearUserItems());
        }
    }

    return(
        <div className={navBarStyles.generalWrapper}>
            <nav className={navBarStyles.navbarWrapper}>
                <NavLink onClick={handleLastStep} to="/products">
                    <div className={navBarStyles.navbarWrapper__title}>Front End Developer Test Task</div>
                </NavLink>
                <div className={navBarStyles.trolleyWrapper}>
                    <NavLink className={navBarStyles.trolleyWrapper__cart} to="/cart">cart</NavLink>
                    <NavLink className={navBarStyles.trolleyWrapperImg} to="/cart">
                        <div className={navBarStyles.trolleyWrapperImg__trolleyImg}></div>
                        <div className={trolley_products_class}>{chosen_items_amount}</div>
                    </NavLink>
                </div>
            </nav>
        </div>
    )
}

export default NavBar;