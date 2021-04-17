import * as actionTypes from '../actions/actionTypes';
import initialState from '../initialState';

export function itemsReducer(state = initialState.chosenItems, action) {
    // considering the case when user is eager to add already existing product
    switch(action.type) {
        case actionTypes.ITEMS_ADD_ITEM: {
            let was_found = false;
            let new_state = state.map(item => {
                if (item.id == action.payload.id) {
                    was_found = true;
                    return {
                        ...item,
                        amount: item.amount + 1
                    }
                } else {
                    return item;
                }
            });
            if (!was_found) {
                new_state.push({
                    ...action.payload,
                    amount: 1
                });
            }
            return new_state;
        }
        // considering the case when user have more than one similar product
        case actionTypes.ITEMS_DELETE_ITEM: {
            let new_state = [];
            state.forEach(item => {
                if (item.id == action.payload) {
                    if (item.amount > 1) {
                        new_state.push({
                            ...item,
                            amount: item.amount - 1 
                        });
                    } 
                } else {
                    new_state.push(item);
                }
            });
            return new_state;
        }
        // completely deleting chosen product
        case actionTypes.ITEMS_DELETE_COMPLETELY: {
            let new_state = [];
            state.forEach(item => {
                if (item.id != action.payload) {
                    new_state.push(item);
                }
            });
            return new_state;
        }
        case actionTypes.CLEAR_USER_ITEMS: {
            return [];
        }
        default: return state;
    }
}