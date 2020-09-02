import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import db, { provider, auth } from '../firebase';
import { useStateValue } from '../stateprovider';
import { MaterialIcons } from '@expo/vector-icons';
import ChatForm from '../components/chatform';
import UserCard from '../components/usercard';

function SearchList({ navigation }) {

    const [{ userDoc, search }, dispatch] = useStateValue(); 
    const [searchResults, setSearchResults] = useState([]);

    //Trying to get the search feature to work so we can create a chat. 

    console.log("Search ", search);

    var userRef = db.collection("users");
    var query = userRef.where("email", '==', search).limit(10);

    useEffect(() => {
        query.onSnapshot((snapshot) =>
        setSearchResults(snapshot.docs.map((doc) => doc.data()))
        );
    }, [searchResults]);

    return(
        <View>

            <Text>This is Search!!</Text>
            {searchResults.map((user) => (
                <View>
                    <Text>Result: {user.email}</Text> 
                </View>
            ))}
        </View>
    );
}

export default SearchList;

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