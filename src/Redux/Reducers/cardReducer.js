import {incrementCounter, decrementCounter} from "../Actions/actionTypes";

import {
    toggoleToday,
    updateItem,
    postItem,
    getItem,
    getItems,
    shuffleItems,
    deleteItem
} from '../Actions/types';

import _ from 'underscore'

import moment from 'moment'
import {GetItems} from "../Actions/CardAction";

const fakeCardList = {
    list: ["guide1", "guide2", "guide3"]
}
const fakeCardDetail = {
    "guide1": {
        "uuid": "guide1",
        "title": "右侧打卡",
        "description": "[示例] 点击详情",
        "history": "333",
        "today": "1",
        "start_date": "2017-12-21",
        "days": 9
    },
    "guide2": {
        "uuid": "guide2",
        "title": "左侧看天数",
        "description": "[示例] 点击详情",
        "history": "334",
        "today": "3",
        "start_date": "2017-12-10",
        "days": 8
    },
    "guide3": {
        "uuid": "guide3",
        "title": "左侧天数",
        "description": "[示例] 点击详情",
        "history": "333",
        "today": "4",
        "start_date": "2017-12-21",
        "days": 46
    }
}

const template = {
    "uuid": "db062920-e0a1-11e7-bd7b-97661737f2f5",
    "title": "左侧天数",
    "description": "点击详情",
    "history": "",
    "today": "3",
    "start_date": moment().format("YYYY-MM-DD"),
    "days": 0
}

const shuffleTime = {
    shuffle_time: "2017-12-20"
}

let guid = () => {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

const initialState = Object.assign({}, fakeCardList, fakeCardDetail, shuffleTime)

const TODAY_STATE_LIST = [3, 4, 1, 3]

function shuffleState(state) {

    let today_date = moment().format("YYYY-MM-DD")

    let today_date_debug = moment().format("YYYY-MM-DD");

    console.log("need shuffle")
    state
        .list
        .forEach((uuid) => {
            state[uuid] = shuffle(state[uuid])
        })

    state.shuffle_time = today_date_debug

    return state

}

function shuffle(item) {

    let history = item.history
    let today = item.today
    let end = moment(moment().format("YYYY-MM-DD"));
    let start = moment(item.start_date)
    let diff = end.diff(start, 'days') - item.history.length

    if (diff !== 0) {
        let new_history = history + (today == "3"
            ? '3'
            : today)
        console.log(today, new_history)
        item.update = true
        for (let i = 0; i < diff - 1; i++) {
            new_history += "3"
        }
        item.history = new_history
        item.today = "3"

    }

    console.log(item)

    return item

}

const cardReducer = (state = initialState, action) => {

    let state_copy = Object.assign({}, state)

    switch (action.type) {

        case toggoleToday:

            let oldToday = parseInt(state_copy[action.uuid].today)

            let newToday = TODAY_STATE_LIST[TODAY_STATE_LIST.indexOf(oldToday) + 1] + ""

            return {
                ...state,
                [action.uuid]: {
                    ...state[action.uuid],
                    today: newToday
                }
            };

        case updateItem:
            return {
                ...state,
                [action.uuid]: Object.assign(state[action.uuid], action.content)
            };

        case postItem:

            let auuid = guid();

            return {
                ...state,
                [auuid]: Object.assign({}, template, {
                    uuid: auuid,
                    title: action.content.title,
                    description: action.content.description
                }),
                list: state
                    .list
                    .concat(auuid)
            };

        case getItems:
            let join_time = state.join_time
                ? state.join_time
                : moment().format("YYYY-MM-DD");
            if (state.shuffle_time !== moment().format("YYYY-MM-DD")) {
                return {
                    ...state,
                    join_time,
                    ...shuffleState(state)
                }
            } else 
                return {
                    ...state,
                    join_time
                };
            case deleteItem:

            state_copy.list = _.without(state_copy.list, action.uuid);
            state_copy[action.uuid].state = "delete";

            return {
                ...state,
                ...state_copy
            };

        case shuffleItems:
            console.log(state);
            state_copy = Object.assign({}, state);
            return {
                ...state,
                ...state_copy
            };

        default:
            return state
    }
};

export default cardReducer;