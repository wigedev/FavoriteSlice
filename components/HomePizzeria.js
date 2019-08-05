import React, {Component} from 'react';
import {AsyncStorage, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from "prop-types";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faPizzaSlice, faQuestion, faStoreAlt, faTruck} from '@fortawesome/free-solid-svg-icons';
import StarRating from "react-native-star-rating";
import CustomButton from "./CustomButton";

class HomePizzeria extends Component {
    state = {modalVisible: false, rating: this.props.rating};

    static getRestaurantIcon(type) {
        if (type === 'Pizzeria') return faPizzaSlice;
        if (type === 'Italian Restaurant') return faStoreAlt;
        if (type === 'Food Truck') return faTruck;
        return faQuestion;
    }

    onStarRatingPress(rating, entryKey) {
        AsyncStorage.getItem("pizzerias",
            function(inError, inPizzerias) {
                // Load the records
                if (inPizzerias === null) {
                    inPizzerias = [ ];
                } else {
                    inPizzerias = JSON.parse(inPizzerias);
                }
                // Retrieve and delete the existing record
                let original = {};
                for (let i = 0; i < inPizzerias.length; i++) {
                    const restaurant = inPizzerias[i];
                    if (restaurant.key === entryKey) {
                        original = restaurant;
                        inPizzerias.splice(i, 1);
                        break;
                    }
                }
                // Edit the record
                original.rating = rating;
                // Save the updated record
                inPizzerias.push(original);
                // Save the changes
                AsyncStorage.setItem("pizzerias",
                    JSON.stringify(inPizzerias), null);
            }.bind(this)
        );
        // Update the display
        this.setState({rating: rating, refresh: !this.state.refresh});
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        const {number, itemKey, type, name, rating, phone, website, address} = this.props;
        return (
            <TouchableOpacity style={[styles.row, (number%2===0)?styles.evenRow:styles.oddRow]} onPress={()=> {this.setModalVisible(true)}}>
                <FontAwesomeIcon style={styles.fontIcon} icon={HomePizzeria.getRestaurantIcon(type)} />
                <Text style={styles.text}>
                    {name}
                </Text>

                <StarRating
                    disabled={true}
                    emptyStar={'ios-star-outline'}
                    fullStar={'ios-star'}
                    fullStarColor={"red"}
                    halfStar={'ios-star-half'}
                    iconSet={'Ionicons'}
                    maxStars={5}
                    rating={this.state.rating}
                    starSize={15}
                />
                <Modal animationType={"slide"}
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={()=>{
                        Alert.alert('Modal has been closed');
                    }
                    }>
                    <View style={{marginTop: 50, marginLeft: 25, marginRight: 25}}>
                        <View>
                            <Text>Name: {name}</Text>
                            <Text>Phone: {phone}</Text>
                            <Text>Website: {website}</Text>
                            <Text>Address:</Text>
                            <Text style={{margin: 75}}>{address}</Text>
                        </View>
                        <View>
                            <StarRating
                                disabled={false}
                                emptyStar={'ios-star-outline'}
                                fullStar={'ios-star'}
                                fullStarColor={"red"}
                                halfStar={'ios-star-half'}
                                iconSet={'Ionicons'}
                                maxStars={5}
                                rating={this.state.rating}
                                selectedStar={(rating) => this.onStarRatingPress(rating, itemKey)}
                            />
                        </View>
                        <CustomButton onPress={()=> {this.setModalVisible(false)}} text={"DONE"} />
                    </View>
                </Modal>
            </TouchableOpacity>
        );
    }
}

HomePizzeria.propTypes = {
    number: PropTypes.number.isRequired,
    itemKey: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    evenRow: {
        backgroundColor: '#effcf7',
    },
    oddRow: {
        backgroundColor: '#ffffff',
    },
    fontIcon: {
        flex: 1,
        margin: 20
    },
    text: {
        flex: 6,
        fontSize: 20,
        marginBottom: 8,
        marginTop: 8,
        textAlign: 'left'
    },
    arrow: {
        flex: 1,
        color: 'red',
        marginRight: 10
    }
});

export default HomePizzeria;