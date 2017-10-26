import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const TabIcon= ({ focused, title}) => {
    switch (title) {
        case "Upload":
            return <Icon
                        name={focused? "ios-add-circle" : "ios-add-circle-outline"}
                        size={30}
                        color={focused ? Colors.selected : Colors.notSelected }
                       />;
        case "Profile":
            return <Icon
                        name={focused? "ios-person" : "ios-person-outline"}
                        size={30}
                        color={focused ? Colors.selected : Colors.notSelected }
                        />;
        case "Feed":
            return <Icon
                        name={focused? "ios-home" : "ios-home-outline"}
                        size={30}
                        color={focused ? Colors.selected : Colors.notSelected } 
                        />;
    }
};

const Colors = {
    selected: "#4F8EF7",
    notSelected: "#d3d3d3"
};

export default TabIcon;
