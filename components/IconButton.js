import React, { Component } from "react";
import PropTypes from "prop-types";
import {TouchableOpacity, Text} from "react-native";
import {faEdit, faPizzaSlice, faStoreAlt, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";

class IconButton extends Component {
    render() {
        const { type, onPress, buttonStyle, width, disabled} = this.props;
        return (
            <TouchableOpacity
                style={ [
                    { padding : 10, height : 50, borderRadius : 8, margin : 10,
                        width : width,
                        backgroundColor :
                            disabled != null && disabled === "true" ? "#e0e0e0" : "#303656",
                    },
                    buttonStyle
                ] }
                onPress={
                    () => { if (disabled == null || disabled === "false") { onPress() } }
                }
            >
                <FontAwesomeIcon style={{flex: 1, justifyContent: 'center', alignItems: 'center', margin: 7, color: '#ffffff'}} icon={(type==='edit')?faEdit:faTrash} />
            </TouchableOpacity>
        );
    }
}

IconButton.propTypes = {
    type: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    buttonStyle: PropTypes.object,
    width: PropTypes.string,
    disabled: PropTypes.string
};

export default IconButton;