import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import db, { provider, auth } from '../firebase';
import { useStateValue } from '../stateprovider';
import { MaterialIcons } from '@expo/vector-icons';
import ChatForm from '../components/chatform';
import UserCard from '../components/usercard';

function ChatList({ navigation }) {

    const [{ userDoc }, dispatch] = useStateValue(); 
    const [searchResults, setSearchResults] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    //Trying to get the search feature to work so we can create a chat. 
    const findUsers = ({ email }) => {

        setSearchResults([]);
        
        var userRef = db.collection("users");
        var query = userRef.where("search_keys", "array-contains", email).limit(25);
        query.onSnapshot((snapshot) =>
            setSearchResults(snapshot.docs.map((doc) => doc.data()))
        );
    }

    const createChat = (receiver) => {
        
    }

    // const displayCard = (searchedUser) => {
    //     if(searchedUser.email !== userDoc.email) {
    //         return (
    //             <View>
    //                 <TouchableOpacity onPress={createChat(searchedUser)}>
    //                     <UserCard user={searchedUser} /> 
    //                 </TouchableOpacity>
    //             </View>
    //         )
    //     }
    // }

    const closeModal = () => {
        setModalIsOpen(false);
        setSearchResults([]);
    }

    return(
        <View>
            
            <Modal visible={modalIsOpen} animationType="slide">
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.modalContent}>
                        <MaterialIcons style={{...styles.modalToggle, ...styles.modalClose}} name="close" size={30} onPress={closeModal} />
                        <ChatForm findUsers={findUsers} />
                        
                        {searchResults.map((user) => (
                            <View>
                                <TouchableOpacity onPress={createChat(user)}>
                                    <UserCard user={user} /> 
                                </TouchableOpacity>
                            </View>
                        ))}

                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <MaterialIcons style={styles.modalToggle} name='add' size={30} onPress={() => setModalIsOpen(true)}/>

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