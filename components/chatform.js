import React from 'react';
import { StyleSheet, TextInput, View, Text, Button } from 'react-native';
import db from '../firebase';
import { Formik } from 'formik';
import * as yup from 'yup';

const chatSchema = yup.object({
    email: yup.string().required(),
})

function ChatForm({ createChat }) {
    return(
        <View>
            <Formik
                initialValues={{email: ''}}
                validationSchema={chatSchema}
                onSubmit={(values, actions) => {actions.resetForm(); createChat(values);}}
            >   
                {(props) => (
                    <View>
                        <TextInput 
                            placeholder="User Email"
                            onChangeText={props.handleChange('email')}
                            value={props.values.email}
                            onBlur={props.handleBlur('email')}
                        />

                        <Button color='maroon' title="Search" onPress={props.handleSubmit} />    
                    </View>
                )}
            </Formik>
        </View>
    );
}

export default ChatForm;