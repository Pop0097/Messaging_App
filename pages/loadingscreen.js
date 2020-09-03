import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import db, { provider, auth } from '../firebase';
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
            <View>
                <ActivityIndicator size="large" />
            </View>
        )
    }

}

export default LoadingScreen;
 