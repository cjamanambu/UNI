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
			<KeyboardAvoidingView behavior="padding" style={styles.signUpContainer}>
				<TouchableOpacity	//using touchable opacity as background
					activeOpacity={1.0}	//when clicked change active
					style={styles.signUpContainer}>

					<View style={styles.logoContainer}>
						<Image style={styles.logo} source={require('../assets/images/Octocat.png')}/>
						<Text style={styles.title}>Uni.</Text>
					</View>
					<View
						style={styles.inputBox}>
						<TextInput
							ref = "username"
							onChangeText={(text) => this.setState({username: text})} //add value changing event
							style={styles.signUpInput}
							placeholder={'Username'}
							placeholderTextColor ={'#ccc'}
							clearButtonMode="while-editing"
							returnKeyType="next"
							autoCapitalize='none' //cancel first letter capital
							autoCorrect={false}
							underlineColorAndroid={'transparent'} //cancel under line
						/>
					</View>
					<View
						style={styles.inputBox}>
						<TextInput
							ref = "emailAddress"
							onChangeText={(text) => this.setState({email: text})} //add value changing event
							style={styles.signUpInput}
							keyboardType="email-address"
							placeholder={'Email'}
							placeholderTextColor ={'#ccc'}
							clearButtonMode="while-editing"
							returnKeyType="next"
							autoCapitalize='none' //cancel first letter capital
							autoCorrect={false}
							underlineColorAndroid={'transparent'} //cancel under line
						/>
					</View>
					<View
						style={styles.inputBox}>
						<TextInput
							ref = "password"
							onChangeText={(text) => this.setState({password: text})} //add value changing event
							style={styles.signUpInput}
							secureTextEntry={true}
							placeholderTextColor ={'#ccc'}
							placeholder={'Password'}
							returnKeyType="next"
							autoCapitalize='none' //cancel first letter capital
							underlineColorAndroid={'transparent'} //cancel under line
						/>
					</View>
					<View
						style={styles.inputBox}>
						<TextInput
							ref = "confirmPassword"
							onChangeText={(text) => this.setState({confirmedPassword: text})} //add value changing event
							style={styles.signUpInput}
							placeholder={'Confirm password'}
							placeholderTextColor ={'#ccc'}
							secureTextEntry={true}
							returnKeyType="join"
							autoCapitalize='none' //cancel first letter capital
							underlineColorAndroid={'transparent'} //cancel under line
						/>
					</View>

					<TouchableOpacity
						onPress={this.onSubmit}
						style={styles.button}>
						<Text
							style={styles.btText}>Sign Up</Text>
					</TouchableOpacity>
					<Text style={styles.clickableText} onPress={() => this.props.navigation.navigate('LoginScreen')}>Already have a account? Log in!</Text>

				</TouchableOpacity>
			</KeyboardAvoidingView>
		);
	}
}
