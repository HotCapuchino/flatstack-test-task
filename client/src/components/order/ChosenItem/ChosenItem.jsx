import React, { useEffect, useState } from 'react';
import chosenItem from '../ChosenItem/ChosenItem.module.scss';
import { useDispatch } from 'react-redux';
import { addItem, deleteItem, deleteItemCompletely } from '../../../redux/actions/itemsActions';

function ChosenItem(props) {

    const item = props.item;
    const dispatch = useDispatch();
    function increaseAmount(item_id, item_info) {
        dispatch(addItem({
            id: item_id,
            ...item_info
        }));
    }
    const [buttonsBlockClass, setButtonsBlockClass] = useState(chosenItem.none);

    useEffect(() => {
        if (props.buttonsVisible) {
            setButtonsBlockClass(chosenItem.buttonsBlock);
        } else {
            setButtonsBlockClass(chosenItem.none);
        }
    }, [props.buttonsVisible]);

    return (
        <li className={chosenItem.liElem}>
            <div className={chosenItem.chosenItem}>
                <img src={`/images/${item.picture}`}
                    alt="There should be a picture" className={chosenItem.chosenItem__image} />
                <div className={chosenItem.itemInfo}>
                    <div className={chosenItem.nameAndPrice}>
                        <div className={chosenItem.nameAndPrice__name}>{item.name}</div>
                        <div className={chosenItem.nameAndPrice__price}>{`${item.price}${item.currency}`}</div>
                    </div>
                    <div className={chosenItem.itemInfo__color}>{item.color}</div>
                    <div className={chosenItem.itemInfo__amount}>{item.amount}</div>
                </div>
            </div>
            <div className={buttonsBlockClass}>
                <button className={chosenItem.buttonsBlock__decrease} onClick={() => dispatch(deleteItem(item.id))}>-</button>
                <button className={chosenItem.buttonsBlock__delete} onClick={() => dispatch(deleteItemCompletely(item.id))}>DeleteItem</button>
                <button className={chosenItem.buttonsBlock__increase} onClick={() => increaseAmount(item.id, item)}>+</button>
            </div>
        </li>
    );
}

export default ChosenItem;