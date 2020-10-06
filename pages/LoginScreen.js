import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Animated, ActivityIndicator, Linking, TextInput, SafeAreaView, BackHandler, StatusBar, Dimensions, ScrollView, View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-community/async-storage'
import fonts from './fonts';
import CardView from 'react-native-cardview'

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


const LoginScreen = ({ route, navigation }) => {
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




  function handleBackButtonClick() {
    AsyncStorage.removeItem("login");

  }


  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    console.disableYellowBox = true;

  }, []);


  updateState = () => {

    if (uname == null || uname == '') {

      setTitle("Alert")
      setBody("Please enter username")
      setalertVisiblity(true)


      // alert('Please enter username')
      return
    }

    if (password == null || password == '') {

      setTitle("Alert")
      setBody("Please enter password")
      setalertVisiblity(true)
      return
    }

    try {
      setIsLoading(true);

      var postData = {
        username: uname,
        password: password,
        rememberMe: true
      };

      let axiosConfig = {
        headers: {
          'Content-Type': 'application/json',
        }
      };


      axios.post(production.loginAPI, postData, axiosConfig)
        .then((res) => {

          if (res != null && res.status == 200) {
            setIsLoading(false);

            console.log("RESPONSE RECEIVED: ", res.data);

            if (res.data != null && res.data.id_token != null) {
              console.log("RESPONSE RECEIVED: ", res.data.id_token);
              AsyncStorage.setItem('uname', JSON.stringify(uname));

              AsyncStorage.setItem('token', JSON.stringify(res.data.id_token));

              navigation.navigate('Dashboard');


            }

          }
        })
        .catch((err) => {
          setIsLoading(false);

          if (err.response) {
            console.log(err.response.data);
            if (err.response.data.AuthenticationException) {
              // alert(err.response.data.AuthenticationException)

              setTitle("Error")
              setBody(err.response.data.AuthenticationException)
              setalertVisiblity(true)
            }
          }

          // console.log("AXIOS ERROR: ", err);
        })





    } catch (error) {
      setIsLoading(false);

      console.log(error)

    }

  }







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

      <View style={styles.backgroundImage}>
        {/* <CardView style={{                backgroundColor: '#337AB7',
}}
            marginLeft={10}
            marginRight={10}
            marginBottom={3}
            padding={10}
            marginTop={3}

            cardElevation={10}
            cardMaxElevation={10}
            cornerRadius={5}>
            <View style={{
              width: "100%", flexDirection: 'row',
            }}>


            </View> */}

        {/* <Header
              containerStyle={{
                backgroundColor: '#337AB7',
                paddingTop: 0,
                height: 60,
                justifyContent: 'space-around',
              }}

              centerComponent={{
                text: 'Login',
                style: { fontWeight: "bold", color: '#fff', fontSize: fonts.fontLargeExtra, alignSelf: "center" }
              }}
            /> */}

        <StatusBar backgroundColor="#337AB7"
        />

        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          enableOnAndroid={true}
          keyboardShouldPersistTaps='handled'
          contentContainerStyle={styles.backgroundImage} >

          <ImageBackground
            source={require('../image/hospital.png')}
            style={{ width: heightPercentageToDP("20%"), height: heightPercentageToDP("20%"), marginTop: 10, position: "absolute", top: 0, alignSelf: "center", fontFamily: 'Roboto', }}

            resizeMode={'cover'}
          />


          <View style={styles.containerInput}>
            <View style={styles.viewStyle}>
              <Icon name="user" size={20} color="#337AB7" style={{ alignSelf: "center", alignItems: "center" }} />
              <TextInput onChangeText={text => setUname(text)}
                // ref={input => { unameInput = input }}
                placeholder="Enter username" style={{
                  width: "80%", alignSelf: "center", paddingTop: 0, paddingBottom: 0,
                  fontSize: fonts.fontTV, color: 'black', alignSelf: "center", alignItems: "center", marginLeft: 10,
                }} />
            </View>

            <View style={styles.viewStyle}>
              <Icon name="lock" size={20} color="#337AB7" style={{ alignSelf: "center", alignItems: "center" }} />
              <TextInput onChangeText={text => setPwd(text)}
                placeholder="Enter password" secureTextEntry={true} style={{
                  width: "80%", alignSelf: "center", paddingTop: 0, paddingBottom: 0,
                  fontSize: fonts.fontTV, color: 'black', alignSelf: "center", alignItems: "center", marginLeft: 10,
                }} />
            </View>

            <View

              style={{
                position: 'absolute', width: "100%",
                height: "100%", justifyContent: 'center', alignItems: 'center', flex: 1
              }}>

              <ActivityIndicator
                animating={isLoading}
                size="large" color="#337AB7" />

            </View>

            <Modal
              width={0.9}
              visible={alertVisiblity}
              rounded
              actionsBordered

              onTouchOutside={() => {
                setalertVisiblity(false);
              }}
              modalTitle={
                <ModalTitle title={Title} />}

              footer={
                <ModalFooter>
                  <ModalButton
                    text="Ok"
                    bordered
                    onPress={() => {
                      setalertVisiblity(false);
                    }}
                    key="button-1"
                  />

                </ModalFooter>
              }
            >

              <ModalContent
                style={{ marginTop: 10, backgroundColor: '#fff' }}
              >
                <Text style={{ alignSelf: "center", fontSize: fonts.fontTV }}>{Body}</Text>
              </ModalContent>
            </Modal>


            <TouchableOpacity style={styles.loginBtn} onPress={updateState}
            >
              <Text style={styles.textStyle}>LOGIN</Text>

            </TouchableOpacity>
           

            <View style={{
              width: "90%", flexDirection: 'row', justifyContent: "flex-end",
            }}>
              <Text onPress={() => navigation.navigate('Signup')}
                style={{ flex: 1, textAlign: "left", justifyContent: "flex-start", fontWeight: "bold", margin: 10, fontSize: fonts.fontTV, color: "#337AB7", }}>Register</Text>
              <Text onPress={() => navigation.navigate('Reset Password')}
                style={{ flex: 1, fontWeight: "bold", justifyContent: "flex-end", textAlign: "right", margin: 10, fontSize: 14, color: "#337AB7", }}>Forgot Password?</Text>
            </View>

          </View>
          <Text onPress={() => {
            AsyncStorage.removeItem('token');
            AsyncStorage.removeItem('uname');
            navigation.replace('Dashboard')
          }
          }
            style={{ fontSize: fonts.fontNormal, color: "#337AB7", marginBottom: 20, position: "absolute", bottom: 0, alignSelf: "flex-end", paddingRight: 20 }}>
            Skip
               </Text>
        </KeyboardAwareScrollView>
      </View>

    </View>


  );
}
export default LoginScreen;


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

