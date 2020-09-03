import React, { Component } from 'react';
import db, { provider, auth } from '../firebase';
import { useStateValue } from '../stateprovider';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'; 
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';

class Landing extends Component {

    // const [state, dispatch] = useStateValue();

    isUserEqual = (googleUser, firebaseUser) => {
        if (firebaseUser) {
            var providerData = firebaseUser.providerData;
            for (var i = 0; i < providerData.length; i++) {
                if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                    providerData[i].uid === googleUser.getBasicProfile().getId()) {
                    // We don't need to reauth the Firebase connection.
                    return true;
                }
            }
        }
        return false;
    }

    onSignIn = (googleUser) => {
        console.log('Google Auth Response', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
            unsubscribe();
            // Check if we are already signed-in Firebase with the correct user.
            if (!this.isUserEqual(googleUser, firebaseUser)) {
                // Build Firebase credential with the Google ID token.
                var credential = firebase.auth.GoogleAuthProvider.credential(
                    googleUser.id_token,
                    googleUser.accessToken,
                );
                // Sign in with credential from the Google user.
                firebase.auth().signInWithCredential(credential)
                    .then(function(result) {
                        console.log("User signed in");

                        if(result.additionalUserInfo.isNewUser) {
                            db.collection("users").doc(result.user.email).set({
                                email: result.user.email,
                                username: result.user.email.substr(0, result.user.email.indexOf("@")),
                                name: result.additionalUserInfo.profile.name,
                                firstName: result.additionalUserInfo.profile.given_name,
                                profilePicture: result.additionalUserInfo.profile.picture,
                                created_at: Date.now(),
                                last_logged_in: Date.now(),
                            })
                            .then(function(snapshot) {
                                console.log("Snapshot: ", snapshot);
                            })
                        } else {
                            db.collection("users").doc(result.user.email).update({
                                last_logged_in: Date.now(),
                            })
                        }
                    }).catch(function(error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        // The email of the user's account used.
                        var email = error.email;
                        // The firebase.auth.AuthCredential type that was used.
                        var credential = error.credential;
                        // ...
                    });
            } else {
                console.log('User already signed-in Firebase.');
            }
        }.bind(this));
    }

    signInWithGoogleAsync = async() => {
        try {
            const result = await Google.logInAsync({
                //androidClientId: YOUR_CLIENT_ID_HERE,
                iosClientId: '273684385181-luhq2ienlkmsivsjg03gq5npm1p36l7n.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
                behavior: 'web',
            });
        
            if (result.type === 'success') {
                this.onSignIn(result);
                return keys.accessToken;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        }
    }
      

    // function getDocument(email) {
	// 	return new Promise((resolve, reject) => {
	// 		var userDocument;
	// 		db.collection("users").doc(email).get().then(documentSnapshot => {
	// 			if(documentSnapshot.exists) {
	// 				userDocument = documentSnapshot.data(); 
	// 				resolve(userDocument);
	// 			} 
	// 		});
	// 	})
	// }

    // const authenticate = (event) => {
    //     auth.signInWithPopup(provider).then((result) => {
    //         db.collection("users").doc(result.user.email).get()
    //             .then((docSnapshot) => { //if user document already exists in Firestore

    //                 console.log(result)

    //                 if(docSnapshot.exists) {
    //                     var userDocument = docSnapshot.data();
    //                     dispatch({ //stores user document
    //                         type:"set_doc",
    //                         userDoc: userDocument,
    //                     });
    //                     dispatch({ //stores user profile picture
    //                         type: "set_pic",
    //                         userPic: userDocument.profilePicture,
    //                         userStatus: true,
    //                     }) 
    //                 } else { //if user doc does not already exist in Firestore (new user)
    //                     var uname = result.user.email.substr(0, result.user.email.indexOf("@"));
    //                     console.log(uname);

    //                     db.collection("users") //creates new user in database
	// 						.doc(result.user.email)
	// 						.set({
    //                             name: result.user.displayName,
    //                             username: uname,
	// 							email: result.user.email,
	// 							profilePicture: result.user.photoURL,
	// 						})
	// 						.then(() => {
	// 							getDocument(result.user.email).then((doc) => { //gets new user's document
	// 								console.log("B", doc);
	// 								dispatch({
	// 									type: "set_pic",
    //                                     userPic: result.user.photoURL,
    //                                     userStatus: true,
	// 								});
	// 								dispatch({
	// 									type: "set_doc",
	// 									userDoc: doc,
	// 								});
	// 							})
	// 						})
    //                 }
    //                 navigation.navigate("AuthenticatedDrawer"); //goes to home page (chatlist.js)
    //             });
    //     });
    // }

    render() {
        return(
            <View style={LandingStyles.LandingContainer}>
                <TouchableOpacity onPress={() => this.signInWithGoogleAsync()}>
                    <View style={LandingStyles.ButtonGoogle}>
                        <Text style={LandingStyles.ButtonText}>Sign in with Google</Text>
                    </View>
                </TouchableOpacity>
                <Text>If you do not have an account, you can still sign in using Google!</Text>
            </View>
        );
    }
}

export default Landing; 

const LandingStyles = StyleSheet.create({
    LandingContainer: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ButtonGoogle: {
        marginTop: 50,
        minWidth: 300,
        width: '80%',
        backgroundColor: '#b0b0b0',
        textAlign: 'center',
        padding: 15,
        borderRadius: 7,
    },
    ButtonText: {
        fontSize: 18,
    }
});