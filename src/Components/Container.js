import React from 'react';
import {View, StyleSheet, Text, ListView} from 'react-native';
import {connect} from "react-redux";
import {login} from "../Redux/Actions/actionCreator";
import CardItem from "../Components/Home/CardItem"
import StatsItem from "../Components/Detail/StatsItem"
import Header from "../Components/Header"
import Colors from "../Constants/Colors"
import LinearGradient from 'react-native-linear-gradient';

export default class Container extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <LinearGradient colors={['#4F68B6', '#193088']} style={styles.linearGradient}>
                <Header
                    navigation={this.props.navigation}
                    leftIcon={this.props.leftIcon}
                    leftAction={this.props.leftAction}
                    rightIcon={this.props.rightIcon}
                    rightAction={this.props.rightAction}/>
                <View style={styles.body}>
                    {this.props.children}
                </View>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1
    },
    body: {
        marginTop: 60
    },
    welcome: {
        justifyContent: "center"
    },
    itemTitle: {
        fontSize: 20,
        color: "white",
        lineHeight: 30,
        backgroundColor: "transparent"
    },
    itemDescription: {
        fontSize: 14,
        color: "#A0AED5",
        lineHeight: 30,
        backgroundColor: "transparent"
    },
    listView: {
        height: "100%"
    },
    detailContainer: {
        backgroundColor: "#607BBD",
        height: "100%",
        marginHorizontal: -20
    },
    stats: {
        flexDirection: "row",
        justifyContent: "space-around"
    }
});
