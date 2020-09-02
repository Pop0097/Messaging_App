import React from 'react';
import { View } from 'react-native';

import Navigator from './routes/switch'; //gets app countainer
import { StateProvider } from "./stateprovider";

function App() {
    return (
        <StateProvider>
          < Navigator />
        </StateProvider>
    );
}

export default App;