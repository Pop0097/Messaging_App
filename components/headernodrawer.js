import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import '../styles/header.css';

function Header({ title }) {
    
    const openMenu = () => { 
        navigation.openDrawer();
    }
    
    return(
        <View className="HeaderContainer">
            <View>
                <Text className="HeaderText"> { title } </Text>
            </View>
        </View>
    );
}

export default Header;

const styles = StyleSheet.create({
    icon: {
      position: 'absolute',
      left: 16,
    }
});