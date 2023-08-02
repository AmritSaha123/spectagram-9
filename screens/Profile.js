import React, { Component } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import * as SplashScreen from 'expo-splash-screen';
import * as Font from "expo-font";

SplashScreen.preventAutoHideAsync();

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      light_theme:true,
      isEnabled:false,
      name:""
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  toggleSwitch(){
    const previousState = this.state.isEnabled
    const theme = !this.state.isEnabled?"dark":"light"
    let updates = {}
    updates["/users/"+firebase.auth().currentUser.uid+"/current_theme"]=theme
    firebase.database().ref().update(updates)
    this.setState({isEnabled:!previousState,light_theme:previousState})
  }


  async fetchUser(){
    let theme,name
    await firebase.database()
    .ref("/users/"+firebase.auth().currentUser.uid
    .on("value",function(snapshot){
      theme=snapshot.val().current_theme
      name=`${snapshot.val().first_name} ${snapshot.val().last_name}`
    }))
    this.setState({light_theme:theme==="light"?true:false,isEnabled:theme===light?false:true,name:name})
  }
  render() {
    if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.iconImage}
              ></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={styles.appTitleText}>Storytelling App</Text>
            </View>
          </View>
          <View style={styles.screenContainer}>
            <View
            style ={styles.profileImageContainer}>
            <Image source={require("../assets/profile_img.png")} style={styles.profileImage}>
            </Image> 
            <Text style={styles.nameText}>{this.state.name}</Text> 
            </View>
            <View style={styles.themeContainer}>
              <Text style = {styles.themeText}>Dark Theme</Text>\
              <Switch 
              style={{transform:[{scaleX:1.3},{scaleY:1.3}]}}
              trackColor={{false:"red",true:"yellow"}}
              thumbColor={this.state.isEnabled?"green":"gray"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={()=>{this.toggleSwitch()}}
              value={this.state.isEnabled}
              />

            </View>
            <View style = {{flex:0.3}}/>
          </View>
          <View style={{ flex: 0.08 }} />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  droidSafeArea: { 
    marginTop: Platform.OS === "android" ? 
    StatusBar.currentHeight : 0 },
  
  appTitle: { 
      flex: 0.07, 
      flexDirection: "row" },

  appIcon: {
     flex: 0.3,
      justifyContent: "center",
       alignItems: "center" },
       
  iconImage: {
     width: "100%", 
     height: "100%", 
     resizeMode: "contain" },

  appTitleTextContainer: { 
    flex: 0.7, 
    justifyContent: "center" },

  appTitleText: { 
    color: "white", 
    fontSize: RFValue(28),
     fontFamily: "Bubblegum-Sans" },

  screenContainer: { 
    flex: 0.85 },
  
  profileImageContainer: { 
    flex: 0.5, 
    justifyContent: "center", 
    alignItems: "center" },
  
  profileImage: { 
    width: RFValue(140), 
    height: RFValue(140), 
    borderRadius: RFValue(70) },

  nameText: { 
    color: "white",
     fontSize: RFValue(40),
      fontFamily: "Bubblegum-Sans", 
      marginTop: RFValue(10) },
  
  themeContainer: { 
    flex: 0.2, 
    flexDirection: "row",
    justifyContent: "center",
    marginTop: RFValue(20) },
  
  themeText: {
     color: "white", 
     fontSize: RFValue(30), 
     fontFamily: "Bubblegum-Sans",
      marginRight: RFValue(15) }
});
