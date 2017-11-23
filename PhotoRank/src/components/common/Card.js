import React from 'react';
import { View } from 'react-native';

const Card = (props) => (
    <View style={styles.containerStyle}>
        {props.children}
    </View>
);

const styles = {
    containerStyle: {
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#000000',
        borderBottomWidth: 2,
        elevation: 1,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10
    }
};

export { Card };
