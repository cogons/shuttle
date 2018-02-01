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
import Colors from "../Constants/Colors"
import {connect} from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: false,
            showSetting: false
        }
    }

    _renderHistory(arr) {

        return arr.map((item, i) => {
            return <Text key={i} style={[styles.history]}>{item}</Text>
        })

    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={this.props.leftAction}>
                    <Icon
                        name={this.props.leftIcon}
                        style={{
                        backgroundColor: "transparent"
                    }}
                        color="#FFF"
                        size={20}/>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={this.props.rightAction}>
                    <Icon
                        name={this.props.rightIcon}
                        style={{
                        backgroundColor: "transparent"
                    }}
                        color="#FFF"
                        size={20}/>
                </TouchableOpacity>

            </View>
        )
    }
}
const mapStateToProps = (store) => ({cards: store.CardReducer});
const mapDispatchToProps = ({});
export default connect(mapStateToProps, mapDispatchToProps)(Header);

const styles = StyleSheet.create({

    container: {
        position: "absolute",
        height: 80,
        width: "100%",
        top: 10,
        paddingHorizontal: 20,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row"
    },
    button: {},
    buttonText: {
        fontSize: 30,
        color: "white",
        backgroundColor: "transparent"
    },
    days: {
        color: Colors.gray2,
        fontSize: 20,
        width: 60,
        textAlign: "center"
    }
})