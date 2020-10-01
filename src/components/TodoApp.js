import React from "react";
// import AddTodo from './AddTodo'
import {
    View,
    Text,
    StyleSheet
} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Entypo';
import WorldIcon from 'react-native-vector-icons/Fontisto';

// import TodoList from "./TodoList";
import CoronaHome from "./CoronaHome";
import CoronaGraph from "./CoronaGraph";
import CoronaWorld from "./CoronaWorld";
import Trials from "./Trials";

  function SettingsScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings</Text>
      </View>
    );
  }

  const Tab = createMaterialTopTabNavigator();


class TodoApp extends React.Component {
    render() {
        return (
            <NavigationContainer>
            <Tab.Navigator
            tabBarPosition= 'bottom'
            initialRouteName="Home"
            backBehavior='initialRoute'
            style={{ backgroundColor: 'tomato' }}
                tabBarOptions={{
                    showIcon:true,
                    showLabel:true,
                    activeTintColor: '#e91e63',
                    // labelPosition: 'below-icon'
                  }}
                  >

                <Tab.Screen
                name="Home"
                component={CoronaHome}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color="#e91e63"}) => (
                      <MaterialCommunityIcons name="home" color={color} size={26}/>),
                  }} />
                <Tab.Screen
                name="India"
                component={CoronaGraph}
                options={{
                    tabBarLabel: 'India',
                    tabBarIcon: ({ color="#e91e63"}) => (
                        <Icon name="bar-graph" color={color} size={26}/>),

                    }} />
                <Tab.Screen
                name="World"
                component={CoronaWorld}
                options={{
                    tabBarLabel: 'World',
                    tabBarIcon: ({ color="#e91e63"}) => (
                        <WorldIcon name="world" color={color} size={24}/>),

                    }} />

                <Tab.Screen
                name="Trials"
                component={Trials}
                options={{
                    tabBarLabel: 'Trials',
                    tabBarIcon: ({ color="#e91e63"}) => (
                        <WorldIcon name="test-tube" color={color} size={24}/>),

                    }} />

                </Tab.Navigator>
            </NavigationContainer>
        );
    }
}
export default TodoApp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
