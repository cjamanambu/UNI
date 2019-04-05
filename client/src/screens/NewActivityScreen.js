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
	StatusBar,
	ScrollView
}from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker'
import styles from '../assets/Styles.js';
import * as App from '../App';

export default class NewActivityScreen extends React.Component {

	constructor(props){
		super(props);

		const {navigation} = this.props;
		const USER_DETAILS ={
			token : navigation.getParam("token")
		};
		console.log("Token: " + USER_DETAILS.token);
		this.state = {
			apiData:[],
			time: this.datetime,
			selectedCategory: "",
			member:"",
		};
		this.token = USER_DETAILS.token;
		this.name= '';
		this.location= '';
		this.time='';
		this.numberOfPeople='';
		this.description = '';
		this.category = '';
	}

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
		this.setState({member:newNumberOfPeople});
		this.numberOfPeople = newNumberOfPeople;
		console.log(this.newNumberOfPeople);
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

		if (this.name !== '' && this.location !== '' && this.time !== ''&& this.numberOfPeople !== ''){
			if (this.description === '') {
				this.description = "default"
			}
			this.sendRequest();
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
		let numberOfMember = [{value: '1'}, {value: '2'}, {value: '3'}, {value: '4'}, {value: '5'}, {value: '6'}, {value: '7'}, {value: '8'}, {value: '9'}, {value: '10'}];

		return (
			<View style={styles.logInContainer}>
				<ScrollView testID="newActivityView">

					<KeyboardAvoidingView behavior = "padding" keyboardVerticalOffset={250} style = {styles.logInFormContainer}>
						<View testID="createActivityTitle" style={styles.logoContainer}>
							<Text style={styles.title}>Create Activity</Text>
						</View>

						<StatusBar barStyle="light-content"/>
						<TextInput testID="newActivityName"
							ref = "name"
							onChangeText={this.onNameChanged} //add value changing event
							style={styles.input}
							placeholder={'Name of Activity'}
							placeholderTextColor ={'#rgba(255,255,255,0.7)'}
							clearButtonMode="while-editing"
							returnKeyType="next"
							autoCapitalize='none' //cancel first letter capital
							autoCorrect={false}
							underlineColorAndroid={'transparent'} //cancel under line
						/>
						<TextInput
							ref = "location"
							onChangeText={this.onLocationChanged} //add value changing event
							style={styles.input}
							placeholder={'Location of Activity'}
							placeholderTextColor ={'#rgba(255,255,255,0.7)'}
							clearButtonMode="while-editing"
							returnKeyType="next"
							autoCapitalize='none' //cancel first letter capital
							autoCorrect={false}
							underlineColorAndroid={'transparent'} //cancel under line
						/>
						<View style={styles.dropdown}>
							<View style={{ flex: 1 }}>
								<Dropdown
									label='Activity Type'
									data={activityTypes}
									onChangeText={this.onCategoryChanged}
								/>
							</View>
						</View>
						<DatePicker
							style={{width:280,justifyContent:'center',alignItems:'center'}}
							date ={this.state.time}
							mode="datetime"
							placeholder= {this.time}
							format = "YYYY-MM-DD HH:mm"
							minDate="2019-04-01"
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
						<View style={styles.dropdown}>
							<View style={{ flex: 1 }}>
								<Dropdown
									label='Maximum number of members'
									data={numberOfMember}
									onChangeText={this.onNumberOfPeopleChanged}
								/>
							</View>
						</View>
						<TextInput
							ref = "description"
							onChangeText={this.onDescriptionChanged} //add value changing event
							style={styles.input}
							placeholder={'Description (Optional)'}
							placeholderTextColor ={'#rgba(255,255,255,0.7)'}
							returnKeyType="next"
							autoCapitalize='none' //cancel first letter capital
							underlineColorAndroid={'transparent'} //cancel under line
						/>
						

					</KeyboardAvoidingView>

				</ScrollView>
				<TouchableOpacity
							onPress={this.createAct}
							style={styles.buttonContainer}>
							<Text
								style={styles.buttonText}>Create Activity
							</Text>
				</TouchableOpacity>
			</View>
		);
	}
}