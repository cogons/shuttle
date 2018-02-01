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
import {ToggoleToday} from "../../Redux/Actions/CardAction"
import Icon from 'react-native-vector-icons/FontAwesome';
import StateIcon from './StateIcon'

class Today extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: true,
            showSetting: false
        }
    }

    _tap() {
        this
            .props
            .toggoleToday(this.props.uuid)
        console.log(this.props.toggoleToday)
    }

    render() {
        return (
            <TouchableOpacity
                onPress={() => {
                console.log(this.props.ToggoleToday(this.props.uuid))
            }}
                style={[
                styles.container,
                (this.props.cards[this.props.uuid].today == 3 || this.props.cards[this.props.uuid].today == 2)
                    ? {}
                    : {
                        backgroundColor: "white"
                    }
            ]}>
                <StateIcon
                    state={this.props.cards[this.props.uuid].today}
                    size={30}
                    from="today"/>
            </TouchableOpacity>
        )
    }

}

const mapStateToProps = (store) => ({cards: store.CardReducer});
const mapDispatchToProps = ({ToggoleToday});
export default connect(mapStateToProps, mapDispatchToProps)(Today);

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