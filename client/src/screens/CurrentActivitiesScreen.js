import React from 'react';
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
import ActivityDetailsScreen  from './ActivityDetailsScreen';
import * as App from '../App';

const dateFormat = require('dateformat');

// const URL = 'http://ec2-99-79-39-110.ca-central-1.compute.amazonaws.com:8000';

export default class CurrentActivitiesScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false,
            selectedCategory: "All",
            token: "",
        };
        const { navigation } = this.props;
        const USER_DETAILS = {
            email : navigation.getParam("email"),
            token : navigation.getParam("token")
        };
        this.state.token = USER_DETAILS.token;
        console.log("TOKEN: " + USER_DETAILS.token);

        this.props.navigation.addListener('willFocus', () => {
            this.onChangeActivityTypeHandler(this.state.selectedCategory)
        })
    }

    componentWillMount() {
        // this.makeRemoteRequest();
        const {setParams} = this.props.navigation;
        setParams({token :this.state.token});
    }

    static navigationOptions = ({ navigation }) => {
        const {state} = navigation;
        return {
            headerTitle: "Current Activities",
            headerRight: (
                <TouchableOpacity onPress={() => navigation.navigate('NewActivityScreen', {token: state.params.token})}>
                    <Text style={{fontSize: 30, marginRight: 10, color: "#007aff"}}>+</Text>
                </TouchableOpacity>
            ),
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.navigate('MyCreatedActivityiesListScreen', {token: state.params.token})}>
                    <Text style={{fontSize: 12, marginRight: 10, color: "#007aff"}}>My Activities</Text>
                </TouchableOpacity>
            ),
        };
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.state.selectedCategory !== prevState.selectedCategory && this.state.selectedCategory !== "") {
            this.onChangeActivityTypeHandler(this.state.selectedCategory);
        }
    }

    onChangeActivityTypeHandler(value) {
        let link = "";
        if (value === 'All')
            link = App.URL + '/activities';
        else
            link = App.URL + '/activities/activity/sortBy/' + value;
        const { page, seed } = this.state;
        fetch(link)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: page === 1 ? res.activities : [...this.state.data, ...res.activities],
                    error: res.error || null,
                    loading: false,
                    refreshing: false,
                    selectedCategory: this.state.selectedCategory,
                });
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });
    };

    onChangeSortByHandler(value) {
        //TODO: update the list of all activities
    };


    render() {
        let activityTypes = [{value: 'Sports'}, {value: 'Study'}, {value: 'Dance'}, {value: 'Politics'}, {value: 'Art'}, {value: 'Music'}, {value: 'All'}];
        let sortByCriteria = [{value: 'Time'}];
        return (
            <View style={{flex: 1}}>
                <View style={styles.dropdown}>
                    <View style={{ flex: 1 }}>
                        <Dropdown
                            label='Activity Type'
                            data={activityTypes}
                            onChangeText={value => this.setState({selectedCategory: value})}
                        />
                    </View>

                    <Våiew style={{ width: 96, marginLeft: 8 }}>
                        <Dropdown
                            label='Sort'
                            data={sortByCriteria}
                            onChangeText={value => this.onChangeSortByHandler(value)}
                            propsExtractor={({ props }, index) => props}
                        />
                    </Våiew>
                </View>

                <FlatList
                    data={this.state.data}
                    keyExtractor={(item, index) => index.toString()}
                    extraData={this.state.data}
                    renderItem={({item}) => (
                        <ListItem
                            title={item.title}
                            subtitle={dateFormat(item.activity_datetime, "dddd, mmmm dS, h:MM TT") + ' - ' + item.location}
                            leftAvatar={{ source: require('../assets/images/Octocat.png') }}
                            onPress={() => this.props.navigation.navigate('ActivityDetailsScreen',
                                {
                                    activity_id : item._id,
                                    activity_datetime: item.activity_datetime,
                                    category: item.category,
                                    description: item.description,
                                    max_attendance: item.max_attendance,
                                    title: item.title,
                                    attendance_list: item.attendance_list,
                                    datetime_created: item.datetime_created,
                                })
                            }
                        />
                    )}
                />
            </View>
        )
    }
}