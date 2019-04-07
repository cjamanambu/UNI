import React, {Component} from 'react';
import{
	Image,
	KeyboardAvoidingView,
	TouchableOpacity,
	StyleSheet,
	TextInput,
	View,
	Text,
	Alert,
	StatusBar,
	Button,
}from 'react-native';
import styles from '../assets/Styles.js';
import * as App from "../App";


export default class RegisterScene extends React.Component {

	state = {
		username: '',
		email: '',
		password: '',
		confirmedPassword: '',
	};

	//regist button, check whether regist successful based on input data
	onSubmit =() =>{
		const { username, email, password, confirmedPassword } = this.state;
		if (username !== '' && password !== '' && email !== '' && confirmedPassword !== '') {
			if (email.endsWith('@myumanitoba.ca')) {
				if (password === confirmedPassword){
					fetch(App.URL + "/users/signup", {
						method: "POST",
						body:  JSON.stringify({"username": username, "email": email, "password": password}),
						headers: {
							'Accept':       'application/json',
							'Content-Type': 'application/json',
						}
					})
						.then(res => res.json())
						.then(response => {
							if (response.success === true) {
								this.setState({token: response.token});
								this.props.navigation.navigate('CurrentActivitiesScreen', {
									email: this.state.email,
									token: this.state.token,
								});
								Alert.alert("You have successfully created a new account");
							}
							else {
								Alert.alert("Username annd Email address already exist!");
							}
						}
					)
				}
				else {
					Alert.alert("Confirmed password does not match password!");
				}
			}
			else {
				Alert.alert("Please use your @myumanitoba.ca email. Visit umanitoba.ca for more information.");
			}
		}
		else {
			Alert.alert("Please fill in all information");
		}
	};


	render() {
		return (
			<KeyboardAvoidingView behavior="padding" style={styles.logInContainer}>
					<View style={styles.logoContainer}>
						<Image style={styles.logo} source={require('../assets/images/Octocat.png')}/>
						<Text style={styles.title}>Uni.</Text>
					</View>
					<View style={styles.logInFormContainer}>
                	<StatusBar barStyle="light-content"/>
						<TextInput testID='usernameTextInput'
							ref = "username"
							onChangeText={(text) => this.setState({username: text})} //add value changing event
							style={styles.input}
							placeholder={'Username'}
							placeholderTextColor ={'#rgba(255,255,255,0.7)'}
							clearButtonMode="while-editing"
							returnKeyType="next"
							autoCapitalize='none' //cancel first letter capital
							autoCorrect={false}
							underlineColorAndroid={'transparent'} //cancel under line
						/>
						<TextInput testID='emailTextInput'
							ref = "emailAddress"
							onChangeText={(text) => this.setState({email: text})} //add value changing event
							style={styles.input}
							keyboardType="email-address"
							placeholder={'Email'}
							placeholderTextColor ={'#rgba(255,255,255,0.7)'}
							clearButtonMode="while-editing"
							returnKeyType="next"
							autoCapitalize='none' //cancel first letter capital
							autoCorrect={false}
							underlineColorAndroid={'transparent'} //cancel under line
						/>
						<TextInput testID='passwordTextInput'
							ref = "password"
							onChangeText={(text) => this.setState({password: text})} //add value changing event
							style={styles.input}
							secureTextEntry={true}
							placeholderTextColor ={'#rgba(255,255,255,0.7)'}
							placeholder={'Password'}
							returnKeyType="next"
							autoCapitalize='none' //cancel first letter capital
							underlineColorAndroid={'transparent'} //cancel under line
						/>
						<TextInput testID='confirmPasswordTextInput'
							ref = "confirmPassword"
							onChangeText={(text) => this.setState({confirmedPassword: text})} //add value changing event
							style={styles.input}
							placeholder={'Confirm password'}
							placeholderTextColor ={'#rgba(255,255,255,0.7)'}
							secureTextEntry={true}
							returnKeyType="join"
							autoCapitalize='none' //cancel first letter capital
							underlineColorAndroid={'transparent'} //cancel under line
						/>

					<TouchableOpacity testID='signUpButton'
						onPress={this.onSubmit}
						style={styles.buttonContainer}>
						<Text
							style={styles.buttonText}>Sign Up</Text>
					</TouchableOpacity>
					<Text style={styles.clickableText} onPress={() => this.props.navigation.navigate('LoginScreen')}>Already have a account? Log in!</Text>
					</View>
			</KeyboardAvoidingView>
		);
	}
}
