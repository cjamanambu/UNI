import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
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
      <MainNavigator/>
    )
  }
}

const MainNavigator = createStackNavigator({
// const MainNavigator = createBottomTabNavigator({
  LoginScreen: LoginScreen,
  CurrentActivitiesScreen: CurrentActivitiesScreen,
  SignUpScreen: SignUpScreen,
  SettingsScreen: SettingsScreen,
  ActivityDetailsScreen: ActivityDetailsScreen,
  NewActivityScreen: NewActivityScreen,
  UserJoinedActivitiesScreen : UserJoinedActivitiesScreen,
  JoinedActivityDetailsPage: JoinedActivityDetailsPage,
  MyCreatedActivityiesListScreen: MyCreatedActivityiesListScreen,
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
