'use strict';

import * as TYPES from '../Redux/Actions/types';

import uuid  from 'react-native-uuid'

const createItem = function(content){
	return {
		"id":uuid.v1(),
		"date":"2017-08-12",
		"type":"work",
		"done":true,
		"content":content

	}
}

const a_id = uuid.v1()
const b_id = uuid.v1()

const a = {
	"id":a_id,
	"date":"2017-08-12",
	"type":"work",
	"done":true,
	"content":"2017-08-12content"
}

const b = {
	"id":b_id,
	"date":"2017-08-13",
	"type":"work",
	"done":true,
	"content":"2017-08-13content"
}

const initialState = {
	items:{},
    today:[],
    upcoming:[],
    someday:[],
};

export default function user(state=initialState, action){

	switch(action.type){
		case TYPES.ADD_ITEM:
			let newItems = {"items":state.items}
			newItems["items"][action.id] = {"id":action.id,"content":action.item,"status":false}
			console.log(newItems)
			return Object.assign({},state,{newItems})

		// case TYPES.ADD_ITEM:
		// 	return Object.assign({},initialState)

		case TYPES.ADD_TO_TODAY:
			return Object.assign({},state,{today:[...state.today,action.id]})

		case TYPES.ADD_TO_UPCOMING:
			return Object.assign({},state,{upcoming:[...state.upcoming,action.id]})

		case TYPES.ADD_TO_SOMEDAY:
			return Object.assign({},state,{someday:[...state.someday,action.id]})
	
		case TYPES.UPDATE_TODAY_LIST:
            
            return Object.assign({},state,{today:action.list})
            
		case TYPES.LOGGED_IN:
			return {
				...state,
				isLoggedIn: true,
				user: action.user,
				status: 'done'
			};

		case TYPES.LOGGED_OUT:
			return {
				...state,
				isLoggedIn: false,
				user: {},
				status: null
			};
		case TYPES.LOGGED_ERROR:
			return {
				...state,
				isLoggedIn: false,
				user: {},
				status: null
			}

		default: 
			return state;
	}

}