import {
    toggoleToday,
    updateItem,
    postItem,
    getItem,
    getItems,
    shuffleItems,
    deleteItem
} from './types';

// skip login const ToggoleToday = (uuid) => ({type: toggoleToday, uuid: uuid});
const UpdateItem = (uuid, content) => ({type: updateItem, uuid: uuid, content: content});
const PostItem = (content) => ({type: postItem, content: content});
const GetItem = (uuid) => ({type: getItem, uuid: uuid});
const DeleteItem = (uuid) => ({type: deleteItem, uuid: uuid});
const GetItems = () => ({type: getItems});
const ShuffleItems = () => ({type: shuffleItems});

const ToggoleToday = (uuid) => {
    return (dispatch) => {
        dispatch({type: toggoleToday, uuid: uuid})
        dispatch({type: getItems});
    }
}

export {
    ToggoleToday,
    UpdateItem,
    PostItem,
    GetItem,
    GetItems,
    ShuffleItems,
    DeleteItem
};