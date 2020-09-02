import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import ChatList from '../pages/chatlist';
import Chat from '../pages/chat';

import Header from '../components/header';
import Header_No_Drawer from '../components/headernodrawer';

const screens = {
    ChatList: {
        screen: ChatList,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title="Message" />
            }
        }
    },
    Chat: {
        screen: Chat,
        navigationOptions: () => {
            return {
                headerTitle: () => <Header_No_Drawer title="Chat" />
            }
        }
    }
}

const ChatStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#f4f4f4',
        headerStyle: { backgroundColor: '#eee', height: 100, }
    }
});

export default ChatStack;