import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import CustomButton from "../components/CustomButton";
import CustomTextInput from "../components/CustomTextInput";
import {
    Alert,
    AsyncStorage,
    BackHandler,
    FlatList,
    Picker,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import StackNavigator from "react-navigation";
import {Root, Toast} from "native-base";
import Constants from "expo-constants";
import { MonoText } from '../components/StyledText';
import IconButton from "../components/IconButton";

/**
 * The base listing of pizzerias, which contains a button to add additional pizzerias
 */
class ListScreen extends React.Component {
    constructor(inProps) {
        super(inProps);
        this.state = {listData: [], refresh: false};
    }

    render() {
        return (
            <Root>
                <View style={styles.listScreenContainer}>
                    <CustomButton text={"Add Pizzeria"} width={"94%"} onPress={() => {
                        this.props.navigation.navigate("AddScreen");
                    }} />
                    <FlatList
                        style={styles.pizzeriaList}
                        data={this.state.listData.sort((a, b) => a.name.localeCompare(b.name))}
                        extraData={this.state.refresh}
                        renderItem={({item}) =>
                            <View style={styles.pizzeriaContainer}>
                                <Text style={styles.pizzeriaName}>{item.name}</Text>
                                <IconButton
                                    type={'edit'}
                                    onPress={() => {
                                        Alert.alert("NYI", "This feature is coming soon.");// TODO: This. Yay.
                                    }} />
                                <IconButton
                                    type={'delete'}
                                    onPress={() => {
                                        Alert.alert(
                                            "Please confirm",
                                            "Are you sure you want to delete this pizzeria?",
                                            [
                                                {
                                                    text: "Yes", onPress: () => {
                                                        // Pull data out of storage.
                                                        AsyncStorage.getItem("pizzerias",
                                                            function (inError, inPizzerias) {
                                                                if (inPizzerias === null) {
                                                                    inPizzerias = [];
                                                                } else {
                                                                    inPizzerias = JSON.parse(inPizzerias);
                                                                }
                                                                // Find the right one to delete and splice it out.
                                                                for (let i = 0; i < inPizzerias.length; i++) {
                                                                    const restaurant = inPizzerias[i];
                                                                    if (restaurant.key === item.key) {
                                                                        inPizzerias.splice(i, 1);
                                                                        break;
                                                                    }
                                                                }
                                                                // Store updated data in storage.
                                                                AsyncStorage.setItem("pizzerias",
                                                                    JSON.stringify(inPizzerias), function () {
                                                                        // Set new state to update list.
                                                                        this.setState({listData: inPizzerias});
                                                                        // Show toast message to confirm deletion.
                                                                        Toast.show({
                                                                            text: "Pizzeria deleted",
                                                                            position: "bottom",
                                                                            type: "danger",
                                                                            duration: 2000
                                                                        });
                                                                    }.bind(this)
                                                                );
                                                                this.setState({refresh: !this.state.refresh});
                                                            }.bind(this)
                                                        );
                                                    }
                                                },
                                                {text: "No"},
                                                {text: "Cancel", style: "cancel"}
                                            ],
                                            {cancelable: true}
                                        )
                                    }}/>
                            </View>
                        }
                    />
                </View>
            </Root>
        )
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

class AddScreen extends React.Component {
    constructor(inProps) {
        super(inProps);
        this.state = {
            name: "",
            type: "",
            address: "",
            phone: "",
            website: "",
            rating: 0,
            key: `r_${new Date().getTime()}`
        };
    }

    render() {
        return (
            <ScrollView style={styles.addScreenContainer}>
                <View style={styles.addScreenInnerContainer}>
                    <View style={styles.addScreenFormContainer}>
                        <CustomTextInput label={"Name"} stateHolder={this} stateFieldName={"name"} maxLength={50} />
                        <Text style={styles.fieldLabel}>Establishment Type</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                style={styles.picker}
                                selectedValue={this.state.type}
                                prompt="Type"
                                onValueChange={
                                    (inItemValue) => this.setState({ type : inItemValue })
                                }
                            >
                                <Picker.Item label="" value="" />
                                <Picker.Item label="Pizzeria" value="Pizzeria" />
                                <Picker.Item label="Italian Restaurant" value="Italian Restaurant" />
                                <Picker.Item label="Food Truck" value="Food Truck" />
                                <Picker.Item label="Other" value="Other" />
                            </Picker>
                        </View>
                        <CustomTextInput label={"Address"} stateHolder={this} stateFieldName={"address"} maxLength={100} />
                        <CustomTextInput label={"Phone"} stateHolder={this} stateFieldName={"phone"} maxLength={20} />
                        <CustomTextInput label={"Website"} stateHolder={this} stateFieldName={"website"} maxLength={75} />
                        <Text style={styles.fieldLabel}>Rating</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                style={styles.picker}
                                selectedValue={this.state.rating}
                                prompt="Rating"
                                onValueChange={
                                    (inItemValue) => this.setState({ rating : inItemValue })
                                }
                            >
                                <Picker.Item label="" value={0} />
                                <Picker.Item label="1" value={1} />
                                <Picker.Item label="2" value={2} />
                                <Picker.Item label="3" value={3} />
                                <Picker.Item label="4" value={4} />
                                <Picker.Item label="5" value={5} />
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.addScreenButtonsContainer}>
                        <CustomButton
                            text="Cancel"
                            width="44%"
                            onPress={
                                () => { this.props.navigation.navigate("ListScreen"); }
                            }
                        />
                        <CustomButton
                            text="Save"
                            width="44%"
                            onPress={ () => {
                                AsyncStorage.getItem("pizzerias",
                                    function(inError, inPizzerias) {
                                        if (inPizzerias === null) {
                                            inPizzerias = [ ];
                                        } else {
                                            inPizzerias = JSON.parse(inPizzerias);
                                        }
                                        inPizzerias.push(this.state);
                                        AsyncStorage.setItem("pizzerias",
                                            JSON.stringify(inPizzerias), function() {
                                                this.props.navigation.navigate("ListScreen");
                                            }.bind(this)
                                        );
                                    }.bind(this)
                                );
                                this.setState({refresh: !this.state.refresh});
                            } }
                        />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

/**
 * Set up stack navigator to display the screen and subscreens
 * @type {NavigationContainer}
 */
const RestaurantScreen = StackNavigator.createStackNavigator(
    {
      ListScreen: {screen: ListScreen, navigationOptions: ({ navigation }) => ({
              title: 'Manage Pizzerias',
          })},
      AddScreen: {screen: AddScreen, navigationOptions: ({ navigation }) => ({
              title: 'Add Pizzeria',
          })}
    },
    {
      headerTitle: "Manage Pizzerias",
      initialRouteName: "ListScreen"
    }
);

/**
 * Create the stylesheet for use in the pages
 * @type {*|{}}
 */
const styles = StyleSheet.create({
    listScreenContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    pizzeriaList: {
        width: "94%"
    },
    pizzeriaContainer: {
        flexDirection: "row",
        marginTop: 4,
        marginBottom: 4,
        borderColor: "#e0e0e0",
        borderBottomWidth: 2,
        alignItems: "center"
    },
    pizzeriaName: {
        flex: 1
    },
    addScreenContainer: {marginTop: Constants.statusBarHeight},
    addScreenInnerContainer: {
        flex: 1,
        alignItems: "center",
        paddingTop: 20,
        width: "100%"
    },
    addScreenFormContainer: {width: "96%"},
    fieldLabel: {marginLeft: 10},
    pickerContainer: {
        ...Platform.select({
            ios: {},
            android: {
                width: "96%",
                borderRadius: 8,
                borderColor: "#c0c0c0",
                borderWidth: 2,
                marginLeft: 10,
                marginBottom: 20,
                marginTop: 10
            }
        })
    },
    picker: {
        ...Platform.select({
            ios: {
                width: "96%",
                borderRadius: 8,
                borderColor: "#c0c0c0",
                borderWidth: 2,
                marginLeft: 10,
                marginBottom: 20,
                marginTop: 4
            },
            android: {}
        })
    },
    addScreenButtonsContainer: {
        flexDirection: "row",
        justifyContent: "center"
    }
});

export default RestaurantScreen;
