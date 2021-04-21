import React from 'react';
import { addItem } from '../../../redux/actions/itemsActions';
import { useDispatch } from 'react-redux';
import productsBlockStyles from '../ProductsBlock.module.scss';

function ProductItem(props) {
    const index = props.index;
    const item = props.item;

    const dispatch = useDispatch();
    function handleAddingItem(index, item_info) {
        dispatch(addItem({
            id: index,
            ...item_info
        }));
    }

    function handleOpenModal() {
        props.showProductInfo(true);
        props.setItemInfo(item);
    }

    return (
        <li className={productsBlockStyles.productItem}>
            <img src={`/images/${item.picture}`} onClick={handleOpenModal}
                alt="There should be a picture" className={productsBlockStyles.productItem__image}/>
            <div className={productsBlockStyles.itemInfo}>
                <div className={productsBlockStyles.itemInfo__name}>{item.name}</div>
                <div className={productsBlockStyles.itemInfo__description}>{item.description}</div>
                <div className={productsBlockStyles.itemInfo__price}>Price: {item.price} {item.currency}</div>
                <div className={productsBlockStyles.buttonsBlock}>
                    <button className={productsBlockStyles.buttonsBlock__viewItem}
                        onClick={handleOpenModal}>View Item</button>
                    <button onClick={() => handleAddingItem(index, item)} 
                        className={productsBlockStyles.buttonsBlock__addItem}>Add Item</button>
                </div>
            </div>
        </li>
    );
}

export default ProductItem;