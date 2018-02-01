/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from "react";
import {Platform, StyleSheet, Text, View, StatusBar} from "react-native";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/es/integration/react";
import './ReactotronConfig'
// import store from './store'
import AppNavigation from "./src/Navigation";
import configureStore from "./store";

//const {store, persistor} = configureStore();

export default class App extends Component {
  async componentWillMount() {
    const store = configureStore();
    this.setState({store: store.store})
    this.setState({persistor: store.persistor})
  }

  render() {
    return (
      <Provider store={this.state.store}>
        <PersistGate
          rehydrated={true}
          loading={< Text > Loading ...</Text>}
          persistor={this.state.persistor}>
          <StatusBar hidden={false} barStyle={'light-content'}/>
          <AppNavigation/>
        </PersistGate>
      </Provider>
    );
  }
}
