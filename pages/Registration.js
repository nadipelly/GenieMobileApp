import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, TouchableHighlight, ActivityIndicator, TouchableWithoutFeedback, FlatList, ListItem, TextInput, SafeAreaView, StatusBar, ScrollView, View, Text, Image, ImageBackground } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
// import Base64Downloader from 'react-base64-downloader';
import FontistoIcon from 'react-native-vector-icons/Fontisto';

import RNFetchBlob from 'react-native-fetch-blob';
import CheckBox from '@react-native-community/checkbox';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';
import fonts from './fonts';
import FileViewer from 'react-native-file-viewer';
import CardView from 'react-native-cardview'
import {BackHandler} from "react-native";

import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Card } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from 'axios';
import DocumentPicker from 'react-native-document-picker';
import base64 from 'base64-js'
import FileSystem from 'react-native-filesystem';
import RNFS from 'react-native-fs';
import Base64 from 'Base64';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { sin } from 'react-native-reanimated';
import FilePickerManager from 'react-native-file-picker';
import Modal, { ModalFooter, ModalButton, ModalTitle, SlideAnimation, ModalContent } from 'react-native-modals';
import production from '../domain/production';

const Registration = ({ route, navigation }) => {
  const [empId, setEID] = useState("")
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selrecruiter, setSelectedRecruiter] = useState(null);
  const [formattedDate, setFormattedDate] = useState(null);

  const [firstname, setName] = useState(null)
  const [password, setPwd] = useState(null)

  const [lastname, setLName] = useState(null)
  const [emailid, setEmail] = useState(null)
  const [phone, setPhone] = useState(null)
  const [notes, setNotes] = useState(null)
  const [base64Resume, setResume] = useState("")

  const [haddress, setAddress] = useState(null)
  const [passwordd, setPassword] = useState("")
  const [profile, setProfile] = useState([])
  const [avatarurl, setSelectedIm] = useState(null)
  const [listd, setListd] = useState([]);
  const [isSelected, setSelection] = useState(false);
  const [enteredDate, setDate] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setRegistered] = useState(false);
  const [isApplied, setApplied] = useState(false);

  const [getRecruiters, setRecruiters] = useState([]);
  const [defVal, setDefaultVal] = useState(0);

  const [singleFile, SingleFile] = useState('');
  const [filename, setFileName] = useState("");
  const [fileuri, setFileUri] = useState("");
  const [filesize, setFileSize] = useState("");
  const [type, setFileType] = useState("");

  const [isLogin, setLoginFlag] = useState(true)
  const [isSubmitted, setSubmitted] = useState(false)

  const [loggedinUser, setLoggedinUser] = useState("")
  const [Title, setTitle] = useState(null)
  const [alertVisiblity, setalertVisiblity] = useState(false)
  const [Body, setBody] = useState(null)
  const [isDProfVis, setDProfVis] = useState(false);
  const [isDSpecVis, setDSpecVis] = useState(false);
  const [isDRecVis, setDRecVis] = useState(false);


  const dirs = RNFetchBlob.fs.dirs;

  //   async function writeBase64ToFile() {
  //     let path = dirs.DCIMDir + filename;

  //     RNFetchBlob.fs.writeFile(path, base64Resume, 'base64')
  //       .then((result) => { console.log("File has been saved to:" + result)})
  //       .catch(error => console.log(err));

  //     // RNFetchBlob.fs.writeFile(path, Base64, 'base64')
  //     //  .then((result) => {console.log("File has been saved to:" + result)})
  //     //  .catch(error => console.log(err));
  //         }


  // };




  isCandidateAlreadyApplied = (text) => {
    setIsLoading(true);

    try {
      axios(production.isCandidateApplied + route.params.id + '/' + text + '/?cacheBuster=1597147305028')
        .then((res) => {
          setIsLoading(false);

          if (res != null && res.status == 200) {
            console.log("RESPONSE RECEIVED: ", res.data);

            if (res.data == false) {
              console.log("checkreg");
              setApplied(false);
              isCandidateAlreadyRegistered(text);
            } else
              setApplied(true);

          }
        })
        .catch((err) => {
          setIsLoading(false);

          if (err.response) {
            if (err.response.data.AuthenticationException) {
              setTitle("Error")
              setBody(err.response.data.AuthenticationException)
              setalertVisiblity(true)
            }
          }
        })

    } catch (error) {
      setIsLoading(false);
      console.log(error)
    }

  }


  isCandidateAlreadyRegistered = (text) => {
    setIsLoading(true);

    try {
      axios(production.isCandidateRegistered + text + '/?cacheBuster=1597147304683')
        .then((res) => {

          if (res != null && res.status == 200) {
            console.log("RESPONSE RECEIVED REGISTERED: ", res.data);
            setRegistered(res.data);
            if (!res.data)
              getCandidateInfo(text);
            else
              setIsLoading(false);

          }

        })
        .catch((err) => {
          setIsLoading(false);

          if (err.response) {
            if (err.response.data.AuthenticationException) {
              setTitle("Error")
              setBody(err.response.data.AuthenticationException)
              setalertVisiblity(true)
            }
          }
        })

    } catch (error) {
      setIsLoading(false);
      console.log(error)
    }
  }


  getCandidateInfo = (text) => {

    setEmail(text);

    console.log("candidateinfo");
    setIsLoading(true);

    try {
      axios(production.getCandidateInfoAPI + route.params.id + '/' + text + '/?cacheBuster=1597147437220')
        .then((res) => {
          setIsLoading(false);

          if (res != null && res.status == 200) {


            if (res.data != null) {

              console.log("RESPONSE RECEIVED AV: ", res.data.availableToStart);

              if (res.data.phoneNumber != null)
                setPhone(res.data.phoneNumber);
              if (res.data.availableToStart != null)
                setDate(moment(res.data.availableToStart).format('MM/DD/yyyy'));

              if (res.data.recruiterProfileId != null) {

                
               

                const fetchData = async () => {
                  let drop_down_data = [];
          
                  const result = await axios(
                    production.recruitersAPI,
                  );
          
          
                  for (var i = 0; i < result.data.length; i++) {
                    console.log(result.data[i].name + " " + result.data[i].id)
                    drop_down_data.push({ label: result.data[i].name, value: result.data[i].id });
                  }
          
                  console.log(drop_down_data)
                  setRecruiters(drop_down_data)
                  setSelectedRecruiter(res.data.recruiterProfileId);
                  setDefaultVal(res.data.recruiterProfileId);
  
                  if (drop_down_data != null && drop_down_data.length > 0)
          
                    setIsLoading(false);
          
                };
          
                fetchData();
          

              }else{
                fetchRecr();
              }

              if (res.data.firstName != null)
                setName(res.data.firstName);


              if (res.data.lastName != null)
                setLName(res.data.lastName);

              if (res.data.resumeName != null)
                setFileName(res.data.resumeName);

              if (res.data.resumeContentType != null)
                type(res.data.resumeContentType);


              if (res.data.resume != null)
                setResume(res.data.res);

            }


          }
        })
        .catch((err) => {
          setIsLoading(false);

          if (err.response) {
            if (err.response.data.AuthenticationException) {
              setTitle("Error")
              setBody(err.response.data.AuthenticationException)
              setalertVisiblity(true)
            }
          }
        })

    } catch (error) {
      setIsLoading(false);
      console.log(error)
    }
  }


  submitData = () => {


    console.log("first" + firstname);
    try {
      setIsLoading(true);

      let axiosConfig = {
        headers: {
          'Content-Type': 'application/json',
        }
      };
      var postData = {
        id: null,
        availableToStart: formattedDate,
        noteToRecruiter: notes,
        recruiterProfileId: selrecruiter,
        oldRecruiterProfileId: null,
        recruiterProfileName: null,
        candidateProfileId: null,
        candidateProfileName: null,
        jobId: route.params.id,
        jobSource: null,
        sourceJobId: null,
        jobClosed: null,
        firstName: firstname,
        middleName: "",
        lastName: lastname,
        emailAddress: emailid,
        phoneNumber: phone,
        yearsOfExperience: null,
        compactLicense: null,
        resume: base64Resume,
        resumeContentType: type,
        resumeName: filename,
        notes: null,
        userId: null,
        candidateProfessionId: null,
        candidateProfessionName: null,
        candidateSpecialtyId: null,
        candidateSpecialtyName: null,
        candidateLeadSourceId: 2,
        candidateLeadSourceName: null,
        statesLicenseds: null,
        preferredDestinationStates: null,
        password: "",
        createdBy: null,
        createdDate: null,
        lastModifiedBy: null,
        lastModifiedDate: null,
        candidateDetailsForEmail: "First Name: Last Name: Email Address: " + emailid + " Phone Number: "
      };


      console.log("post" + postData);

      try {

        axios.post(production.submitRegistrationAPI, postData, axiosConfig)
          .then((res) => {
            setIsLoading(false);

            if (res != null && res.status!=null && res.status == 201) {
              setSubmitted(true);
              setIsLoading(false);

              setTitle("Success")
              setBody("You have successfully applied for this job");
              setalertVisiblity(true)
              console.log("RESPONSE RECEIVED DATA: ", res.data);

            } else
              setSubmitted(false);
          })
          .catch((err) => {
            setIsLoading(false);

            if (err!=null && err.response!=null && err.response.data!=null) {

              console.log(err.response.data);
              if (err.response.data.AuthenticationException!=null) {
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

  }


  async function fileToBase64(uri) {
    try {

      RNFS.readFile(uri, 'base64')
        .then(res => {

          setResume(res);
          console.log("base64", res);

        });
    } catch (e) {
      console.warn('fileToBase64()', e.message)
    }
  };


  async function selectFile() {
    SingleFile(null);
    try {

      FilePickerManager.showFilePicker(null, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled file picker');
        }
        else if (response.error) {
          console.log('FilePickerManager Error: ', response.error);
        }
        else {
          if (response.type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || response.type == 'application/pdf') {

            console.log('res : ' + JSON.stringify(response));
            console.log('path : ' + response.path);
            setFileName(response.fileName);
            setFileType(response.type);
            setFileSize(response.size);
            fileToBase64(response.path);
            SingleFile(response);

          } else {

            setSubmitted(false);
            setTitle("Alert")
            setBody("Resume of type docx or pdf is only allowed!");
            setalertVisiblity(true)
          }
        }
      });

    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled from single doc picker');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };



  async function downloadFile() {
    try {
      var decoded = Base64.atob(base64Resume);
      let path = dirs.DownloadDir + "/" + filename;
      console.log("path", path);

      RNFetchBlob.fs.writeFile(path, base64Resume, 'base64')
        .then((result) => {
          setTitle("Success!")
          setBody("File saved to " + path)
          setalertVisiblity(true)
        })
        .catch(error => console.log(err));


    } catch (err) {

    }
  };

  
  async function clearResume() {

    setFileName('');
    setFileSize('');
    setFileType('');
    setResume('');


  };

  function handleBackButtonClick() {
    try {
      if (navigation != null)
        navigation.replace('Login');
        return true;
    } catch (error) {
      console.log(error)
      return false;
    }
  }


  validateEmail = (emailid) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(emailid);
  };


  isEmailValid = (text) => {

    if (validateEmail(text)) {

      isCandidateAlreadyApplied(text);
    } else {
      setRegistered(false);
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


  const showDatePicker = () => {
    console.log("visible");
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();

    var currentMonth = date.getMonth() + 1;
    if (currentMonth < 10) { currentMonth = '0' + currentMonth; }
    let sdate = currentMonth + "/" + date.getDate() + "/" + date.getFullYear();
    setDate(sdate)

  };





  updateDataa = () => {

    if(!isLogin){

    if (emailid == null || emailid == '') {
      alert('Please enter email id')
      return
    }

    if (!validateEmail(emailid)) {
      alert('Please enter valid email id')
      return
    }

    if (firstname == null || firstname == '') {
      alert('Please enter first name')
      return
    }

    if (lastname == null || lastname == '') {
      alert('Please enter last name')
      return
    }


    if (phone == null || phone == '') {
      alert('Please enter phone number')
      return
    }

    console.log(phone.length)
    if (phone.length != 10) {
      alert('Please enter valid phone number')
      return
    }
  }


    if (enteredDate == null || enteredDate == '') {
      alert('Please enter start date')
      return
    }

    if (selrecruiter == null || selrecruiter == '') {
      alert('Please select a recruiter')
      return
    }

    submitData();

  };



  updateState = () => {

    if (emailid == null || emailid == '') {

      setTitle("Alert")
      setBody("Please enter username")
      setalertVisiblity(true)

      return
    }

    if (passwordd == null || passwordd == '') {

      setTitle("Alert")
      setBody("Please enter password")
      setalertVisiblity(true)
      return
    }

    try {
      setIsLoading(true);

      var postData = {
        username: emailid,
        password: passwordd,
        rememberMe: true
      };

      let axiosConfig = {
        headers: {
          'Content-Type': 'application/json',
        }
      };


      console.log(postData)

      axios.post(production.loginAPI, postData, axiosConfig)
        .then((res) => {

          if (res != null && res.status == 200) {
            setIsLoading(false);

            console.log("RESPONSE RECEIVED: ", res.data);

            if (res.data != null && res.data.id_token != null) {
              console.log("RESPONSE RECEIVED: ", res.data.id_token);
              AsyncStorage.setItem('uname', JSON.stringify(emailid));

              AsyncStorage.setItem('token', JSON.stringify(res.data.id_token));

              setLoginFlag(true);
              getCandidateInfo(emailid);

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

  };



  async function fetchRecr() {
    try {
   

      try {

        setIsLoading(true)
        
        
        const fetchData = async () => {
          let drop_down_data = [];
  
          const result = await axios(
            production.recruitersAPI,
          );
  
  
          for (var i = 0; i < result.data.length; i++) {
            console.log(result.data[i].name + " " + result.data[i].id)
            drop_down_data.push({ label: result.data[i].name, value: result.data[i].id });
          }
  
          console.log(drop_down_data)
          setRecruiters(drop_down_data)
  
          if (drop_down_data != null && drop_down_data.length > 0)
  
            setIsLoading(false);
  
        };
  
        fetchData();
  
  
  
  
      } catch (error) {
        setIsLoading(false);
        console.log(error)
      }
    } catch (err) {
    }
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);


    if (AsyncStorage.getItem("token") != null && AsyncStorage.getItem("token") != '') {
      setLoginFlag(true);
      try {
        AsyncStorage.getItem("token")
          .then(req => {
            var str = JSON.parse(req)
            console.log("token" + str);

            if (str != null && str != '') {
              setLoginFlag(true);

              if (AsyncStorage.getItem("uname") != null && AsyncStorage.getItem("uname") != '') {
                try {

                  AsyncStorage.getItem("uname")
                    .then(req => {

                      var email = JSON.parse(req)

                      console.log("loggedinemail" + email);
                      setLoggedinUser(email);
                      if (email != null && email != '') {
                        getCandidateInfo(email);
                      }

                    })
                } catch (error) {
                  fetchRecr();
                  setIsLoading(false);
                  console.log(error)
                }

              }


            } else {
              fetchRecr();
              setLoginFlag(false);
            }



          })

      } catch (error) {
        setIsLoading(false);
        console.log(error)
      }
    } else {
      fetchRecr();
      setLoginFlag(false);
    }

   

    return () => {

      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);

    }

    

  }, []);



  return (

    <View
      style={styles.backgroundImage}>

      <StatusBar backgroundColor="#337AB7"
      />
      {/* <StatusBar
        backgroundColor="#041E2F"
      /> */}
      <SafeAreaView
        style={styles.container}
        contentContainerStyle={{ flex: 1, justifyContent: "center" }} >

        {/* <ScrollView
          contentInsetAdjustmentBehavior="automatic"
        > */}

        {
          isApplied &&

          <View style={{ marginTop: 20, marginLeft: 10, marginRight: 10, backgroundColor: "#e1cee1", padding: 20, }}>
            <Text
              style={{
                width: "92%", alignSelf: "center",
                fontWeight: "bold", marginRight: 5, fontSize: fonts.fontNormal, color: "#337AB7",
              }}>You have applied for this Job Earlier.</Text>
          </View>
        }



        <KeyboardAwareScrollView
          extraScrollHeight={40}
          resetScrollToCoords={{ x: 0, y: 0 }}
          enableOnAndroid={true}
          keyboardShouldPersistTaps='handled'

          keyboardVerticalOffset={100}
        >

          {!isApplied && !isLogin &&

            <View>
              <Text
                style={styles.rowTextStyle}>*Email Address</Text>
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
                <TextInput placeholder="Enter email" keyboardType={'email-address'}
                  onChangeText={text => {
                    isEmailValid(text);
                    setEmail(text)
                  }
                  }
                  style={styles.textInputStyle} />
              </CardView>
              {isRegistered &&
                <Text style={styles.rowTextStylenew}>This email corresponds to a registered Candidate. Please enter your password to login.</Text>
              }
              {isRegistered &&

                <View
                >
                  <Text
                    style={styles.rowTextStyle}>Password</Text>

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

                      onChangeText={text => setPassword(text)}

                      placeholder="Enter password"
                      style={styles.textInputStyle} />
                  </CardView>

                </View>
              }
              {isRegistered &&

                <TouchableOpacity style={{
                  width: "50%",
                  backgroundColor: "#337AB7",
                  borderRadius: 5,
                  height: 40,
                  alignSelf: "flex-start",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 10,
                  marginStart: 20,
                  marginBottom: 10
                }}>
                  <Text onPress={updateState} style={styles.buttonTextStyle}>Login</Text>
                </TouchableOpacity>

              }



              {!isRegistered &&
                <View
                >
                  <Text
                    style={styles.rowTextStyle}>*First Name</Text>

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
                      onChangeText={text => setName(text)}
                      value={firstname}
                      placeholder="Enter first name"
                      style={styles.textInputStyle} />
                  </CardView>

                  <Text
                    style={styles.rowTextStyle}>*Last Name</Text>
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
                      onChangeText={text => setLName(text)}
                      placeholder="Enter last name"
                      value={lastname}

                      style={styles.textInputStyle} />
                  </CardView>


                  <Text
                    style={styles.rowTextStyle}>*Phone Number</Text>
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
                    <TextInput placeholder="Enter mobile number" keyboardType={'numeric'}
                      validators={['required', 'isNumber', 'maxNumber:11']}
                      errorMessages={['Phonenumber is required', 'Phonenumber invalid', 'Not a valid number ']}

                      value={phone}
                      onChangeText={text => setPhone(text)}

                      style={styles.textInputStyle} />

                  </CardView>
                </View>

              }
            </View>

          }

          {!isApplied &&

            <View>
              <Text
                style={styles.rowTextStyle}>*Available To Start</Text>

              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                minimumDate={new Date()}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />

              <CardView style={{
                flexDirection: "row",
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
                  value={enteredDate}
                  placeholder="Available to Start" style={{ paddingTop: 0, paddingBottom: 0, width: "90%", fontSize: fonts.fontMedium, height: hp('4.7%'), alignSelf: "center", color: 'black', alignItems: "center", }}
                />
                <Icon onPress={showDatePicker} name="calendar" size={20} color="#337AB7" style={{ marginLeft: 10, alignSelf: "center", alignItems: "center", }} />

              </CardView>



              <Text
                style={styles.rowTextStyle}>*Recruiter Name</Text>
              <DropDownPicker
                items={getRecruiters}
                defaultValue={defVal}
                searchable={true}
                searchablePlaceholder="Search for an item"
                searchablePlaceholderTextColor="gray"

                searchableError={() => <Text style={{ color: "black", fontSize: fonts.fontMedium, textShadowColor: "black" }}>Not Found</Text>}

                placeholder="Select Preferred Recruiter"

                containerStyle={{ marginTop: 8, marginBottom: 8, width: "92%", alignSelf: "center", height: 40 }}
                onChangeItem={item => {
                  setSelectedRecruiter(item.value)
                  console.log(item.label, item.value)
                }}
              />


              <Text
                style={styles.rowTextStyle}>Note To Recruiter</Text>
              <View style={styles.noteviewStyle}>
                <Icon name="commenting" size={20} color="#337AB7" style={{ marginTop: 12, alignSelf: "flex-start", alignItems: "flex-start" }} />
                <TextInput onChangeText={text => setAddress(text)}

                  placeholder="Note to Recruiter" style={{ width: "90%", fontSize: fonts.fontMedium, color: 'black', alignSelf: "flex-start", alignItems: "flex-start", marginLeft: 10, }} />
              </View>
              <Text
                style={styles.rowTextStyle}>Resume</Text>

              <CardView style={{
                width: "92%", flexDirection: "row",
              }}
                marginLeft={15}
                marginRight={10}
                marginBottom={3}
                marginTop={3}
                padding={2}
                cardElevation={5}
                cardMaxElevation={5}
                cornerRadius={4}>
                {/* <Text

                  value={"sfgd"}

                  style={{ width: "70%", fontSize: 15, marginTop: 10, height: hp('4.7%'), color: 'black', alignItems: "flex-start", alignSelf: "flex-start", justifyContent: "flex-start" }}
                >{filename ? filename : ''}</Text>

                <TouchableOpacity style={{
                  backgroundColor: "#337AB7",
                  borderRadius: 5,
                  width: "40%",
                  height: 30,
                  alignSelf: "center",
                  alignItems: "center",
                  alignContent: "flex-end",
                  justifyContent: "center",
                  paddingLeft: 20,
                  marginTop: 1.5,
                  paddingRight: 20,
                }}>
                  <Text onPress={selectFile} style={{ color: "white", marginLeft: 10, justifyContent: "flex-end" }} >Upload</Text>
                </TouchableOpacity> */}

                {/* <Text onPress={() => navigation.navigate('Signup')}
              style={{paddingTop:0,alignItems: 'center', paddingBottom:0, flex: 1, textAlign: "left", margin: 10, fontSize: fonts.fontTV, color: "black", }}>{filename ? filename : ''}</Text> */}
                {/* <Text style={{ flex: 1, justifyContent: "flex-end", textAlign: "right", margin: 10, fontSize: 14, color: "#337AB7", }}>Forgot Password?</Text> */}



                <Text

                  value={filename} onPress={() => navigation.navigate('Signup')}

                  style={{ width: "70%", flex: 1, fontSize: fonts.fontMedium, margin: 10, color: 'black', alignItems: "center", alignSelf: "center", justifyContent: "center", paddingTop: 0, paddingBottom: 0 }}
                >{filename ? filename : ''}</Text>



                <TouchableOpacity style={{
                  backgroundColor: "#337AB7",
                  borderRadius: 5,
                  flex: 0.4, height: 30,
                  alignSelf: "center",
                  alignItems: "center",
                  alignContent: "center",
                  justifyContent: "center",
                  paddingLeft: 20,
                  marginTop: 1.5,
                  marginRight: 5,
                  paddingRight: 20,
                }}>
                  <Text onPress={selectFile} style={{ color: "white", marginLeft: 10, justifyContent: "flex-end" }} >Upload</Text>
                </TouchableOpacity>

              </CardView>

              {filename != null && filename != '' &&

<View style={{
  flexDirection: 'row', justifyContent: "center", alignItems: "center",
  marginRight: 6, height: hp('4.7%'), marginTop: 3, borderRadius: 3,
}}>

  <Text onPress={downloadFile} style={{
    flex: 1,
    fontSize: fonts.fontMedium, textDecorationLine: 'underline',
    color: "#337AB7", marginLeft: 20, justifyContent: "flex-end", flexWrap: "wrap"
  }} >{filename}</Text>

  <TouchableOpacity style={{ flex: 1, alignSelf: "flex-end" }} onPress={
    clearResume
  }>
    <FontistoIcon
      name="close-a" size={18} color="#337AB7" style={{ alignSelf: "flex-end", marginRight: 10, }} />
  </TouchableOpacity>

</View>
}


              <TouchableOpacity style={styles.loginBtn}>
                <Text onPress={updateDataa} style={styles.buttonTextStyle}>Submit</Text>
              </TouchableOpacity>
            </View>

          }

        </KeyboardAwareScrollView>

        {/* </ScrollView> */}
      </SafeAreaView>

      <View

        style={{
          position: 'absolute', width: "100%",
          height: "100%", justifyContent: 'center', alignItems: 'center', flex: 1
        }}>

        <ActivityIndicator
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

                if (isSubmitted)
                  // navigation.replace('Dashboard')
                  navigation.replace('Login');



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

    </View >

  );
}

export default Registration;


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

  textStyle: {
    backgroundColor: '#fff',
    fontSize: fonts.fontTV,
    marginTop: 16,
    color: 'black',
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
    paddingLeft: 10, margin: 8, flexWrap: 'wrap',
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
  uploadBtn: {
    backgroundColor: "#337AB7",
    borderRadius: 5,
    height: 40,
    alignSelf: "center",

    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  textStyle: {
    color: "black",
    fontSize: fonts.fontTV,
    width: "80%",
    height: 40,
    padding: 10,
    textAlign: "center",
  },

  buttonTextStyle: {
    color: "white",
    fontSize: 16,
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

  appliedBg: {
    color: "#FCF8E3",
    margin: 10,

  },


  label: {
    color: "#337AB7",
    margin: 8,
  },

  rowTextStyle: {
    width: "92%", alignSelf: "center",
    fontWeight: "bold", marginRight: 5, fontSize: fonts.fontMedium, color: "slategrey", marginTop: "3%", marginLeft: 2,
  },

  rowTextStylenew: {
    width: "92%", alignSelf: "center",
    fontWeight: "bold", marginRight: 5, fontSize: fonts.fontMedium, color: "darkgrey", marginTop: 5, marginBottom: 5, marginLeft: 2,
  },


  textInputStyle: {
    height: hp('4.7%'), alignSelf: "center", width: "100%", fontSize: fonts.fontMedium, color: 'black', alignSelf: "center", paddingTop: 0, paddingBottom: 0,

  }
});





