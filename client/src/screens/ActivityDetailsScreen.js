const dateFormat = require('dateformat');
const sportsIcon = require("../assets/images/sportIcon.png");
const studyIcon = require("../assets/images/study.jpeg");
const danceIcon = require("../assets/images/danceIcon.png");
const artIcon = require("../assets/images/art.png")
const musicIcon = require("../assets/images/music.png")
const politicsIcon = require("../assets/images/politics.png")

import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    KeyboardAvoidingView
} from 'react-native';
import styles from '../assets/Styles.js';

export default class ActivityDetailsScreen extends React.Component {
    render() {
        const { navigation } = this.props;
        let icon = setCategoryIcon(navigation.getParam("category"))

        const activityDetails = {
            activityTitle : navigation.getParam("title"),
            activityDescription : navigation.getParam("description")

        }


        function setCategoryIcon(category) {
            console.log(category)
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


        return (
            <View style={styles.currActContainer}>
                <Text style={styles.title}>Activity Details</Text>
                <Text>{navigation.getParam("title")}</Text>
                
                <Image style={styles.logo} source={icon}></Image>
                <Text>Event Type: {navigation.getParam("category")}</Text>
                <Text>Time of Event: {dateFormat(navigation.getParam("activity_datetime"), "dddd, mmmm dS, h:MM TT")}</Text>
                <Text>{navigation.getParam("description")}</Text>
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.buttonText} onPress={() => this.props.navigation.navigate('CurrentActivitiesScreen')}>Join Activity</Text>
                </TouchableOpacity>
            </View>
        )
    }
}