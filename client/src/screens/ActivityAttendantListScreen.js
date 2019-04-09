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
    KeyboardAvoidingView,
    FlatList,
    Picker,
    Button,
    Alert
} from 'react-native';
import styles from '../assets/Styles.js';
import {List, ListItem, SearchBar} from "react-native-elements";
import * as App from '../App';

export default class ActivityAttendantListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false,
            selectedCategory: "",
            token: "",
            selectedTab: 'joined',
            icon: this.setCategoryIcon(this.props.navigation.getParam("category"))
        };
    }

    componentWillMount() {
        const {setParams} = this.props.navigation;
        setParams({token: this.state.token});
    }

    static navigationOptions = ({navigation}) => {
        const {state} = navigation;
        return {
            headerTitle: "My Activity Details"
        };
    };

    componentDidMount() {
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
        const {page, seed} = this.state;
        const activityID = this.props.navigation.getParam("activity_id");

        AsyncStorage.getItem("AuthToken").then(token => {
            if (token) {
                fetch(App.URL + '/users/user/activities/activity/attendanceList/' + activityID, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                })
                    .then(res => res.json())
                    .then(res => {
                        this.setState({
                            data: page === 1 ? res.users : [...this.state.data, ...res.users],
                            error: res.error || null,
                            loading: false,
                            refreshing: false,

                        });
                    })
                    .catch(error => {
                            this.setState({error, loading: false});
                        }
                    );
            }
        })
    };

    onBack() {
        this.makeRemoteRequest();
    }

    setCategoryIcon(category) {
        if (category === "SPORTS") {
            return sportsIcon;
        }
        else if (category === "STUDY") {
            return studyIcon;
        }
        else if (category === "DANCE") {
            return danceIcon;
        }
        else if (category === "POLITICS") {
            return politicsIcon;
        }
        else if (category === "ART") {
            return artIcon;
        }
        else if (category === "MUSIC") {
            return musicIcon;
        }
    }

    showDeleteConfirmedMessage(pageNavigation) {
        Alert.alert(
            'Are you sure?',
            'You will not be able to recover this activity after deleting it.',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {text: 'OK', onPress: () => this.makeDeleteActivityRequest(pageNavigation)},
            ],
            {cancelable: false},
        );
    }

    makeDeleteActivityRequest(pageNavigation) {
        AsyncStorage.getItem("AuthToken").then(token => {
            if (token) {
                const activityID = this.props.navigation.getParam("activity_id");
                fetch(App.URL + '/users/user/activities/activity/delete/' + activityID, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                })
                    .then(res => res.json())
                    .then(res => {
                        if (res.success)
                            Alert.alert("Activity deleted successfully!");
                        else
                            Alert.alert("Something went wrong.");
                        pageNavigation.goBack()
                    })
            }
        })
    }

    render() {
        return (
            <View testID="activityAttendantListView" style={styles.actAttendantScreenContainer}>
                <View style={styles.subContainer}>
                    <Text style={styles.header}>{this.props.navigation.getParam("title")}</Text>
                    <Image style={styles.logo} source={this.state.icon}></Image>
                    <Text>Activity Type: {this.props.navigation.getParam("category")}</Text>
                    <Text>Time: {dateFormat(this.props.navigation.getParam("activity_datetime"), "dddd, mmmm dS, h:MM TT")}</Text>
                    <Text>Location: {this.props.navigation.getParam("location")}</Text>
                    <Text>Description: {this.props.navigation.getParam("description")}</Text>
                </View>
                <View>
                    <Text style={styles.sectionHeader}>Attendants: </Text>
                    <FlatList testID="attendantListView"
                              data={this.state.data}
                              keyExtractor={(item, index) => index.toString()}
                              renderItem={({item}) => (
                                  <ListItem
                                      title={item.Name}
                                  />
                              )}
                    />
                </View>
                <TouchableOpacity testID="deleteButton" style={styles.buttonDetailsScreenContainer}>
                    <Text style={styles.buttonText}
                          onPress={() => this.showDeleteConfirmedMessage(this.props.navigation)}>Delete Activity</Text>
                </TouchableOpacity>
            </View>
        )
    }
}