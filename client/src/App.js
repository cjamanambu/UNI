import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Image } from 'react-native';
import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import LoginScreen from "./screens/LogInScreen";
import CurrentActivitiesScreen from "./screens/CurrentActivitiesScreen";
import SignUpScreen from './screens/SignUpScreen';
import ActivityDetailsScreen  from './screens/ActivityDetailsScreen';
import NewActivityScreen from "./screens/NewActivityScreen";
import UserJoinedActivitiesScreen from "./screens/UserJoinedActivitiesScreen";
import JoinedActivityDetailsPage from "./screens/JoinedActivityDetailsPage";
import MyCreatedActivitiesListScreen from "./screens/MyCreatedActivityListScreen";
import ActivityAttendantListScreen from "./screens/ActivityAttendantListScreen";
import ProfileScreen from "./screens/ProfileScreen";


export const URL = 'http://ec2-35-183-134-10.ca-central-1.compute.amazonaws.com:8000';

class App extends React.Component {

  state = {
    isLoadingComplete: false,
  };

  static get URL() {
    return URL;
  }

  render() {
    return (
        <MainTabNavigator/>
    )
  }
}
const MainTabNavigator = createBottomTabNavigator({
  CurrentActivitiesScreen: {
    screen:CurrentActivitiesScreen,
    navigationOptions:{
      tabBarLabel:'Current Activities',
      tabBarIcon:({focused,tintColor}) => (
        <Image
          source = {focused?require("./assets/images/activity_fill.png"):require("./assets/images/activity.png")}
          style= {{width:25, height:25,tintColor:tintColor}}
          />
        ),
    }
  },
  UserJoinedActivitiesScreen : {
    screen:UserJoinedActivitiesScreen,
    navigationOptions:{
      tabBarLabel:'Joined Activities',
      tabBarIcon:({focused,tintColor}) => (
        <Image
          source = {focused?require("./assets/images/flag_fill.png"):require("./assets/images/flag.png")}
          style= {{width:25, height:25, tintColor:tintColor}}
          />
        ),
    }
  },
  MyCreatedActivitiesListScreen: {
    screen:MyCreatedActivitiesListScreen,
    navigationOptions:{
      tabBarTestID: 'myActivitiesTabButton',
      tabBarLabel:'My Activities',
      tabBarIcon:({focused,tintColor}) => (
        <Image
          source = {focused?require("./assets/images/mine_fill.png"):require("./assets/images/mine.png")}
          style= {{width:25, height:25,tintColor:tintColor}}
          />
        ),
    }
  },
  ProfileScreen: {
    screen:ProfileScreen,
    navigationOptions:{
      tabBarLabel:'Profile',
      tabBarIcon:({focused,tintColor}) => (
        <Image
          source = {focused?require("./assets/images/people_fill.png"):require("./assets/images/people.png")}
          style= {{width:25, height:25,tintColor:tintColor}}
          />
        ),
    }
  },
},
{
  tabBarOptions:{
      showIcon:true
    
  },
});

MainTabNavigator.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  let title;
  if (routeName === 'CurrentActivitiesScreen') {
    title = 'Current Activities';
  }
  else if (routeName === 'UserJoinedActivitiesScreen') {
    title = 'Joined Activities';
  }
  else if (routeName === 'MyCreatedActivitiesListScreen') {
    title = 'My Activities';
  }
  else {
    title = 'Profile';
  }
  return {
    title,
  };
};


const MainNavigator = createStackNavigator({
  LoginScreen: {screen: LoginScreen, navigationOptions: {header: null}},
  MainTabNavigator: {screen: MainTabNavigator, navigationOptions:{headerLeft: null}},
  SignUpScreen: SignUpScreen,
  ActivityDetailsScreen: {screen: ActivityDetailsScreen, navigationOptions: {title: 'Activity Details'}},
  NewActivityScreen: NewActivityScreen,
  JoinedActivityDetailsPage: JoinedActivityDetailsPage,
  ActivityAttendantListScreen: ActivityAttendantListScreen,
  ProfileScreen: ProfileScreen,
});



const AppRoot = createAppContainer(MainNavigator);
export default AppRoot;


const styles = StyleSheet.create({
  logInContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
