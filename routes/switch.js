//Use switch navigtion to move between landing page (authentication) and chat page 

import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import { createAppContainer } from 'react-navigation';

import AuthenticatedDrawer from './drawer';
import LandingStack from './landingstack';
import LoadingScreen from '../pages/loadingscreen.js';

const switcher = createSwitchNavigator(
    {
        LoadingScreen: LoadingScreen,
        LandingStack: LandingStack,
        AuthenticatedDrawer: AuthenticatedDrawer,
    }
)

export default createAppContainer(switcher);