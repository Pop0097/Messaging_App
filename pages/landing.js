import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import db, { provider, auth } from '../firebase';


function Landing({ navigation }) {
    return(
        <TouchableOpacity onPress={() => navigation.navigate("AuthenticatedDrawer")} >
            <View>
                <Text> This is the Landing </Text>
            </View>
        </TouchableOpacity>
    );
}

export default Landing;
