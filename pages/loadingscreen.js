import React, { Component } from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import firebase from 'firebase';

class LoadingScreen extends Component { 

    componentDidMount() {
        this.checkIfLoggedIn();
    }

    checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged(function(user) {
            if(user) {
                this.props.navigation.navigate("AuthenticatedDrawer");
            } else {
                this.props.navigation.navigate("LandingStack");
            }   
        }.bind(this))
    }

    render(){
        return(
            <View style={styles.container}>
                <ActivityIndicator size="large" />
                <Text>Loading App</Text> 
            </View>
        )
    }

}

export default LoadingScreen;
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});