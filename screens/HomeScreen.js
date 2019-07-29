import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
    Alert, AsyncStorage, BackHandler, DeviceEventEmitter, FlatList,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import HomePizzeria from "../components/HomePizzeria";
import CustomButton from "../components/CustomButton";
import {Toast} from "native-base";

class HomeScreen extends React.Component{
    constructor(inProps) {
        super(inProps);
        this.state = {listData: []};
    }

    render() {
        let count = 0;
        return (
            <View style={styles.container}>
                <Text>
                    Select a restaurant from the list to view ordering information and reviews of your previous orders.
                </Text>
                <FlatList
                    style={styles.pizzeriaList}
                    data={this.state.listData.sort((a, b) => b.rating - a.rating)}
                    renderItem={({item}) =>
                        <HomePizzeria name={item.name} type={item.type} rating={item.rating} number={count++} />
                    }
                />
            </View>
        );
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", ()=>{return true;});
        this.load();
        this.focusListener = this.props.navigation.addListener('willFocus', payload => {this.load()});
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }

    load = () => {
        AsyncStorage.getItem(
            "pizzerias",
            function(inError, inPizzerias) {
                if (inPizzerias === null) {
                    inPizzerias = [];
                } else {
                    inPizzerias = JSON.parse(inPizzerias);
                }
                this.setState({listData: inPizzerias});
            }.bind(this)
        );
    }
}

HomeScreen.navigationOptions = {
    title: "Order and Rate",
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        margin: 0,
        alignItems: 'center'
    },
    contentContainer: {
        width: '100%',
    },
    instructionText: {
        padding: 10
    },
    pizzeriaList: {
        flex: 1,
        width: '100%'
    },
    ratingPane: {
        flex: 1,
        alignItems: 'center'
    }
});

export default HomeScreen;