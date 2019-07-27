import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from "prop-types";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faPizzaSlice, faStar, faStoreAlt} from '@fortawesome/free-solid-svg-icons';

class HomePizzeria extends Component {
    render() {
        const {number, type, name, rating} = this.props;
        return (
            <View style={[styles.row, (number%2===0)?styles.evenRow:styles.oddRow]}>
                <FontAwesomeIcon style={styles.fontIcon} icon={(type==='Pizzeria')?faPizzaSlice:faStoreAlt} />
                <Text style={styles.text}>
                    {name}
                </Text>
                <FontAwesomeIcon style={styles.arrow} icon={ faStar }/>
            </View>
        );
    }
}

HomePizzeria.propTypes = {
    number: PropTypes.number.isRequired,
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