import React from 'react';
import { Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { HeaderStyles } from '../styles/headerstyle';

function Header({ navigation, title }) {
    
    const openMenu = () => { 
        navigation.openDrawer();
      }
    
    return(
        <View style={HeaderStyles.HeaderContainer}>
            <MaterialIcons name='menu' size={28} onPress={openMenu} style={HeaderStyles.icon} />
            <View>
                <Text style={HeaderStyles.HeaderText}> { title } </Text>
            </View>
        </View>
    );
}

export default Header;