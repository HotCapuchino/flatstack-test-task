import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import productsBlockStyles from '../ProductsBlock.module.scss';
import ProductItem from '../ProductItem/ProductItem';
import ProductInfo from '../ProductInfo/ProductInfo';
import Modal from '../../general/Modal';

function ProductsBlock() {
    
    const [productInfoVisibility, setProductInfoVisibility] = useState(false);
    const [item, setItem] = useState(null);
    const products = useSelector(state => {
            return state.products;
        }).map((item, index) => {
            return <ProductItem key={index} item={item} index={index} 
                    showProductInfo={setProductInfoVisibility} setItemInfo={setItem}/>
        });

    function handleListenModalClick(event) {
        console.log(event.clientX, event.clientY);
    }

    return(
        <div className={productsBlockStyles.productsWrapper}>  
            {productInfoVisibility ? <Modal onClick={(e) => handleListenModalClick(e)}><ProductInfo closeProductInfo={setProductInfoVisibility} item={item}/></Modal> : null}
            <ul className={productsBlockStyles.productsList}>
                {products}
            </ul>
        </div>
    );
}

export default ProductsBlock;