import React from 'react';
import {View, StyleSheet, Text, ListView, ScrollView} from 'react-native';
import {connect} from "react-redux";
import {login} from "../Redux/Actions/actionCreator";
import CardItem from "../Components/Home/CardItem"
import StatsItem from "../Components/Detail/StatsItem"
import Header from "../Components/Header"
import Colors from "../Constants/Colors"
import LinearGradient from 'react-native-linear-gradient';
import Container from "../Components/Container"
import _ from "underscore"
import StateIcon from '../Components/Home/StateIcon'

let uuid;

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    uuid = this.props.navigation.state.params.uuid

  }

  static navigationOptions = {
    title: '我的打卡',
    headerStyle: {
      position: 'absolute',
      backgroundColor: 'transparent',
      zIndex: 100,
      top: 0,
      left: 0,
      right: 0,
      height: 100,
      justifyContent: "center",
      alignItems: "center",
      borderBottomWidth: 0,
      color: "white"
    },
    headerTitleStyle: {
      color: 'white'
    },
    headerBackTitleStyle: {
      color: 'white'
    },
    headerTintColor: 'white'
  };

  componentWillReceiveProps(nextProps) {

    if (nextProps.cards[uuid].state == "delete") {
      this
        .props
        .navigation
        .goBack()
    }
  }

  _renderHistory(arr) {

    return arr
      .split("")
      .map((item, i) => {
        return <StateIcon
          styles={{
          width: 24,
          margin: 5
        }}
          key={i}
          state={item}
          size={15}
          from="history"/>
        // <Text key={i} style={[styles.history]}>{item}</Text>
      })

  }

  _render() {

    const stats = _.countBy(this.props.cards[uuid].history.split(""), function (num) {
      switch (num) {
        case "1":
          return "fail"
        case "3":
          return "success"
        case "4":
          return "success"
      }
    });

    const cal = (a, b) => {
      return parseInt(a
        ? a
        : 0) + parseInt(b
        ? b
        : 0)
    }

    const div = (a, b) => {
      let r = Math.floor(parseInt(a
        ? a
        : 0) / parseInt(b
        ? b
        : 0) * 100)
      return isNaN(r)
        ? "-"
        : r + "%"
    }

    return (
      <View style={styles.body}>
        <View style={styles.welcome}>
          <View
            style={{
            alignItems: "center",
            marginVertical: 20
          }}>
            <Text style={styles.itemTitle}>{this.props.cards[uuid].title}</Text>
            <Text style={styles.itemDescription}>{this.props.cards[uuid].description}</Text>
          </View>
          <View style={styles.stats}>
            <StatsItem title="总天数" number={this.props.cards[uuid].history.length}/>
            <StatsItem
              title="成功数"
              number={stats.success
              ? stats.success
              : 0}/>
            <StatsItem
              title="失败数"
              number={stats.fail
              ? stats.fail
              : 0}/>
            <StatsItem
              title="成功率"
              number={div(stats.success, this.props.cards[uuid].history.length)}/>

          </View>
        </View>
        <View style={styles.detailContainer}>

          {this._renderHistory(this.props.cards[uuid].history)}

        </View>
      </View>
    );
  }

  render() {
    return (
      <Container
        leftIcon="chevron-left"
        rightIcon="pencil"
        leftAction={() => this.props.navigation.goBack()}
        rightAction={() => this.props.navigation.navigate("Edit", {uuid: uuid})}>

        {this._render()}
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1
  },
  body: {
    marginHorizontal: 20
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
    marginHorizontal: -20,
    flexDirection: "row",
    padding: 40,
    paddingRight: 20,
    flexWrap: "wrap"
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around"
  }
});

const mapStateToProps = (store) => ({cards: store.CardReducer});
const mapDispatchToProps = ({});
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
