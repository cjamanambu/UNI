import React from 'react';
import {Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AsyncStorage} from 'react-native';
//import styles from '../assets/Styles.js';
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
        // this.makeRemoteRequest();
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
            if(token) {
                console.log("TOKEN: " + token);
                this.state.token = token;
            }
        })
        // AsyncStorage.getItem("AuthName").then(username => {
        //     if(username) {
        //         console.log("username: " + username);
        //         this.state.username = username;
        //     }
        // })
        AsyncStorage.getItem("AuthEmail").then(email => {
            if(email) {
                console.log("email: " + email);
                this.setState({email:email});
                console.log("email: " + this.state.email);
            }
        })
    };

    logout =() => {
      AsyncStorage.clear();
      this.props.navigation.navigate('LoginScreen');
      console.log("Token: " + AsyncStorage.getItem("AuthToken"));
    }



    render(){
    	return(
    		<View style={styles.container}>
    			<View style = {styles.viewTop}>
    				<Text style ={styles.txtTitle}>My Profile</Text>
    				<Image name='cog' style={styles.iconSetting} source={require('../assets/images/setup.png')}/>
    			</View>
    			<View style = {styles.viewUser}>
    				<View style ={styles.viewUserTop}>
    					<Image style= {styles.imgUserTitle} source={require('../assets/images/pic.jpg')}/>
    				</View>
    				<Text style={styles.txtName}>{this.state.username}</Text>

    				<Text style={styles.txtName}>{this.state.email}</Text>
    				<TouchableOpacity onPress={this.logout}>
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

let styles = StyleSheet.create({
	container: {
    	flex: 1,
     	backgroundColor: '#F0F0F0'
   },
   viewTop: {
      height: 60,
      backgroundColor: '#F0F0F0',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#B7B7B7',
      flexDirection: 'row'
    },
    txtTitle: {
      flex: 1,
      marginLeft: 10
    },
    iconSetting: {
      marginRight: 10,
      height:40,
      width:40
    },
    viewUser: {
      height: 250,
      backgroundColor: '#F0F0F0'
    },
    viewUserTop: {
      height: 100,
      alignItems: 'center',
      justifyContent: 'center'
    },
    imgUserTitle: {
      height: 80,
      width: 80,
      borderRadius: 40
    },
    txtName: {
      alignSelf: 'center'
    },
})
      