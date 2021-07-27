import React, { Component } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Platform, StatusBar, TouchableOpacity, Image,} from 'react-native';
import ImageBackground from 'react-native/Libraries/Image/ImageBackground';

export default class HomeScreen extends Component {
    render() {
        return (
            <View
            style = {styles.container}>
              <ImageBackground source = {require("../assets/home_bg.jpg")} style = {styles.bg}>
                <SafeAreaView style = {styles.AndroidSafeArea}/>
                
                <View style = {styles.titleText}>
            <Text style = {styles.title}>ISS Tracker App</Text>
            </View>
            <TouchableOpacity
              style={styles.button} onPress = {() => {
                this.props.navigation.navigate("IssLocator");
              }}>
                <Text style={styles.digit}>1</Text>
              <Text style={styles.buttonText}>ISS Location</Text>
              <Image source = {require("../assets/iss_icon.png")} style = {styles.icon}/>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.button} onPress = {() => {
                this.props.navigation.navigate("Meteor");
              }}>
              <Text style={styles.digit}>2</Text>
              <Text style={styles.buttonText}>Meteors</Text>
              <Image source = {require("../assets/meteor_icon.png")} style = {[styles.icon, {width: 200, height: 200, right: -35}]}/>
            </TouchableOpacity>
            </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      
    },

    title: {
        fontSize: 40,
        textDecorationLine: 'underline',
        color: 'white',
        fontWeight: 'bold',
        
    },

    titleText: {
      marginTop: 15,
      flex: 0.15,
     alignItems: 'center',

     
  },

  icon: {
   position: 'absolute',
   height: 150,
   width: 150,
   resizeMode: 'contain',
   right: -15,
   top: -75,
},
    
    buttonText: {
        fontSize: 40,
        margin: 10,
      },

      digit: {
        fontSize: 35,
        margin: 10,
        position: 'absolute',
        right: 0,
        color: 'rgba(0, 0, 0, 0.5)',
        zIndex: -1,
      },

    AndroidSafeArea: {

        marginTop: Platform.OS === "android" ?
        StatusBar.currentHeight : 10,
    },
    button: {
      flex: 0.25,
        backgroundColor: 'white',
        margin: 30,
        borderRadius: 20,

      },

      bg: {

        flex: 1,
        resizeMode: 'cover'
      }
  });