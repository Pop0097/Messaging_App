import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import Landing from '../pages/landing';

import Header_No_Drawer from '../components/headernodrawer';

const screens = {
    Landing: {
        screen: Landing,
        navigationOptions: () => { //creates a function that returns the custom header compoenntn. This is done so header.js can access "navigation"
            return {
                headerTitle: () => <Header_No_Drawer title="Welcome to Message" />
            }
        }
    },
}

const LandingStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#f4f4f4',
        headerStyle: { backgroundColor: '#eee', height: 100, }
    }
});

export default LandingStack;