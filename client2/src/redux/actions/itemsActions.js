import * as actionTypes from './actionTypes';

export const addItem = (item_info) => {
    return {
        type: actionTypes.ITEMS_ADD_ITEM,
        payload: item_info
    }
}

export const deleteItem = (item_id) => {
    return {
        type: actionTypes.ITEMS_DELETE_ITEM,
        payload: item_id
    }
}

export const deleteItemCompletely = (item_id) => {
    return {
        type: actionTypes.ITEMS_DELETE_COMPLETELY,
        payload: item_id
    }
}

export const clearUserItems = () => {
    return {
        type: actionTypes.CLEAR_USER_ITEMS
    }
}