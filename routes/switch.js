//Use switch navigtion to move between landing page (authentication) and chat page 

import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import { createAppContainer } from 'react-navigation';

import AuthenticatedDrawer from './drawer';
import LandingStack from './landingstack';

const switcher = createSwitchNavigator(
    {
        LandingStack: LandingStack,
        AuthenticatedDrawer: AuthenticatedDrawer,
    },
    {
        initialRouteName: 'LandingStack'
    }
)

export default createAppContainer(switcher);