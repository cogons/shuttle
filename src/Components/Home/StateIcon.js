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
import Styles from "../../Constants/Styles"
import {connect} from "react-redux";
import Icon from 'react-native-vector-icons/FontAwesome';

const color = {
    today: {
        strong: "#446EB4",
        weak: "#95A4D2"
    },
    history: {
        strong: "#fff",
        weak: "#95A4D2"
    }
}

class StateIcon extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            checked: true,
            showSetting: false
        }
    }

    render() {
        let state = parseInt(this.props.state)
        switch (state) {
            case 0:
                return (<Icon
                    name="question"
                    style={[
                    {
                        backgroundColor: "transparent"
                    },
                    this.props.styles
                ]}
                    color={color[this.props.from].weak}
                    size={this.props.size}/>)
            case 1:
                return (<Icon
                    name="times"
                    style={[
                    {
                        backgroundColor: "transparent"
                    },
                    this.props.styles
                ]}
                    color={color[this.props.from].strong}
                    size={this.props.size}/>)
            case 2:
                return (<Icon
                    name="times"
                    style={[
                    {
                        backgroundColor: "transparent"
                    },
                    this.props.styles
                ]}
                    color={color[this.props.from].weak}
                    size={this.props.size}/>)
            case 3:
                return (<Icon
                    name="check"
                    style={[
                    {
                        backgroundColor: "transparent"
                    },
                    this.props.styles
                ]}
                    color={color[this.props.from].weak}
                    size={this.props.size}/>)
            case 4:
                return (<Icon
                    name="check"
                    style={[
                    {
                        backgroundColor: "transparent"
                    },
                    this.props.styles
                ]}
                    color={color[this.props.from].strong}
                    size={this.props.size}/>)
            case 5:
                return (<Icon
                    name="question"
                    style={[
                    {
                        backgroundColor: "transparent"
                    },
                    this.props.styles
                ]}
                    color={color[this.props.from].weak}
                    size={this.props.size}/>)
            default:
                return (<Icon
                    name="shuttle"
                    style={[
                    {
                        backgroundColor: "transparent"
                    },
                    this.props.styles
                ]}
                    color="#000"
                    size={this.props.size}/>)

        }

    }

}

const mapStateToProps = (store) => ({cards: store.CardReducer});
const mapDispatchToProps = ({});
export default connect(mapStateToProps, mapDispatchToProps)(StateIcon);

const styles = StyleSheet.create({

    container: {
        ...Styles.center,
        width: 60,
        height: 60,
        backgroundColor: "#607BBD"
    },
    spacing: {

        marginRight: 5

    },
    text: {

        color: "#95A4D2",
        fontSize: 30

    },
    textChecked: {

        color: "#446EB4",
        fontSize: 30

    },
    days: {
        color: Colors.gray2,
        fontSize: 20
    }

})