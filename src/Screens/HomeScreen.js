import React from 'react';
import {View, StyleSheet, RefreshControl, Text, ListView} from 'react-native';
import {connect} from "react-redux";
import {login} from "../Redux/Actions/actionCreator";
import CardItem from "../Components/Home/CardItem"
import Header from "../Components/Header"
import Colors from "../Constants/Colors"
import LinearGradient from 'react-native-linear-gradient';
import Container from "../Components/Container"
import {ShuffleItems, GetItems} from "../Redux/Actions/CardAction"
import moment from 'moment'
const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});
var self;
class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    self = this
    let detailList = this
      .props
      .cards
      .list
      .map((t) => this.props.cards[t])
    this.state = {
      dataSource: ds.cloneWithRows(detailList),
      join_days: moment().diff(this.props.join_time, 'days') + 1,
      today: moment().format("MMM DD, YYYY"),
      isRefreshing: false
    };
  }

  componentDidMount() {
    // if (this.props.cards.shuffle_time !== moment().format("YYYY-MM-DD")) {   this
    //     .props     .ShuffleItems() }
    let join_days = moment().diff(this.props.join_time, 'days') + 1
    let today = moment().format("MMM DD, YYYY")
    this.setState({today})
    this.setState({join_days})
    this
      .props
      .GetItems()
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

  _onRefresh() {
    self.setState({isRefreshing: true});

    setTimeout(() => {
      self
        .props
        .GetItems()
      let today = moment().format("MMM DD, YYYY")
      self.setState({today})
      self.setState({isRefreshing: false});
    }, 300);

  }

  _render() {
    let self = this
    return (
      <View style={styles.body}>
        <View style={styles.welcome}>
          <Text style={styles.welcomeText1}>{this.state.today}</Text>
          <Text style={styles.welcomeText2}>今日的星尘看起来也如此不同</Text>

        </View>

        <ListView
          refreshControl={< RefreshControl refreshing = {
          this.state.isRefreshing
        }
        onRefresh = {
          this._onRefresh
        }
        tintColor = "#95a5d0" title = "启动引擎..." titleColor = "#95a5d0" colors = {
          ['#95a5d0', '#95a5d0', '#95a5d0']
        }
        progressBackgroundColor = "#95a5d0" />}
          style={styles.listView}
          dataSource={ds.cloneWithRows(this.props.cards.list.map((t) => this.props.cards[t]))}
          renderRow={(rowData) => <CardItem uuid={rowData.uuid} navigation={self.props.navigation}/>}/></View>

    );
  }

  render() {
    return (
      <Container
        leftIcon="bars"
        rightIcon="space-shuttle"
        leftAction={() => this.props.navigation.navigate("Settings")}
        rightAction={() => this.props.navigation.navigate("Edit", {item: undefined})}>

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
    height: 60,
    justifyContent: "center",
    marginVertical: 20
  },
  welcomeText1: {
    fontSize: 16,
    color: "white",
    lineHeight: 30,
    backgroundColor: "transparent",
    opacity: 0.8
  },
  welcomeText2: {
    fontSize: 14,
    color: "white",
    lineHeight: 20,
    backgroundColor: "transparent",
    opacity: 0.5
  },
  listView: {
    height: "80%"
  }
});

const mapStateToProps = (store) => ({cards: store.CardReducer});
const mapDispatchToProps = ({ShuffleItems, GetItems});
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
