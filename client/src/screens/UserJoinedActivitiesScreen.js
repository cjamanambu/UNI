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
import { List, ListItem, SearchBar } from "react-native-elements";
import * as App from '../App';

const dateFormat = require('dateformat');

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
            selectedTab: 'joined'
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
        this.makeRemoteRequest();
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
        return (
            <View style={{flex: 1}}>

                <FlatList testID="joinedActivityListView"
                    data={this.state.data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => (
                        <ListItem testID="joinedActivityListItem"
                            title={item.title}
                            subtitle={dateFormat(item.activity_datetime, "dddd, mmmm dS, h:MM TT") + ' - ' + item.location}
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
                                    location: item.location,
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