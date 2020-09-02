import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import ChatList from '../pages/chatlist';
import Chat from '../pages/chat';
import SearchList from '../pages/search';

import Header from '../components/header';

const screens = {
    ChatList: {
        screen: ChatList,
        navigationOptions: ({ navigation }) => {
            return {
                headerTitle: () => <Header navigation={navigation} title="Message" drawer="true" />
            }
        }
    },
    Chat: {
        screen: Chat,
        navigationOptions: () => {
            return {
                headerTitle: () => <Header title="Chat" drawer="false"/>
            }
        }
    },
    Search: {
        screen: SearchList,
        navigationOptions: () => {
            return {
                headerTitle: () => <Header title="Search" drawer="false"/>
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