import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import db, { provider, auth } from '../firebase';
import { useStateValue } from '../stateprovider';

import '../styles/landing.css';


function Landing({ navigation }) {

    //const [state, dispatch] = useStateValue();

    function getDocument(email) {
		return new Promise((resolve, reject) => {
			var userDocument;
			db.collection("users").doc(email).get().then(documentSnapshot => {
				if(documentSnapshot.exists) {
					userDocument = documentSnapshot.data(); 
					resolve(userDocument);
				} 
			});
		})
	}

    const authenticate = (event) => {
        auth.signInWithPopup(provider).then((result) => {
            db.collection("users").doc(result.user.email).get()
                .then((docSnapshot) => { //if user document already exists in Firestore

                    console.log(result)

                    if(docSnapshot.exists) {
                        var userDocument = docSnapshot.data();
                        dispatch({ //stores user document
                            type:"set_doc",
                            userDoc: userDocument,
                        });
                        dispatch({ //stores user profile picture
                            type: "set_pic",
                            userPic: userDocument.profilePicture,
                        }) 
                    } else { //if user doc does not already exist in Firestore (new user)
                        db.collection("users") //creates new user in database
							.doc(result.user.email)
							.set({
								name: result.user.displayName,
								email: result.user.email,
								profilePicture: result.user.photoURL,
							})
							.then(() => {
								getDocument(result.user.email).then((doc) => { //gets new user's document
									console.log("B", doc);
									dispatch({
										type: "set_pic",
										userPic: result.user.photoURL,
									});
									dispatch({
										type: "set_doc",
										userDoc: doc,
									});
								})
							})
                    }
                    navigation.navigate("AuthenticatedDrawer"); //goes to home page (chatlist.js)
                });
        });
    }

    return(
        <View className="LandingContainer">
            <TouchableOpacity onPress={authenticate}>
                <View className="Button-Google">
                    <Text className="ButtonText">Sign in with Google</Text>
                </View>
            </TouchableOpacity>
            <Text>If you do not have an account, you can still sign in using Google!</Text>
        </View>
    );
}

export default Landing; 
