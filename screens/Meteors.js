import React, { Component } from 'react';
import { Text, View, StyleSheet ,Alert, ImageBackground, StatusBar, SafeAreaView, Image, FlatList, Dimensions } from 'react-native';
import axios from "axios";

export default class MeteorScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            meteors: {},
        };
    }

    componentDidMount() {
        this.getMeteors()
    }

    getMeteors = () => {
        axios
            .get("https://api.nasa.gov/neo/rest/v1/feed?api_key=nAkq24DJ2dHxzqXyzfdreTvczCVOnwJuFLFq4bDZ")
            .then(response => {
                this.setState({ meteors: response.data.near_earth_objects })
            })
            .catch(error => {
                Alert.alert(error.message)
            })
    }

    keyExtractor = (item,index)=>{
        index.toString();
    }

    renderItem = ({item})=>{
        var meteor = item
        var bg_img,speed,size
        if (meteor.threat_score <= 37.5) {
            bg_img = require("../assets/earthM4.jpg")
            
        }
        else if (meteor.threat_score <= 75) {
            bg_img = require("../assets/earthM3.jpg")
        }
        else {
            bg_img= require("../assets/earthM2.jpg")
        }
        return(
            <View>
                <ImageBackground source={bg_img} style={styles.backgroundImg} >

                    <View>
                        <Image />
                    </View>
                        
                    <View style={styles.meteorDataContainer}>
                       
                    <Text style={[styles.cardTitle, { marginTop: 400, marginLeft: 50 }]}> {item.name} </Text>
                   
                    <Text style={[styles.cardText, { marginTop: 20, marginLeft: 50 }]}> Closest to Earth - {item.close_approach_data[0].close_approach_date_full} </Text>
                    <Text style={[styles.cardText, { marginTop: 20, marginLeft: 50 }]}> Minimum Diameter  -{item.estimated_diameter.kilometers.estimated_diameter_min} </Text>
                    <Text style={[styles.cardText, { marginTop: 5, marginLeft: 50 }]}> Maximum Diameter  -{item.estimated_diameter.kilometers.estimated_diameter_max} </Text>
                    <Text style={[styles.cardText, { marginTop: 5, marginLeft: 50 }]}> Missing Earth by - {item.close_approach_data[0].miss_distance.kilometers} </Text>
                    <Text style={[styles.cardText, { marginTop: 5, marginLeft: 50 }]}> Velocity - {item.close_approach_data[0].relative_velocity.kilometers_per_hour} </Text>

                    </View>


                </ImageBackground>
            </View>
        )
    }

    render() {
        if (Object.keys(this.state.meteors).length === 0) {
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Text>Loading...</Text>
                </View>
            )
        } else {
            var  meteor_arr = Object.keys(this.state.meteors).map(meteor_date => {
                return this.state.meteors[meteor_date]
            })
            var  meteors = [].concat.apply([], meteor_arr);

            meteors.forEach(function (element) {
                let diameter = (element.estimated_diameter.kilometers.estimated_diameter_min + element.estimated_diameter.kilometers.estimated_diameter_max) / 2
                let threatScore = (diameter / element.close_approach_data[0].miss_distance.kilometers) * 1000000000
                element.threat_score = threatScore;
            });
            meteors.sort(function (a, b){
                    return b.threat_score = a.threat_score
            })
            meteors.slice(0,5)
            return (
                <View
                    style={styles.container}>
                    
                        <SafeAreaView style = {styles.androidSafeArea}/>
                    <FlatList keyExtractor = {this.keyExtractor} data = {meteors} renderItem = {this.renderItem} horizontal = {true}/>

                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
   
    androidSafeArea :{
        marginTop: Platform.OS === "android" ?
        StatusBar.currentHeight : 10,
    },
    titleContainer:{
        flex: 0.1,
        justifyContent: "center",
        alignItems : "center",
        
    },
    titleText:{
        fontSize : 35,
        fontWeight : "bold",
        color : "white"
    },
    backgroundImg:{
        flex: 1,
        resizeMode: 'cover',
        width: Dimensions.get('window').width,
        height : Dimensions.get('window').height
    },
   
    cardTitle: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: "bold",
        color: "white"
    },
    cardText: {
        color: "white"
    },
    listContainer: {
       
        justifyContent: "center",
        marginLeft: 10,
        marginRight: 10,
        marginTop: 0,
        borderRadius: 10,
        padding: 10,
        backgroundColor: 'white'
    },
    meteorDataContainer: {
        justifyContent: "center",
        alignItems: "center",

    }

  });
  

