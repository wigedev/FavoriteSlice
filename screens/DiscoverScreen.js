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
import MapView from 'react-native-maps';

export default function DiscoverScreen() {
    return (
        <View style={styles.container}>
            <MapView style={styles.map} showsUserLocation={true} initialRegion={initialRegion} />
            <View style={styles.instructions}>
                <Text>
                    Select a pizzeria on the map above to add that pizzeria to your list of locations. Any available
                    information including name, physical address and phone number will be added to the listing
                    automatically.
                </Text>
            </View>
        </View>
    );
}

DiscoverScreen.navigationOptions = {
    title: "Discover New Pizza!",
};

const initialRegion = {
    latitude: 37.3230,
    longitude: -122.0322,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0922
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    contentContainer: {
        paddingTop: 30,
    },
    map: {
        flex: 3,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    instructions: {
        flex: 1,
        fontSize: 14,
        color: '#2e78b7',
        margin: 30
    },
});
