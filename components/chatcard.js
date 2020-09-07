import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Card from './card'

function ChatCard({ navigation, chat, current_email }) {

    var chat_with;
    if(chat.userEmail1 === current_email) {
        chat_with = chat.userEmail1;
    } else {
        chat_with = chat.userEmail2;
    }
    
    return(
        <View>
            <Card>
                <View style={ChatCardStyles.container}>
                    <View style={ChatCardStyles.textArea}>
                        <Text> {chat_with} </Text>
                    </View>
                    </View>
            </Card>
        </View>
    )
}

export default ChatCard;

const ChatCardStyles = StyleSheet.create({
    container: {
      flexDirection: 'row',
  
    },
    image: {
      width: 40,
      height: 40,
      borderRadius: 20,
      margin: 10,
    },
    textArea: {
      paddingTop: 12,
      paddingBottom: 12,
    }
  })