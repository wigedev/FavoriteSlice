import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faStarExclamation } from '@fortawesome/pro-solid-svg-icons';

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <FontAwesomeIcon icon={faPhone} size={40} color={"#000000"}/>
            <ScrollView
                style={styles.orderList}
                contentContainerStyle={styles.contentContainer}>
                <View>
                    <Text>
                        This section of the app will list restaurants based on the most recent ratings. Selecting a
                        restaurant from this list will pop up a screen with details and ordering information.
                    </Text>
                </View>
            </ScrollView>
            <View style={styles.ratingPane}>
                <FontAwesomeIcon icon={faStarExclamation} size={40} color={"#000000"}/>
                <Text>
                    This section of the app will allow you to rate an ordered pizza from the selected restaurant. This will
                    include the ability to update information about the properties of the pizza, as well as other relevant notes
                    about the experience.
                </Text>
            </View>
        </View>
    );
}

HomeScreen.navigationOptions = {
    title: "Order and Rate",
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        margin: 5,
        alignItems: 'center'
    },
    contentContainer: {
        paddingTop: 30,
    },
    orderList: {
        flex: 1
    },
    ratingPane: {
        flex: 1,
        alignItems: 'center'
    }
});
