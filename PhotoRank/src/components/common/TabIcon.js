import React from 'react';
import { Text } from 'react-native';

const TabIcon = ({ selected, title }) => {
    return (
        <Text style={{ color: selected ? 'red' : 'black '}}>{title + '!'}</Text>
    );
}

const styles = {
    textStyle: {
        fontSize: 18
    }
};

export { TabIcon };
