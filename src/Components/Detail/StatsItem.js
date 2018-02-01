import React, {Component} from 'react';
import {
    AppRegistry,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    Button,
    TouchableOpacity,
    TouchableHighlight,
    TouchableWithoutFeedback,
    Dimensions,
    Animated,
    Easing,
    View
} from 'react-native';
import Colors from "../../Constants/Colors"

export default class StatsItem extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.props.title}</Text>
                <Text style={styles.number}>{this.props.number}</Text>
            </View>
        )
    }
}

const center = {
    alignItems: "center",
    justifyContent: "center"
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "transparent",
        height: 60,
        marginVertical: 10,
        alignItems: "center"
    },
    title: {
        color: "white",
        fontSize: 14,
        opacity: 0.8
    },
    number: {
        color: "white",
        fontSize: 18,
        marginTop: 10
    }
})