import {ListItem} from "react-native-elements";

const dateFormat = require('dateformat');
const sportsIcon = require("../assets/images/sportIcon.png");
const studyIcon = require("../assets/images/study.jpeg");
const danceIcon = require("../assets/images/danceIcon.png");
const artIcon = require("../assets/images/art.png");
const musicIcon = require("../assets/images/music.png");
const politicsIcon = require("../assets/images/politics.png");

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
    FlatList,
    KeyboardAvoidingView
} from 'react-native';
import styles from '../assets/Styles.js';
import * as App from '../App';

export default class ActivityAttendantListScreen extends React.Component {

    // componentWillUnmount() {
    //     const { navigation } = this.props
    //     navigation.state.params.onBack();
    // }

    constructor (props) {
        super(props);
    }

    render() {
        let activityTypes = [{value: 'Sports'}, {value: 'Study'}, {value: 'Dance'}, {value: 'Politics'}, {value: 'Art'}, {value: 'Music'}, {value: 'All'}];
        const { navigation } = this.props;
        let icon = setCategoryIcon(navigation.getParam("category"))


        const activityDetails = {
            activityTitle : navigation.getParam("title"),
            activityDescription : navigation.getParam("description"),
            attendance_list: navigation.getParam("attendance_list"),
        };

        console.log("()()()( " + activityDetails.attendance_list)


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

        function deleteActivity(pageNavigation) {
            AsyncStorage.getItem("AuthToken").then(token =>{
                if(token) {
                    const activityID = navigation.getParam("activity_id");
                    fetch(App.URL + 'users/user/activities/activity/delete/' + activityID, {
                        method: 'DELETE',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization' : token
                        }
                    }).then(res => {
                        console.log(res)
                        if (res.success)
                            Alert.alert("Activity deleted successfully!");
                        else
                            Alert.alert("Something went wrong.");
                        pageNavigation.goBack()
                    })
                }
            })
        }


        return (
            <ScrollView>
                <View style={styles.actAttendantScreenContainer}>
                    <View style={{flexDirection: 'column', alignItems: 'center'}}>
                        <Text style={{textAlign: 'center', fontSize: 30}}>Activity Details</Text>
                        <Text>{navigation.getParam("title")}</Text>

                        <Image style={styles.logo} source={icon}></Image>
                        <Text>Event Type: {navigation.getParam("category")}</Text>
                        <Text>Time of Event: {dateFormat(navigation.getParam("activity_datetime"), "dddd, mmmm dS, h:MM TT")}</Text>
                        <Text>Location: {navigation.getParam("location")}</Text>
                        <Text>{navigation.getParam("description")}</Text>

                    </View>
                    <View style={styles.container}>
                        <Text style={styles.sectionHeader}>Attendants: </Text>
                        <FlatList
                            data={activityDetails.attendance_list}
                            renderItem={({item}) => (
                                <ListItem title={item}/>
                            )}
                        />
                        <TouchableOpacity style={styles.buttonContainer}>
                            <Text style={styles.buttonText} onPress={() => deleteActivity(this.props.navigation)}>Delete Activity</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        )
    }
}
