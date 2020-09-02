import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import db, { provider, auth } from '../firebase';
import { useStateValue } from '../stateprovider';
import { MaterialIcons } from '@expo/vector-icons';
import ChatForm from '../components/chatform';
import UserCard from '../components/usercard';

function ChatList({ navigation }) {

    const [{ userDoc, search }, dispatch] = useStateValue(); 
    const [searchResults, setSearchResults] = useState([]);

    //Trying to get the search feature to work so we can create a chat. 
    const createChat = ({ email }) => {

        // console.log(email);

        dispatch({
            type:"set_search",
            search: email,
        })
        
        navigation.navigate("Search");
    }

    return(
        <View>
         
            <ChatForm createChat={createChat} />
            

            <TouchableOpacity onPress={() => navigation.navigate("Chat")} >
                <View>
                    <Text> This is the Chat List! </Text>
                </View>
            </TouchableOpacity>
            <Text>{ userDoc.name } </Text> 
        </View>
    );
}

export default ChatList;

const styles = StyleSheet.create({
    modalContent: {
      padding: 20,
      flex: 1,
    },
    modalToggle: {
      marginBottom: 10,
      alignSelf: 'center'
    },
    modalClose: {
      marginTop: 30,
      marginBottom: 0,
    }
  })