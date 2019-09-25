import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPizzaSlice, faSearchLocation, faStoreAlt } from '@fortawesome/free-solid-svg-icons';
import { faDebug} from '@fortawesome/pro-solid-svg-icons';

import HomeScreen from '../screens/HomeScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import RestaurantScreen from '../screens/RestaurantScreen';
import SettingsScreen from '../screens/SettingsScreen';

const config = Platform.select({
    web: {headerMode: 'screen'},
    default: {},
});

const HomeStack = createStackNavigator(
    {
        Home: HomeScreen,
    },
    config
);
HomeStack.navigationOptions = {
    tabBarLabel: 'Order & Rate',
    tabBarIcon: ({focused}) => (
        <FontAwesomeIcon icon={ faPizzaSlice } color={focused?"#2f95dc":"#cccccc"} size={20} />
    ),
};
HomeStack.path = '';

// const DiscoverStack = createStackNavigator(
//     {
//         Discover: DiscoverScreen,
//     },
//     config
// );
// DiscoverStack.navigationOptions = {
//     tabBarLabel: 'Discover',
//     tabBarIcon: ({focused}) => (
//         <FontAwesomeIcon icon={ faSearchLocation } color={focused?"#5FA3FF":"#a5a5a5"} size={20} />
//     ),
// };

const RestaurantStack = RestaurantScreen;
RestaurantStack.navigationOptions = {
    tabBarLabel: 'Manage Pizzerias',
    tabBarIcon: ({focused}) => (
        <FontAwesomeIcon icon={ faStoreAlt } color={focused?"#5FA3FF":"#a5a5a5"} size={20} />
    ),
};

/**
 * TODO: Remove me before launch
 */
// const SettingsStack = createStackNavigator(
//     {
//         Settings: SettingsScreen,
//     },
//     config
// );
// SettingsStack.navigationOptions = {
//     tabBarLabel: 'Debugging',
//     tabBarIcon: ({focused}) => (
//         <FontAwesomeIcon icon={ faDebug } color={focused?"#5FA3FF":"#a5a5a5"} />
//     ),
// };
// SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
    HomeStack,
    //DiscoverStack,
    RestaurantStack,
    //SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
