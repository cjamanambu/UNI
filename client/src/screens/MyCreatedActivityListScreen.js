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
} from 'react-native';
import styles from '../assets/Styles.js';
import { Dropdown } from 'react-native-material-dropdown';
import { List, ListItem, SearchBar } from "react-native-elements";
import * as App from '../App';
import TabNavigator from 'react-native-tab-navigator';      //added 3.24

const dateFormat = require('dateformat');

export default class MyCreatedActivityListScreen extends React.Component {
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
            selectedTab: 'my'     //added 3.24
        };
        const { navigation } = this.props;

    }

    componentWillMount() {
        this._subscribe = this.props.navigation.addListener('didFocus', () => {
            this.makeRemoteRequest();
        });
    }

    static navigationOptions = ({ navigation }) => {
        const {state} = navigation;
        return {
            headerTitle: "My Created Activities"
        };
    };

    componentDidMount() {
        this.makeRemoteRequest();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.selectedCategory !== prevState.selectedCategory && this.state.selectedCategory !== "") {
            this.onChangeTypeHandler(this.state.selectedCategory);
        }
    }

    makeRemoteRequest = () => {
        const { page, seed } = this.state;
        AsyncStorage.getItem("AuthToken").then(token => {
            if(token) {
                console.log("TOKEN: " + token);
                fetch(App.URL + '/users/user/myActivities', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization' : token
                    }
                })
                .then(res => res.json())
                    .then(res => {
                        console.log(res)
                        this.setState({
                            data: page === 1 ? res.my_activities : [...this.state.data, ...res.my_activities],
                            error: res.error || null,
                            loading: false,
                            refreshing: false,
        
                        });
                    })
                    .catch(error => {
                        console.log(error)
                        this.setState({ error, loading: false });
                    }
                );

            }
        })
    };




    render() {
        let activityTypes = [{value: 'Sports'}, {value: 'Study'}, {value: 'Dance'}, {value: 'Politics'}, {value: 'Art'}, {value: 'Music'}, {value: 'All'}];
        let sortByCriteria = [{value: 'Time'}];
        return (
            <View style={{flex: 1}}>

                <FlatList testID="myActivityListView"
                    data={this.state.data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => (
                        <ListItem testID="myActivityListItem"
                            title={item.title}
                            subtitle={dateFormat(item.activity_datetime, "dddd, mmmm dS, h:MM TT") + ' - ' + item.location}
                            leftAvatar={{ source: require('../assets/images/Octocat.png') }}
                            onPress={() => this.props.navigation.navigate('ActivityAttendantListScreen',
                                {
                                    activity_id : item._id,
                                    activity_datetime: item.activity_datetime,
                                    category: item.category,
                                    description: item.description,
                                    max_attendance: item.max_attendance,
                                    title: item.title,
                                    attendance_list: item.attendance_list,
                                    datetime_created: item.datetime_created,
                                    location: item.location,
                                })
                            }
                        />
                    )}
                />


            </View>
        )
    }
}