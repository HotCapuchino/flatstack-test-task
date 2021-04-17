import {addCountries} from '../actions/countriesActions';

export function fetchAvailableCountries() {
    return dispatch => {
        fetch('http://localhost:8000/api/countries/get_available_countries')
        .then(async function(res) {
            if (res.status === 200) {
                let countries_list = await res.json();
                dispatch(addCountries(countries_list.countries));
            }
        }).catch(err => console.log(err));
    }
}