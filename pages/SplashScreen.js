import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Animated, ActivityIndicator, TextInput, SafeAreaView, BackHandler, StatusBar, Dimensions, ScrollView, View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-community/async-storage'
import fonts from './fonts';
import CardView from 'react-native-cardview'
import { Linking } from 'react-native';

import FadeIn from 'react-native-fade-in-image';

import { Header } from 'react-native-elements';
import { abs } from 'react-native-reanimated';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'
import { Root, Popup } from 'popup-ui'

import axios from 'axios';
import ProgressLoader from 'rn-progress-loader';
import Modal, { ModalFooter, ModalButton, ModalTitle, SlideAnimation, ModalContent } from 'react-native-modals';
import production from '../domain/production';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

console.disableYellowBox = true;

const SplashScreen = ({ route, navigation }) => {
  const [password, setPwd] = useState("");
  const [uname, setUname] = useState("");
  const [profile, setProfile] = useState([])
  const [listd, setListd] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const Screenwidth = Dimensions.get("window").width;
  const Screenheight = Dimensions.get("window").height;
  const [Title, setTitle] = useState(null)
  const [alertVisiblity, setalertVisiblity] = useState(false)
  const [Body, setBody] = useState(null)
  const [isVisible, setVisible] = useState(true)

  const [animating, sestAnimating] = useState(false)

  const [align, setAlign] = useState('center')

  const [alignsecond, setAlignSecond] = useState(false)
  const [fadeValue, setFadeValue] = useState(
    new Animated.Value(0.3)
  )



  useEffect(() => {
      try {
        Animated.timing(fadeValue, {
          toValue: 1,
          duration: 1000
        }).start();

        setTimeout(() => {
          setAlign('flex-start');
          setAlignSecond(true);
          AsyncStorage.setItem('login', JSON.stringify(false))

          setTimeout(() => {
            setVisible(false);
           navigation.replace('Login');
          }, 2000);

        }, 3000);


      } catch (error) {
        setVisible(false);
        console.log(error)
      }
    
  }, []);









  updateData = () => {
    if (listd != null && listd.length > 0) {
      if (listd.includes(uname)) {
        AsyncStorage.getItem(uname)
          .then(req => {
            var str = JSON.parse(req)
            console.log(str)
            console.log(password)

            if (str == password) {
              unameInput.clear()
              // pwdInput.clear()

              navigation.navigate('Dashboard')
            } else {
              alert('Incorrect password')
            }
            console.log(str)

          })
          .catch(error => {
            console.log('error!')
            alert('User doesnt exist')
          }
          );

      } else {
        alert("Employee with this id does not exist!")
        return
      }
    }
  }





  return (
    <View style={styles.backgroundImage}>
        <StatusBar backgroundColor="#337AB7"
      />

        <View
          style={{
            flex: 1,
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: "center",
            marginHorizontal: 10,
          }}>
        



          <Animated.Image
            style={{ width: 227, height: 200, transform: [{ scale: fadeValue }] }}
            source={require('../image/launcher.jpg',
            )}
          />

          {!alignsecond ? null : (
            <View style={{ margin: 10 }}>
              <Text
                style={{ fontFamily: 'Roboto', color: '#337AB7', fontSize: 18, fontWeight: 'bold' }}>
                Genie Healthcare Jobs
        </Text>
            </View>
          )}
        </View>


      

     
    </View>


  );
}
export default SplashScreen;


const styles = StyleSheet.create({
        containerInput: {
        justifyContent: 'center',
    width: "100%",
    alignContent: 'center',
    alignItems: "center",
    alignSelf: 'center',


  }, container: {
        flex: 1,
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
  },


  viewStyle: {

        width: "90%", flexDirection: 'row',
    height: 40, borderColor: '#337AB7', borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,.9)',
    paddingLeft: 10, margin: 10,
  },
  loginBtn: {
        width: "90%",
    backgroundColor: "#337AB7",
    borderRadius: 25,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },

  textStyle: {
        color: "white",
    fontSize: fonts.fontTV,
    width: "80%",
    height: 40,
    padding: 10,
    textAlign: "center",
  },
  bgcontainer: {
        flex: 1,
    alignItems: "center",
    backgroundColor: '#282C34',
  },

  backgroundImage: {
        width: "100%",
    flex: 1,
    resizeMode: "contain",
    flexDirection: "column",
    backgroundColor: "#F0F5F9",
    justifyContent: "center"
  },

  RootView:
      {
        justifyContent: 'center',
    flex: 1,
    margin: 10,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  ChildView:
      {
        justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00BCD4',
    flex: 1,
  },

});


