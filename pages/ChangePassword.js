import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, TouchableHighlight,BackHandler, ActivityIndicator, FlatList, ListItem, TextInput, SafeAreaView, StatusBar, ScrollView, View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';
import moment from 'moment';
import { YellowBox } from 'react-native';
import fonts from './fonts';
import CardView from 'react-native-cardview'

import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Card } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Modal, { ModalFooter, ModalButton, ModalTitle, SlideAnimation, ModalContent } from 'react-native-modals';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BoxPasswordStrengthDisplay } from 'react-native-password-strength-meter';
import RNPasswordStrengthMeter from 'react-native-password-strength-meter';
import production from '../domain/production';

const ChangePassword = ({ route, navigation }) => {

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
  }

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
              navigation.replace('Login', { login: true })

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


          {
            !isLogin &&

            <View style={{ marginTop: "5%", marginLeft: 10, marginRight: 10, backgroundColor: "#EDEDED", padding: 20, }}>
              <Text
                style={{
                  width: "92%", alignSelf: "center",
                  fontWeight: "bold", marginRight: 5, fontSize: fonts.fontNormal, color: "#337AB7", lineHeight: 30,
                }}>You haven't logged in yet. Please login to Change Password</Text>
            </View>
          }

          {isLogin &&

            <KeyboardAwareScrollView
              extraScrollHeight={40}
              resetScrollToCoords={{ x: 0, y: 0 }}
              enableOnAndroid={true}
              keyboardVerticalOffset={100}
            >





              <Text
                style={styles.rowTextStyle}>*Curret Password</Text>

              <CardView style={{
                width: "92%"
              }}
                marginLeft={15}
                marginRight={10}
                marginBottom={3}
                marginTop={3}
                padding={2}
                cardElevation={5}
                cardMaxElevation={5}
                cornerRadius={4}>
                <TextInput
                  secureTextEntry={true}

                  onChangeText={text => setCurrentPassword(text)}
                  placeholder="Enter current password"
                  style={styles.textInputStyle} />

              </CardView>


              <Text
                style={styles.rowTextStyle}>*New Password</Text>

              <CardView style={{
                width: "92%"
              }}
                marginLeft={15}
                marginRight={10}
                marginBottom={3}
                marginTop={3}
                padding={2}
                cardElevation={5}
                cardMaxElevation={5}
                cornerRadius={4}>
                <TextInput
                  secureTextEntry={true}

                  onChangeText={text => setNewPassword(text)}
                  placeholder="Enter new password"
                  style={styles.textInputStyle} />

              </CardView>


              <BoxPasswordStrengthDisplay
                boxColor={"#d3d3d3"}

                password={newpassword}
              />
              <Text
                style={styles.rowTextStyle}>*Confirm Password</Text>
              <CardView style={{
                width: "92%"
              }}
                marginLeft={15}
                marginRight={10}
                marginBottom={3}
                marginTop={3}
                padding={2}
                cardElevation={5}
                cardMaxElevation={5}
                cornerRadius={4}>
                <TextInput
                  secureTextEntry={true}

                  onChangeText={text => setConfirmPassword(text)}
                  placeholder="Confirm new password"
                  style={styles.textInputStyle} />
              </CardView>



              <TouchableOpacity style={styles.loginBtn}>
                <Text onPress={updateDataa} style={styles.textStyle}>Save Password</Text>
              </TouchableOpacity>


              <View style={{
                width: "90%", flexDirection: 'row', alignSelf: "center"
              }}>




              </View>


            </KeyboardAwareScrollView>
          }
        </ScrollView>
      </SafeAreaView>
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

export default ChangePassword;


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

    width: "92%", flexDirection: 'row',
    height: hp('4.7%'),
    borderColor: '#337AB7', borderRadius: 2, borderWidth: 0.5, alignSelf: "center",
    marginTop: 2, marginBottom: 8, paddingLeft: 7, backgroundColor: 'rgba(255,255,255,.9)',

  },

  viewdivide1Style: {

    width: "50%", flexDirection: 'row',
    height: 40, borderColor: 'white', borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,.9)',
    alignSelf: "center",
    paddingLeft: 5, margin: 3,
  },

  viewdivide2Style: {

    width: "50%", flexDirection: 'row',
    height: 40, borderColor: 'white', borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,.9)',
    alignSelf: "center",
    paddingLeft: 5, margin: 3,
  },



  noteviewStyle: {

    width: "92%", flexDirection: 'row',
    height: 80, borderColor: 'white', borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,.9)',
    alignSelf: "center",
    paddingLeft: 10, margin: 8,
  },
  spinnerStyle: {

    width: "90%", flexDirection: 'row',
    alignSelf: "center",
    paddingLeft: 10, margin: 10,
  },
  loginBtn: {
    width: "50%",
    backgroundColor: "#337AB7",
    borderRadius: 5,
    height: 40,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10
  },

  textStyle: {
    color: "white",
    fontSize: fonts.fontMedium,
    width: "80%",
    height: 40,
    padding: 10,
    textAlign: "center",
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
  checkboxContainer: {
    flexDirection: "row",
    marginLeft: 10,

  },
  label: {
    color: "#337AB7",
    margin: 8,
  }, rowTextStyle: {
    width: "92%", alignSelf: "center",
    fontWeight: "bold", marginRight: 5, fontSize: fonts.fontMedium, color: "slategrey", marginTop: "3%", marginLeft: 2,
  },

  textInputStyle: {
    height: hp('4.7%'), alignSelf: "center", width: "100%", fontSize: fonts.fontMedium, color: 'black', alignSelf: "center", paddingTop: 0, paddingBottom: 0,
    alignSelf: "center", paddingTop: 0, paddingBottom: 0,

  }
});





