import React from 'react';
import {Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native';
import {AsyncStorage} from 'react-native';
import styles from '../assets/Styles.js';
import * as App from '../App';

export default class ProfileScreen extends React.Component {

	constructor(props) {
        super(props);
        this.state = {
            token: "",
            username:"once i have a method to get name!!!",
            email:"",
            selectedTab: 'profile'     //added 3.24
        };
        const { navigation } = this.props;
        const USER_DETAILS = {
            email : navigation.getParam("email"),
            token : navigation.getParam("token")
        };
    }

	componentWillMount() {
        const {setParams} = this.props.navigation;
        setParams({token :this.state.token});
    }

    componentDidMount() {
        this.makeRemoteRequest();
    }

    static navigationOptions = ({ navigation }) => {
        const {state} = navigation;
        return {
            headerTitle: "My Profile"
        };
    };

    makeRemoteRequest = () => {
        const { page, seed } = this.state;
        AsyncStorage.getItem("AuthToken").then(token => {
            if (token) {
                this.state.token = token;
            }
        });
        AsyncStorage.getItem("AuthEmail").then(email => {
            if (email) {
                this.setState({email:email});
            }
        });
        AsyncStorage.getItem("AuthName").then(name => {
            if (name) {
                this.setState({username:name});
            }
        })
    };

    logout =() => {
        AsyncStorage.clear();
        Alert.alert("Logout successfully!");
        this.props.navigation.navigate('LoginScreen');
    };

    render(){
    	return(
    		<View testID="profileScreen" style={styles.containerProfile}>
    			<View style = {styles.viewUser}>
    				<View testID="profilePicture" style ={styles.viewUserTop}>
    					<Image style= {styles.imgUserTitle} source={require('../assets/images/pic.jpg')}/>
    				</View>
    				<Text style={styles.txtName}>{this.state.username}</Text>

    				<Text testID="userEmail" style={styles.txtName}>{this.state.email}</Text>
    				<TouchableOpacity testID="logOutButton" onPress={this.logout}>
                        <Image
                        source = {require('../assets/images/delete_fill.png')}
                        style={{width:40, height:40, alignSelf: 'center'}}/>
                        <Text style={styles.txtName}>Log Out</Text>
                    </TouchableOpacity>
                </View>
    		</View>
    		)
    }
}
