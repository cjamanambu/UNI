import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';

import{
	Image,
	Platform,
	KeyboardAvoidingView,
	TouchableOpacity,
	StyleSheet,
	TextInput,
	View,
	Text,
	Alert,
	Button,
	ScrollView
}from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker'
import styles from '../assets/Styles.js';
import * as App from '../App';

// const URL = 'http://ec2-99-79-39-110.ca-central-1.compute.amazonaws.com:8000';

export default class NewActivityScreen extends React.Component {

	//3.15 add variable token to store token

	constructor(props){
		super(props);

		const {navigation} = this.props;
		//console.log("Token: " + navigation.getParam("token"));
		const USER_DETAILS ={
			token : navigation.getParam("token")
		};
		console.log("Token: " + USER_DETAILS.token);
		this.state = {
			apiData:[],
			time: this.datetime,
			selectedCategory: "",
		}
		this.token = USER_DETAILS.token;
		this.name= '';
		this.location= '';
		this.time='';
		this.numberOfPeople='';
		this.description = '';
		this.category = '';
	}





	/**when value in inputBox changed, save changed value
	 */
	onNameChanged = (newName) => {
		console.log(newName);
		this.name = newName;
	};

	onLocationChanged = (newLocation) => {
		console.log(newLocation);
		this.location = newLocation;
	};

	onTimeChanged = (newTime) => {
		console.log(newTime);
		this.setState({time: newTime});
		this.time = newTime;
		console.log(this.time);

	};

	onNumberOfPeopleChanged = (newNumberOfPeople) => {
		console.log(newNumberOfPeople);
		this.numberOfPeople = parseInt(newNumberOfPeople);
	};

	onDescriptionChanged = (newDescription) => {
		console.log(newDescription);
		this.description = newDescription;
	};
	onCategoryChanged = (newCategory) =>{
		console.log(newCategory);
		this.setState({selectedCategory:newCategory});
		this.category = newCategory;
		console.log(this.category);
	}

	createAct =() =>{

		if (this.name != '' && this.location != '' && this.time != ''){
			if (this.numberOfPeople == '') {
				this.numberOfPeople = 10;
			}
			if (this.description == '') {
				this.description = "default"
			}
			//send  message
			//***************add event here*****************
			this.sendRequest();
			//need go back to acts menu
		}
		else {
			Alert.alert("You missed something!");
		}
	};

	sendRequest = (enableCallback) => {
		AsyncStorage.getItem("AuthToken").then(token => {
			fetch(App.URL + '/activities/activity/create',{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'Authorization' : token,
				},
				body: JSON.stringify({
					'attendence_list': [],
					'category': this.category.toUpperCase(),
					'activity_datetime': this.time,
					'max_attendance':this.numberOfPeople,
					'description': this.description,
					'title': this.name,
					'location': this.location
				})
			})
			.then((response) => response.json())
			.then((responseJson) => {
				console.log(responseJson);
				if (responseJson.success == true) {
					console.log(responseJson);
					Alert.alert("Create Activity Success!");
					//jump back to current Act Screen
					this.props.navigation.navigate('CurrentActivitiesScreen');
				} else {
					console.log(responseJson);
					Alert.alert("Fail to Create Activity");
				}

			})
			.catch((error) => {
				console.error(error);
			});
		}).catch(error => console.log(error))
	};


	render(){

		let activityTypes = [{value: 'Sports'}, {value: 'Study'}, {value: 'Dance'}, {value: 'Politics'}, {value: 'Art'}, {value: 'Music'}];

		return (
			<TouchableOpacity	//using touchable opacity as background
				activeOpacity={1.0}	//when clicked change active
				//onPress={this.blurTextInput} //add click event
				style={styles.signUpContainer}>
				<KeyboardAvoidingView behavior = "padding" keyboardVerticalOffset={250} style = {styles.signUpContainer}>
					<View style={styles.logoContainer}>
						<Text style={styles.title}>Create Activity</Text>
					</View>
					<View
						style={styles.inputBox}>
						<TextInput
							ref = "name"
							onChangeText={this.onNameChanged} //add value changing event
							style={styles.signUpInput}
							placeholder={'Name of Activity'}
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
							ref = "location"
							onChangeText={this.onLocationChanged} //add value changing event
							style={styles.signUpInput}
							placeholder={'Location of Activity'}
							placeholderTextColor ={'#ccc'}
							clearButtonMode="while-editing"
							returnKeyType="next"
							autoCapitalize='none' //cancel first letter capital
							autoCorrect={false}
							underlineColorAndroid={'transparent'} //cancel under line
						/>
					</View>

					<View style={styles.dropdown}>
						<View style={{ flex: 1 }}>
							<Dropdown
								label='Activity Type'
								data={activityTypes}
								// onChangeText={value => {this.componentDidUpdate(this.props)}}
								onChangeText={this.onCategoryChanged}
							/>
						</View>
					</View>


					<DatePicker
						style={{width:200}}
						date ={this.state.time}
						mode="datetime"
						placeholder= {this.time}
						format = "YYYY-MM-DD HH:mm"
						minDate="2019-03-15"
						maxDate="2029-03-15"
						confirmBtnText="Confirm"
						cancelBtnText="Cancel"
						customStyles={{
							dateIcon: {
								position: 'absolute',
								left: 0,
								top: 4,
								marginLeft: 0
							},
							dateInput: {
								marginLeft: 36
							}
						}}
						minuteInterval={10}
						onDateChange={this.onTimeChanged}
					/>
					<View
						style={styles.inputBox}>
						<TextInput
							ref = "numberOfPeople"
							onChangeText={this.onNumberOfPeopleChanged} //add value changing event
							style={styles.signUpInput}
							placeholder={'Number of People (Optional)'}
							placeholderTextColor ={'#ccc'}
							returnKeyType="next"
							autoCapitalize='none' //cancel first letter capital
							underlineColorAndroid={'transparent'} //cancel under line
						/>
					</View>
					<View
						style={styles.inputBox}>
						<TextInput
							ref = "description"
							onChangeText={this.onDescriptionChanged} //add value changing event
							style={styles.signUpInput}
							placeholder={'Description (Optional)'}
							placeholderTextColor ={'#ccc'}
							returnKeyType="next"
							autoCapitalize='none' //cancel first letter capital
							underlineColorAndroid={'transparent'} //cancel under line
						/>
					</View>
				<TouchableOpacity
					onPress={this.createAct}
					style={styles.button}>
					<Text
						style={styles.btText}>Create Activity</Text>
				</TouchableOpacity>

				</KeyboardAvoidingView>


			</TouchableOpacity>
		);
	}
}