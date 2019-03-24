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

// const URL = 'http://ec2-99-79-39-110.ca-central-1.compute.amazonaws.com:8000';

export default class UserJoinedActivities extends React.Component {
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
            selectedTab: 'joined'     //added 3.24
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

    static navigationOptions = ({ navigation }) => {
        const {state} = navigation;
        return {
            headerTitle: "Joined Activities"
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
                fetch(App.URL + '/users/user/activities/attending', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization' : token
                    }
                })
                    .then(res => res.json())
                    .then(res => {
                        this.setState({
                            data: page === 1 ? res.activities : [...this.state.data, ...res.activities],
                            error: res.error || null,
                            loading: false,
                            refreshing: false,

                        });
                    })
                    .catch(error => {
                            this.setState({ error, loading: false });
                        }
                    );

            }
        })
    };

    onBack () {
        this.makeRemoteRequest();
    }




    render() {
        let activityTypes = [{value: 'Sports'}, {value: 'Study'}, {value: 'Dance'}, {value: 'Politics'}, {value: 'Art'}, {value: 'Music'}, {value: 'All'}];
        let sortByCriteria = [{value: 'Time'}];
        return (
            <View style={{flex: 1}}>

                <FlatList
                    data={this.state.data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => (
                        <ListItem
                            title={`${item.title} ${item.title}`}
                            subtitle={item.description}
                            leftAvatar={{ source: require('../assets/images/Octocat.png') }}
                            onPress={() => this.props.navigation.navigate('JoinedActivityDetailsPage',
                                {
                                    activity_id : item._id,
                                    activity_datetime: item.activity_datetime,
                                    category: item.category,
                                    description: item.description,
                                    max_attendance: item.max_attendance,
                                    title: item.title,
                                    attendance_list: item.attendance_list,
                                    datetime_created: item.datetime_created,
                                    onBack: this.onBack.bind(this)
                                })
                            }
                        />
                    )}
                />


            </View>
        )
    }
}