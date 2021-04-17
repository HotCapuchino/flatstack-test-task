import {addProducts} from '../actions/productActions';

export function fetchProducts() {
    console.log('fetching products...');
    return dispatch => {
        fetch('http://localhost:8000/api/products/get_products')
        .then(async function(res) {
            let products_list = await res.json();
            dispatch(addProducts(products_list.products));
        })
        .catch(err => console.log(err));
    }
}

export function buyProduct() {
    return dispatch => {
    // fetch('http://localhost:8000/api/products/buy_products', {
    //   method: 'POST',
    //   mode: 'cors',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ id: '2', amount: 43 })
    // }).then(async function (res) {
    //     if (!res) {
    //       console.log('no data');
    //     } else {
    //       let result = await res.json();
    //       console.log(result);
    //     }
    // }).catch(err => console.log('error occurred!', err));
    }
}
