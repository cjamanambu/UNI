const dateFormat = require('dateformat');
const sportsIcon = require("../assets/images/sportIcon.png");
const studyIcon = require("../assets/images/study.jpeg");
const danceIcon = require("../assets/images/danceIcon.png");
const artIcon = require("../assets/images/art.png")
const musicIcon = require("../assets/images/music.png")
const politicsIcon = require("../assets/images/politics.png")

import React from 'react';
import {AsyncStorage} from 'react-native';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    Alert,
} from 'react-native';
import styles from '../assets/Styles.js';
import * as App from '../App';

export default class ActivityDetailsScreen extends React.Component {
    render() {
        const { navigation } = this.props;
        let icon = setCategoryIcon(navigation.getParam("category"))

        const activityDetails = {
            activityTitle : navigation.getParam("title"),
            activityDescription : navigation.getParam("description")

        }


        function setCategoryIcon(category) {
            console.log(category);
            if (category === "SPORTS") {
                return sportsIcon;
            } else if(category === "STUDY") {
                return studyIcon;
            } else if(category === "DANCE") {
                return danceIcon;
            } else if(category === "POLITICS") {
                return politicsIcon;
            } else if(category === "ART") {
                return artIcon;
            } else if(category === "MUSIC") {
                return musicIcon;
            }
        }

        function joinActivity(navigation) {
            console.log("full? :"+ navigation.getParam("full"));
            if(navigation.getParam("full").toString() == 'true'){
                Alert.alert("Fail to join, this activity is full");
            }
            else{
                AsyncStorage.getItem("AuthToken").then(token =>{
                    if(token) {
                        const activityID = navigation.getParam("activity_id");
                        fetch(App.URL + '/activities/activity/attend/' + activityID, {
                            method: 'PUT',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization' : token
                            }
                        }).then(_ => {
                            Alert.alert("Joined activity "+ navigation.getParam("title"));
                            navigation.navigate('UserJoinedActivitiesScreen')
                        })
                    }
                })
            }
        }


        return (
            <View testID="activityDetailScreen" style={styles.actAttendantScreenContainer}>
                <View testID="detailFormView" style={styles.subContainer}>
                    <Text testID='activityDetailTitle' style={styles.header}>{navigation.getParam("title")}</Text>

                    <Image testID='activityDetailsTypePicture' style={styles.logo} source={icon}></Image>
                    <Text>Activity Type: {navigation.getParam("category")}</Text>
                    <Text testID='activityDetailsTime'>Time: {dateFormat(navigation.getParam("activity_datetime"), "dddd, mmmm dS, h:MM TT")}</Text>
                    <Text testID='activityDetailsLocation'>Location: {navigation.getParam("location")}</Text>
                    <Text>Description: {navigation.getParam("description")}</Text>

                </View>
                <TouchableOpacity testID="joinActivityButton" style={styles.buttonDetailsScreen}>
                    <Text style={styles.buttonText} onPress={() => joinActivity(this.props.navigation)}>Join Activity</Text>
                </TouchableOpacity>
            </View>
        )
    }
}