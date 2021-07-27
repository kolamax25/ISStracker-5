import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "./screens/Home";
import IssLocationScreen from "./screens/IssLocation";
import MeteorScreen from "./screens/Meteors";

const Stack = createStackNavigator()

export default function App() {


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "HOME" screenOptions = {{
        headerShown : false
      }}>
        <Stack.Screen name = "HOME" component = {HomeScreen}/>
        <Stack.Screen name = "IssLocator" component = {IssLocationScreen}/>
        <Stack.Screen name = "Meteor" component = {MeteorScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
