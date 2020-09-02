import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import db, { provider, auth } from '../firebase';


function ChatList({ navigation }) {
    return(
        <TouchableOpacity onPress={() => navigation.navigate("Chat")} >
            <View>
                <Text> This is the Chat List! </Text>
            </View>
        </TouchableOpacity>
    );
}

export default ChatList;
