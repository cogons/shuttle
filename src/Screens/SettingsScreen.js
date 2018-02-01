import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Container from "../Components/Container"
import Icon from 'react-native-vector-icons/FontAwesome';
export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Links'
  };

  _render() {
    return (
      <View style={styles.container}>
        <Icon
          name="space-shuttle"
          style={{
          backgroundColor: "transparent"
        }}
          color="white"
          size={40}/>
        <Text style={styles.version}>太空舱</Text>
        <Text style={styles.info}>

          {"\n\n"}
          默认打勾 {"\n\n"}
          只在必要的时刻打卡
        </Text>
      </View>
    );
  }

  render() {
    return (
      <Container
        leftIcon="chevron-left"
        leftAction={() => this.props.navigation.goBack()}>

        {this._render()}

      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    marginHorizontal: 20,
    marginVertical: 40,
    backgroundColor: 'transparent',
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  version: {
    textAlign: "center",
    color: "white",
    marginVertical: 40,
    opacity: 0.8
  },
  info: {
    textAlign: "center",
    color: "white",
    opacity: 0.6
  }
});
