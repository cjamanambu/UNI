import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    KeyboardAvoidingView,
    StatusBar
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../../components/StyledText';

export default class LogInForm extends React.Component {
    state = {
        email: '',
        password: ''
    };

    handleEmail = (text) => {
        this.setState({ email: text })
    };

    handlePassword = (text) => {
        this.setState({ password: text })
    };

    submitInformation = (email, pass) => {
        alert('email: ' + email + ' password: ' + pass)
    };


    render() {
        return(
            <View style={styles.container}>
                <StatusBar barStyle="light-content"/>
                <TextInput
                    style={styles.input}
                    placeholder="email"
                    placeholderTextcolor="rgba(255,255,255,0.7)"
                    returnKeyType="next"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onSubmitEditing={() => this.passwordInput.focus()}
                    onChangeText = {this.handleEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="password"
                    placeholderTextcolor="rgba(255,255,255,0.7)"
                    secureTextEntry
                    returnKeyType="go"
                    ref={(input) => this.passwordInput = input}
                    onChangeText = {this.handlePassword}
                />

                <TouchableOpacity style={styles.buttonContainer} onPress = {() => this.submitInformation(this.state.email, this.state.password)}>
                    <Text style={styles.buttonText}>LOG IN</Text>
                </TouchableOpacity>
                <Text style={styles.clickableText} onPress={() => Linking.openURL('google.com')}>Not a member yet? Sign up!</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        marginBottom: 10,
        color: '#FFFFFF',
        paddingHorizontal: 10,
    },
    buttonContainer: {
        backgroundColor: '#2980b9',
        paddingVertical: 15
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700',
    },
    clickableText: {
        color: '#FFF',
        textDecorationLine: 'underline',
        textAlign: 'center',
        paddingVertical: 15,
        fontSize: 20,
    }
});