import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import db, { provider, auth } from '../firebase';
import { useStateValue } from '../stateprovider';


function ChatList({ navigation }) {

    const [{ userDoc }, dispatch] = useStateValue(); 

    return(
        <TouchableOpacity onPress={() => navigation.navigate("Chat")} >
            <View>
                <Text> This is the Chat List! </Text>
                <Text>{ userDoc.name } </Text> 
            </View>
        </TouchableOpacity>
    );
}

export default ChatList;
