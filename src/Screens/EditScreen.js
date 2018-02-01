import React from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import Container from "../Components/Container"
import {connect} from "react-redux";
import {login} from "../Redux/Actions/actionCreator";
import {UpdateItem, PostItem, DeleteItem, GetItems} from "../Redux/Actions/CardAction"
import genuuid from 'uuid/v4'
import {NavigationActions} from 'react-navigation'
let uuid,
    self;
const backAction = NavigationActions.back({key: null})

class EditScreen extends React.Component {

    constructor(props) {
        super(props);
        self = this
        uuid = this.props.navigation.state.params.uuid
        this.state = {
            titlePlaceholder: "我的目标是...",
            descriptionPlaceholder: "一句话鼓励自己（选填）",
            titleText: uuid
                ? this.props.cards[uuid].title
                : "",
            descriptionText: uuid
                ? this.props.cards[uuid].description
                : ""
        }
    }

    _onSubmitEditing() {

        if (uuid) {

            self
                .props
                .UpdateItem(uuid, {
                    title: this.state.titleText,
                    description: this.state.descriptionText
                })

            self
                .props
                .navigation
                .goBack()

        } else {

            self
                .props
                .PostItem({title: this.state.titleText, description: this.state.descriptionText})

            self
                .props
                .navigation
                .goBack()

        }

        // let item = this.state.item item   .todo   .push({content:
        // this.state.inputText, status: false}) if(!this.props.isUpdate)
        // this.setState({inputText: ""})
        // this.props.callbackParent("submit",this.state.inputText);
        // console.log(this.state.type) switch(this.state.type){   case "today":
        // this.props.dispatch(addItemToday(this.state.inputText));   break   case
        // "someday":   this.props.dispatch(addItemSomeday(this.state.inputText)); break
        //   case "upcoming":
        // this.props.dispatch(addItemUpcoming(this.state.inputText));   break }
        // this._hideModal()
    }

    static navigationOptions = {
        title: 'Edit'
    };

    _deleteItem() {

        if (!uuid) 
            return;
        
        self
            .props
            .DeleteItem(uuid)

        self
            .props
            .navigation
            .goBack()

    }

    _render() {
        return (
            <View style={styles.container}>

                <TextInput
                    style={styles.titleInput}
                    onChangeText={(titleText) => this.setState({titleText})}
                    value={this.state.titleText}
                    placeholder={this.state.titlePlaceholder}/>
                <TextInput
                    style={styles.descriptionInput}
                    onChangeText={(descriptionText) => this.setState({descriptionText})}
                    value={this.state.descriptionText}
                    placeholderTextColor="#A0AED5"
                    placeholder={this.state.descriptionPlaceholder}/>{uuid == undefined
                    ? null
                    : <Text onPress={this._deleteItem} style={styles.deleteButton}>删除</Text>}
            </View>

        );
    }

    render() {
        return (
            <Container
                leftIcon="chevron-left"
                rightIcon="check"
                leftAction={() => this.props.navigation.goBack()}
                rightAction={() => self._onSubmitEditing()}>

                {this._render()}

            </Container>
        )
    }
}

const mapStateToProps = (store) => ({cards: store.CardReducer});
const mapDispatchToProps = ({UpdateItem, PostItem, DeleteItem, GetItems});
export default connect(mapStateToProps, mapDispatchToProps)(EditScreen);

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginVertical: 40
    },
    titleInput: {
        height: 40,
        borderColor: 'gray',
        width: "100%",
        backgroundColor: '#fff',
        paddingHorizontal: 30,
        paddingVertical: 12,
        marginBottom: 20,
        fontSize: 16,
        color: "#666"
    },
    descriptionInput: {
        height: 40,
        borderColor: 'gray',
        width: "100%",
        backgroundColor: '#4961AE',
        paddingHorizontal: 30,
        paddingVertical: 12,
        marginBottom: 20,
        fontSize: 16,
        color: "#fff"
    },
    deleteButton: {
        backgroundColor: "#4961AE",
        color: "#A0AED5",
        padding: 10,
        fontSize: 14,
        textAlign: "center"
    }
});
