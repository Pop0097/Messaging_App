import React from 'react';
import { Text, View } from 'react-native';
import { HeaderStyles } from '../styles/headerstyle';


function Header({ title }) {
    return(
        <View style={HeaderStyles.HeaderContainer}>
            <View>
                <Text style={HeaderStyles.HeaderText}> { title } </Text>
            </View>
        </View>
    );
}

export default Header;