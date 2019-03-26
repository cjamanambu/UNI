import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CurrentActivitiesScreen from "../screens/CurrentActivitiesScreen";
import MyCreatedActivityListScreen from "../screens/MyCreatedActivityListScreen";
import UserJoinedActivitiesScreen from "../screens/UserJoinedActivitiesScreen";

// const HomeStack = createStackNavigator({
//     Home: HomeScreen,
// });
const HomeStack = createStackNavigator({
    Home: CurrentActivitiesScreen,
});

HomeStack.navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-information-circle${focused ? '' : '-outline'}`
                    : 'md-information-circle'
            }
        />
    ),
};

// const LinksStack = createStackNavigator({
//     Links: LinksScreen,
//
// });
const LinksStack = createStackNavigator({
    Links: MyCreatedActivityListScreen,

});

LinksStack.navigationOptions = {
    tabBarLabel: 'Links',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
        />
    ),
};

// const SettingsStack = createStackNavigator({
//     Settings: SettingsScreen,
// });
const SettingsStack = createStackNavigator({
    Settings: UserJoinedActivitiesScreen,
});

SettingsStack.navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
        />
    ),
};

export default createBottomTabNavigator({
    HomeStack,
    LinksStack,
    SettingsStack,
});