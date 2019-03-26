import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Image } from 'react-native';
import {createStackNavigator, createAppContainer, createBottomTabNavigator} from 'react-navigation';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import LoginScreen from "./screens/LogInScreen";
import CurrentActivitiesScreen from "./screens/CurrentActivitiesScreen";
import SignUpScreen from './screens/SignUpScreen';
import ActivityDetailsScreen  from './screens/ActivityDetailsScreen';
import SettingsScreen from "./screens/SettingsScreen";
import NewActivityScreen from "./screens/NewActivityScreen";
import UserJoinedActivitiesScreen from "./screens/UserJoinedActivitiesScreen";
import JoinedActivityDetailsPage from "./screens/JoinedActivityDetailsPage";
import MyCreatedActivityiesListScreen from "./screens/MyCreatedActivityListScreen";
import ActivityAttendantListScreen from "./screens/ActivityAttendantListScreen";
import HomeScreen from "./screens/HomeScreen";
import LinksScreen from "./screens/LinksScreen";


export const URL = 'http://ec2-99-79-39-110.ca-central-1.compute.amazonaws.com:8000';

class App extends React.Component {

  state = {
    isLoadingComplete: false,
  };

  static get URL() {
    return URL;
  }

  render() {
    return (
      /*<MainNavigator/>*/
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
  MyCreatedActivityiesListScreen: {
    screen:MyCreatedActivityiesListScreen,
    navigationOptions:{
      tabBarLabel:'My Activities',
      tabBarIcon:({focused,tintColor}) => (
        <Image
          source = {focused?require("./assets/images/mine_fill.png"):require("./assets/images/mine.png")}
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

const MainNavigator = createStackNavigator({
  LoginScreen: LoginScreen,
  MainTabNavigator: MainTabNavigator,
  SignUpScreen: SignUpScreen,
  SettingsScreen: SettingsScreen,
  ActivityDetailsScreen: ActivityDetailsScreen,
  NewActivityScreen: NewActivityScreen,
  JoinedActivityDetailsPage: JoinedActivityDetailsPage,
  ActivityAttendantListScreen: ActivityAttendantListScreen,
});



const AppRoot = createAppContainer(MainNavigator);
export default AppRoot;


const styles = StyleSheet.create({
  logInContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
