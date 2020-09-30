import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, TouchableHighlight, BackHandler, Linking, ActivityIndicator, FlatList, ListItem, TextInput, SafeAreaView, StatusBar, ScrollView, View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';
import moment from 'moment';
import Icon from 'react-native-vector-icons/AntDesign';

import { YellowBox } from 'react-native';
import fonts from './fonts';
import CardView from 'react-native-cardview'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Card } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Modal, { ModalFooter, ModalButton, ModalTitle, SlideAnimation, ModalContent } from 'react-native-modals';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BoxPasswordStrengthDisplay } from 'react-native-password-strength-meter';
import RNPasswordStrengthMeter from 'react-native-password-strength-meter';
import production from '../domain/production';
import email from 'react-native-email'

const About = ({ route, navigation }) => {

  const [currentpassword, setCurrentPassword] = useState(null)
  const [newpassword, setNewPassword] = useState("")
  const [confirmpassword, setConfirmPassword] = useState(null)
  const [isLoading, setIsLoading] = useState(false);

  const [token, setToken] = useState(null)
  const [tokenStr, setTokenStr] = useState(null)


  const [Title, setTitle] = useState(null)
  const [alertVisiblity, setalertVisiblity] = useState(false)
  const [Body, setBody] = useState(null)
  const [isLogin, setLoginFlag] = useState(true)



  function handleBackButtonClick() {
    try {
      if (navigation != null)
      navigation.goBack(null);
      return true;
    } catch (error) {
      console.log(error)
      return false;
    }
  };


  isLower = (passwordd) => {
    var re = /(?=.*[a-z])/;
    return re.test(passwordd);

  };
  isupper = (passwordd) => {
    var re = /(?=.*[A-Z])/;
    return re.test(passwordd);

  };
  isNumber = (passwordd) => {
    var re = /(?=.*[0-9])/;
    return re.test(passwordd);

  };

  isSpecialCharacter = (passwordd) => {
    var re = /(?=.[!@#$%^&])/;
    return re.test(passwordd);

  };

  handleEmail = () => {
    const to = ['admin@geniehealthjobs.com'] // string or array of email addresses
    email(to, {
      // Optional additional arguments
      // cc: ['bazzy@moo.com', 'doooo@daaa.com'], // string or array of email addresses
      // bcc: 'mee@mee.com', // string or array of email addresses
      subject: 'Genie Healthcare Jobs',
      // body: 'Some body right here'
    }).catch(console.error)
  };

  async function submitData() {


    try {
      setIsLoading(true);

      let axiosConfig = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': tokenStr,
        }
      };
      var postData = {
        currentPassword: currentpassword,
        newPassword: newpassword,

      };

      try {

        axios.post(production.changePasswordAPI, postData, axiosConfig)
          .then((res) => {
            console.log("RESPONSE RECEIVED: ", res);
            setIsLoading(false);

            if (res != null && res.status == 200) {

              setIsLoading(false);

              console.log("RESPONSE RECEIVED DATA: ", res.data);
              navigation.replace('Login');

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

          })


      } catch (error) {

        console.log(error)

      }



    } catch (error) {
      setIsLoading(false);

      console.log(error)

    }

  };



  async function updateDataa() {
    if (currentpassword == null || currentpassword == '') {
      alert('Please enter current password')
      return
    }

    if (newpassword == null || newpassword == '') {
      alert('Please enter new password')
      return
    }

    if (!isLower(newpassword)) {
      alert('Please enter atleast one lowercase, uppercase, digit and a special character')
      return
    }

    if (!isupper(newpassword)) {
      alert('Please enter atleast one lowercase, uppercase, digit and a special character')
      return
    }


    if (!isNumber(newpassword)) {
      alert('Please enter atleast one lowercase, uppercase, digit and a special character')
      return
    }
    if (!isSpecialCharacter(newpassword)) {
      alert('Please enter atleast one lowercase, uppercase, digit and a special character')
      return
    }

    if (confirmpassword == null || confirmpassword == '') {
      alert('Please enter confirm password')
      return
    }


    if (newpassword != confirmpassword) {
      alert('New password and Confirm Password does\'nt match');
    }


    submitData();

  };


  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);


    YellowBox.ignoreWarnings(['Animated: `useNativeDriver`']);

    setToken(AsyncStorage.getItem("token"));
    if (AsyncStorage.getItem("token") != null && AsyncStorage.getItem("token") != '') {
      try {

        setLoginFlag(true);
        AsyncStorage.getItem("token")
          .then(req => {
            var str = JSON.parse(req)
            if (str != null && str != '') {
              setLoginFlag(true);

            } else {
              setLoginFlag(false);
            }
            const AuthStr = 'Bearer '.concat(str);

            setTokenStr(AuthStr);
          })

      } catch (error) {
        setIsLoading(false);
        console.log(error)
      }
    }

    else
      setLoginFlag(false);
    return () => {

      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);

    }
  }, []);



  return (

    <View
      style={styles.backgroundImage}>

      <StatusBar backgroundColor="#337AB7"
      />


      <SafeAreaView
        style={styles.container}
        contentContainerStyle={{ flex: 1, justifyContent: "center" }} >

        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
        >



          <KeyboardAwareScrollView
            extraScrollHeight={40}
            resetScrollToCoords={{ x: 0, y: 0 }}
            enableOnAndroid={true}
            keyboardVerticalOffset={100}
            contentContainerStyle={styles.backgroundImageK} >




            <View style={{
              width: "100%", flexDirection: 'column', alignSelf: "center", justifyContent: "center",
            }}>

              <Image
                source={require('../image/launcher.jpg',
                )}
                style={{ margin: 10, width: 100, height: 100, alignSelf: "center" }}
              />


              <CardView
                marginLeft={10}
                marginRight={10}
                marginBottom={10}
                padding={10}
                marginTop={10}
                cardElevation={10}
                cardMaxElevation={10}
                cornerRadius={5}>

                <Text
                  style={{ fontFamily: 'Roboto', fontWeight: "bold", textAlign: "left", marginRight: 5, marginTop: 10, marginBottom: 10, fontSize: fonts.fontNormal, color: "#337AB7", }}>Genie Healthcare Jobs</Text>


                <View style={styles.row}>
                  <View style={styles.bullet}>
                    <Text style={styles.bulletValue}>{'\u2022' + " "}  </Text>
                  </View>
                  <Text style={styles.bulletTextValue}>Explore thousands of travel nursing jobs</Text>
                </View>
                <View style={styles.row}>

                  <View style={styles.bullet}>
                    <Text style={styles.bulletValue}>{'\u2022' + " "} </Text>
                  </View>
                  <Text style={styles.bulletTextValue}>Only see jobs that match your preferences</Text>
                </View>

                <View style={styles.row}>

                  <View style={styles.bullet}>
                    <Text style={styles.bulletValue}>{'\u2022' + " "}                  </Text>
                  </View>
                  <Text style={styles.bulletTextValue}>Instantly apply and receive a qualified pay package</Text>
                </View>

                <View style={styles.row}>

                  <View style={styles.bullet}>
                    <Text style={styles.bulletValue}>{'\u2022' + " "}                  </Text>
                  </View>

                  <Text style={styles.bulletTextValue}>Private and powerful. Save time and find the best rates

</Text>
                </View>
                <View style={{ marginBottom: 10 }}></View>
              </CardView>
              <CardView
                marginLeft={10}
                marginRight={10}
                marginBottom={3}
                padding={10}
                marginTop={3}
                cardElevation={10}
                cardMaxElevation={10}
                cornerRadius={5}>


                <TouchableOpacity onPress={() => { Linking.openURL('https://www.geniehealthjobs.com/#/'); }}


                  style={{
                    width: "100%", flexDirection: 'row', alignItems: "center"
                  }}>
                  <Icon

                    name="earth" size={20} color="#337AB7" style={{ marginLeft: 10, marginRight: 10, alignSelf: "center", alignItems: "center", }} />

                  <Text

                    style={{ textDecorationLine: 'underline', color: "#337AB7", marginLeft: 10, marginRight: 10, fontSize: fonts.fontEntry, fontNormal: 10, alignSelf: "flex-start" }}>www.geniehealthjobs.com</Text>

                </TouchableOpacity>



              </CardView>

              <CardView

                marginLeft={10}
                marginRight={10}
                marginBottom={3}
                padding={10}
                marginTop={3}
                cardElevation={10}
                cardMaxElevation={10}
                cornerRadius={5}>


                <TouchableOpacity onPress={handleEmail}

                  style={{
                    width: "100%", flexDirection: 'row', alignItems: "center"
                  }}>
                  <Icon
                    name="mail" size={20} color="#337AB7" style={{ marginLeft: 10, marginRight: 10, alignSelf: "center", alignItems: "center", }} />

                  <Text

                    style={{ textDecorationLine: 'underline', color: "#337AB7", marginLeft: 10, marginRight: 10, fontSize: fonts.fontEntry, fontNormal: 10, alignSelf: "flex-start" }}>
                    admin@geniehealthjobs.com</Text>

                </TouchableOpacity>



              </CardView>



            </View>



          </KeyboardAwareScrollView>

        </ScrollView>
      </SafeAreaView>

      <View style={{ width: "100%", flex: 1, flexDirection: "column", marginBottom: 20, position: "absolute", bottom: 0, alignItems: "center", justifyContent: "center" }}>
        <View style={{
          borderBottomColor: 'lightgrey', width: "90%",
          borderBottomWidth: 0.5,
          marginLeft: 5,
          paddingLeft: 5,
          paddingRight: 5,
          paddingBottom: 10,
          marginBottom: "2%",
          marginRight: 5
        }}></View>
        <View style={{ flex: 1, flexDirection: "row", alignSelf: "center" }}>
          <Text
            style={{ fontSize: fonts.fontNormal, color: "#337AB7", }}>
            Version
               </Text>
          <Text
            style={{ fontSize: fonts.fontNormal, color: "#000", marginLeft: 10 }}>
            1.0
               </Text>
        </View>
      </View>
      <View

        style={{
          position: 'absolute', width: "100%",
          height: "100%", justifyContent: 'center', alignItems: 'center', flex: 1
        }}>

        <ActivityIndicator
          useNativeDriver={true}
          animating={isLoading}
          size="large" color="#337AB7" />


        {/* <ProgressLoader
            visible={isLoading}
            isModal={false} isHUD={true}
            hudColor={"#000000"}
            color={"#FFFFFF"} /> */}
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
          <Text style={{ alignSelf: "center", fontSize: 17 }}>{Body}</Text>
        </ModalContent>
      </Modal>



    </View>

  );
}

export default About;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
  },



  backgroundImage: {
    width: "100%",
    flex: 1,
    resizeMode: "stretch",
    flexDirection: "column",
    marginTop: 20,
    backgroundColor: "#F0F5F9",
    justifyContent: "center"
  }, checkbox: {
    alignSelf: "center",
  },

  backgroundImageK: {
    width: "100%",
    flex: 1,
    resizeMode: "contain",
    flexDirection: "column",
    backgroundColor: "#F0F5F9",
    justifyContent: "center"
  },


  textInputStyle: {
    height: hp('4.7%'), alignSelf: "center", width: "100%", fontSize: fonts.fontTV, color: 'black', alignSelf: "center", paddingTop: 0, paddingBottom: 0,
    alignSelf: "center", paddingTop: 0, paddingBottom: 0,

  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',

    flex: 1,
    marginVertical: 4
  },
  bullet: {
    width: 15,
  },
  bulletText: {
    flex: 1,
  },
  bulletTextValue: {
    fontFamily: "Roboto", fontSize: fonts.fontTV, alignSelf: "flex-start", flex: 1,
  },

  bulletValue: {
    fontFamily: "Roboto", fontSize: fonts.fontNormal, alignSelf: "flex-start"
  }
});





