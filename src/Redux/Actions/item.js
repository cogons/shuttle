'use strict';

import { AlertIOS } from 'react-native';

import * as TYPES from './types';

import uuid  from 'react-native-uuid'

// fake user data
let testUser = {
	'name': 'juju',
	'age': '24',
	'avatar': 'https://avatars1.githubusercontent.com/u/1439939?v=3&s=460'
};

// for skip user 
let skipUser = {
	'name': 'guest',
	'age': 20,
	'avatar': 'https://avatars1.githubusercontent.com/u/1439939?v=3&s=460',
};

// login
export function logIn(opt){
	return (dispatch) => {
		dispatch({'type': TYPES.LOGGED_DOING});
		let inner_get = fetch('http://www.baidu.com')
			.then((res)=>{
				dispatch({'type': TYPES.LOGGED_IN, user: opt});
			}).catch((e)=>{
				AlertIOS.alert(e.message);
				dispatch({'type': TYPES.LOGGED_ERROR, error: e});
			});
	}
}

export function addItemToday(opt){
	let id = uuid.v1()
	return (dispatch) => {
		dispatch({'type': TYPES.ADD_ITEM,item:opt,id:id});
		dispatch({'type': TYPES.ADD_TO_TODAY,id:id});
	}
}

export function addItemSomeday(opt){
	let id = uuid.v1()
	return (dispatch) => {
		dispatch({'type': TYPES.ADD_ITEM,item:opt,id:id});
		dispatch({'type': TYPES.ADD_TO_SOMEDAY,id:id});
	}
}

export function addItemUpcoming(opt){
	let id = uuid.v1()
	return (dispatch) => {
		dispatch({'type': TYPES.ADD_ITEM,item:opt,id:id});
		dispatch({'type': TYPES.ADD_TO_UPCOMING,id:id});
	}
}



export function updateTodayList(list){

    return (dispatch) => {
		dispatch({'type': TYPES.UPDATE_TODAY_LIST,list:list});
	}

}

// skip login
export function skipLogin(){
	return {
		'type': TYPES.LOGGED_IN,
		'user': skipUser,
	}
}


// logout
export function logOut(){
	return {
		'type': TYPES.LOGGED_OUT
	}
}