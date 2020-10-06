import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, TouchableHighlight, BackHandler, ActivityIndicator, FlatList, ListItem, TextInput, SafeAreaView, StatusBar, ScrollView, View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';
import FontistoIcon from 'react-native-vector-icons/Fontisto';

import moment from 'moment';
import { BoxPasswordStrengthDisplay } from 'react-native-password-strength-meter';
import { YellowBox } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import FilePickerManager from 'react-native-file-picker';
import RNFS from 'react-native-fs';
import Base64 from 'Base64';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Card } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Modal, { ModalFooter, ModalButton, ModalTitle, SlideAnimation, ModalContent } from 'react-native-modals';
import Reinput from "reinput"
import CardView from 'react-native-cardview'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { not } from 'react-native-reanimated';
import fonts from './fonts';
import production from '../domain/production';

const SignupScreen = ({ route, navigation }) => {
  const [empId, setEID] = useState("")
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [defVal, setDefaultVal] = useState(0);
  const [defValProf, setDefaultValProf] = useState(0);
  const [userID, setUSerID] = useState(null);

  const [defValSpec, setDefaultValSpec] = useState(0);
  const [defValStateLic, setDefaultValStateLic] = useState(0);
  const [defValDestState, setDefaultValDestState] = useState(0);
  const [formattedDate, setFormattedDate] = useState(null);
  const [notes, setNotes] = useState(null)

  const [getRecruiters, setRecruiters] = useState([]);
  const [getAllStates, setAllStates] = useState([]);
  const [getlcStates, setlcStates] = useState([]);
  const [getpStates, setpStates] = useState([]);

  const [getProfessions, setProfessions] = useState([]);
  const [getSpeciality, setSpeciality] = useState([]);


  const [base64Resume, setResume] = useState("")
  const [singleFile, SingleFile] = useState('');
  const [filename, setFileName] = useState("");
  const [fileuri, setFileUri] = useState("");
  const [filesize, setFileSize] = useState("");
  const [type, setFileType] = useState("");

  const [firstname, setName] = useState(null)
  const [lastname, setLName] = useState(null)
  const [emailid, setEmail] = useState(null)
  const [phone, setPhone] = useState(null)
  const [pwd, setPassword] = useState("")
  const [cpwd, setCPassword] = useState(null)
  const [yoe, setYOE] = useState(null)

  const [haddress, setAddress] = useState(null)
  const [profile, setProfile] = useState([])
  const [avatarurl, setSelectedIm] = useState(null)
  const [listd, setListd] = useState([]);
  const [isSelected, setSelection] = useState(false);
  const [enteredDate, setDate] = useState("")

  const [selrecruiter, setSelectedRecruiter] = useState(null);
  const [profid, setProfid] = useState(null);
  const [specid, setSpecid] = useState(null);
  const [statelicid, setstatelicid] = useState(null);
  const [deststateid, setdeststateid] = useState(null);
  const [Title, setTitle] = useState(null)
  const [alertVisiblity, setalertVisiblity] = useState(false)
  const [Body, setBody] = useState(null)

  const [label, setLabel] = useState(null)
  const [value, setValue] = useState(null)
  const [shortName, setShortName] = useState(null)
  const dirs = RNFetchBlob.fs.dirs;

  const [isSubmitted, setSubmitted] = useState(false)
  const [phErr, setPhErr] = useState("")


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


    var currentDate = date.getDate();

    if (currentMonth < 10) { currentMonth = '0' + currentMonth; }
    if (currentDate < 10) { currentDate = '0' + currentDate; }

    let sdate = currentMonth + "/" + currentDate + "/" + date.getFullYear();
    setDate(sdate)

    setFormattedDate(moment(sdate).format('yyyy-MM-DDT13:00:00.000Z'))

  };








  // function handleBackButtonClick() {
  //   try {
  //     if (navigation != null)
  //       navigation.replace('Login');
  //     return true;
  //   } catch (error) {
  //     console.log(error)
  //     return false;
  //   }
  // }

  formjson = (item, isLic) => {

    let drop_down_data = [];

    item.map(data => {

      var name = getAllStates[data].label;
      var id = getAllStates[data].value;
      var sn = getAllStates[data].shortName;


      var postData = {
        id: id,
        name: name,
        shortName: sn,
        createdBy: null,
        createdDate: null,
        lastModifiedBy: null,
        lastModifiedDate: null,

      };
      drop_down_data.push(postData)





    })

    if (isLic) {
      setlcStates(drop_down_data);
      console.log("lcstates", getlcStates);
    } else {
      setpStates(drop_down_data);
      console.log("pstates", getpStates);
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





  async function submitData() {


    try {
      setIsLoading(true);

      let axiosConfig = {
        headers: {
          'Content-Type': 'application/json',
        }
      };



      var postData = {
        login: emailid,
        email: emailid,
        firstName: firstname,
        lastName: lastname,
        availableToStart: formattedDate,
        phoneNumber: phone,
        password: pwd,
        yearsOfExperience: yoe,
        candidateProfessionId: profid,
        candidateSpecialtyId: specid,
        compactLicense: true,
        recruiterProfileId: selrecruiter,
        notes: notes,
        resume: base64Resume,
        resumeContentType: type,
        resumeName: filename,
        candidateLeadSourceId: 2,
        langKey: "en",
        statesLicenseds: getlcStates,
        preferredDestinationStates: getpStates,

      };


      try {

        axios.post(production.signupAPI, postData, axiosConfig)
          .then((res) => {

            try{
            setIsLoading(false);

            if (res != null && res.status != null && res.status == 201) {
              setSubmitted(true);
              setIsLoading(false);
              setTitle("Success")
              setBody("You have successfully registered")
              setalertVisiblity(true)

            }
          }catch(error){
            setIsLoading(false);

            if (error != null) {
              setTitle("Error")
              setBody(error)
              setalertVisiblity(true)
            }
          }
          })
          .catch((err) => {
            setIsLoading(false);
            try{
            if (err != null && err.response != null) {


              if (err.response.data.AuthenticationException != null) {
                setTitle("Error")
                setBody(err.response.data.AuthenticationException)
                setalertVisiblity(true)
              } else if (err != null && err.response != null && err.response.data != null) {
                setTitle("Error")
                setBody(err.response.data)
                setalertVisiblity(true)
              }
            }
          }catch(error){
            setIsLoading(false);

            if (error != null) {
              setTitle("Error")
              setBody(error)
              setalertVisiblity(true)
            }
          }

          })
       

      } catch (error) {
        setIsLoading(false);

        if (error != null) {
          setTitle("Error")
          setBody(error)
          setalertVisiblity(true)
        }
      }
   


    } catch (error) {
      setIsLoading(false);


    }

  };





  async function clearResume() {

    setFileName('');
    setFileSize('');
    setFileType('');
    setResume('');


  };

  async function updateDataa() {



    if (emailid == null || emailid == '') {
      alert('Please enter email id')
      return
    }

    if (!validateEmail(emailid)) {
      alert('Please enter valid email id')
      return
    }




    if (phone == null || phone == '') {
      alert('Please enter phone number')
      return
    }

    if (phone.length != 10) {
      alert('Please enter valid phone number')
      return
    }

    if (pwd == null || pwd == '') {
      alert('Please enter password')
      return
    }

    if (cpwd == null || cpwd == '') {
      alert('Please enter confirm password')
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
      setTitle("Alert")
      setBody("Resume of type docx or pdf not selected!");
      setalertVisiblity(true)
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



  useEffect(() => {
    // setIsLoading(true);
    // BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

    const fetchData = async () => {
      let drop_down_data = [];

      const result = await axios(
        production.recruitersAPI,
      );

      // setIsLoading(true);

      for (var i = 0; i < result.data.length; i++) {

        drop_down_data.push({ label: result.data[i].name, value: result.data[i].id });
      }

      // console.log(drop_down_data)
      setRecruiters(drop_down_data)

      // if (drop_down_data != null && drop_down_data.length > 0)



    };

    fetchData();


    const fetchProfData = async () => {
      let drop_down_data = [];


      const result = await axios(
        production.professionsAPI,
      );

      for (var i = 0; i < result.data.length; i++) {
        // console.log("name"+result.data[i].name) // I need to add 
        drop_down_data.push({ label: result.data[i].name, value: result.data[i].id }); // Create your array of data
      }

      setProfessions(drop_down_data)

    };

    fetchProfData();


    const fetchSpecData = async () => {
      let drop_down_dataspec = [];
      const result = await axios(
        production.specialityAPI + '1',
      );
      for (var i = 0; i < result.data.length; i++) {
        // console.log("name"+result.data[i].name) // I need to add 
        drop_down_dataspec.push({ label: result.data[i].name, value: result.data[i].id }); // Create your array of data
      }

      // console.log(drop_down_dataspec)
      setSpeciality(drop_down_dataspec)

    };

    fetchSpecData();

    const fetchStateData = async () => {
      let drop_down_data = [];
      setIsLoading(false);

      const result = await axios(
        production.statesAPI,
      );


      for (var i = 0; i < result.data.length; i++) {
        console.log("states" + result.data[i].shortName);
        // console.log(result.data[i].name + " " + result.data[i].id)

        drop_down_data.push({ label: result.data[i].name, value: result.data[i].id, shortName: result.data[i].shortName });
      }

      setAllStates(drop_down_data)

    };


    fetchStateData();


    setIsLoading(false);


    // return () => {

    //   BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);

    // }

  }, []);






  return (

    <View
      style={styles.backgroundImage}>
      <StatusBar backgroundColor="#337AB7"
      />


      <SafeAreaView
        style={styles.container}
        contentContainerStyle={{ flex: 1, justifyContent: "center" }} >



        <KeyboardAwareScrollView
          extraScrollHeight={40}
          resetScrollToCoords={{ x: 0, y: 0 }}
          enableOnAndroid={true}
          keyboardShouldPersistTaps='handled'
          keyboardVerticalOffset={100}
        >


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
              onChangeText={text => setEmail(text)}
              value={emailid}
              style={styles.textInputStyle} />
          </CardView>

          <Text
            style={styles.rowTextStyle}>*Phone Number</Text>
          <CardView
            style={{
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

              onChangeText={text => setPhone(text)}
              value={phone}
              style={styles.textInputStyle} />

          </CardView>





          <Text
            style={styles.rowTextStyle}>*Password</Text>

          <CardView
            style={{
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
              placeholder="Enter new password"
              style={styles.textInputStyle} />

          </CardView>

          <BoxPasswordStrengthDisplay
            boxColor={"#d3d3d3"}
            password={pwd}
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
              onChangeText={text => setCPassword(text)}
              placeholder="Confirm new password"
              style={styles.textInputStyle} />
          </CardView>

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

          <View style={{
            width: "100%", flexDirection: 'row', justifyContent: "center",
          }}>
            <View style={styles.viewdivide1Stylecol}>
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
                marginLeft={7}
                marginRight={10}
                marginBottom={3}
                marginTop={3}
                padding={2}
                cardElevation={5}
                cardMaxElevation={5}
                cornerRadius={4}>

                <TextInput
                  value={enteredDate}
                  placeholder="Available Date" style={{
                    flex: 1, fontSize: fonts.fontMedium, height: hp('4.7%'), alignSelf: "center", color: 'black', alignItems: "center", paddingTop: 0, paddingBottom: 0,
                  }}
                />
                <Icon onPress={showDatePicker} name="calendar" size={20} color="#337AB7" style={{ marginLeft: 10, marginRight: 5, alignSelf: "center", }} />
              </CardView>

            </View>

            <View style={styles.viewdivide1Stylecol1}>
              <Text

                style={styles.rowTextStyle}>Years Of Experience</Text>

              <CardView style={{
                width: "92%"
              }}
                marginLeft={7}
                marginRight={10}
                marginBottom={3}
                marginTop={3}
                padding={2}
                cardElevation={5}
                cardMaxElevation={5}
                cornerRadius={4}>
                <TextInput
                  value={yoe}
                  onChangeText={text => setYOE(text)}
                  keyboardType={'numeric'}
                  placeholder="Years Of Experience" style={{ fontSize: fonts.fontMedium, height: hp('4.7%'), alignSelf: "center", color: 'black', alignItems: "center", paddingTop: 0, paddingBottom: 0, }}
                />

              </CardView>
            </View>



          </View>

          <Text
            style={styles.rowTextStyle}>*Profession</Text>
          <DropDownPicker
            items={getProfessions}
            defaultValue={defValProf}

            searchable={true}
            searchablePlaceholder="Search for an item"
            searchablePlaceholderTextColor="gray"

            searchableError={() => <Text style={{ color: "black", fontSize: fonts.fontTV, textShadowColor: "black" }}>Not Found</Text>}

            placeholder="Select Profession"
            itemStyle={{
              justifyContent: 'flex-start'
            }}
            containerStyle={{ flex: 1, marginTop: 8, marginBottom: 8, width: "92%", alignSelf: "center", }}
            onChangeItem={item => {
              setProfid(item.value)

              console.log(item.label, item.value)
            }
            } />

          <Text
            style={styles.rowTextStyle}>*Speciality</Text>
          <DropDownPicker
            items={getSpeciality}

            searchable={true}
            searchablePlaceholder="Search for an item"
            searchablePlaceholderTextColor="gray"

            searchableError={() => <Text style={{ color: "black", fontSize: fonts.fontTV, textShadowColor: "black" }}>Not Found</Text>}

            // defaultValue={defValSpec}
            placeholder="Select Speciality"
            containerStyle={{ flex: 1, marginTop: 8, marginBottom: 8, width: "92%", alignSelf: "center", }}
            onChangeItem={item => {
              setSpecid(item.value)

              console.log(item.label, item.value)
            }
            } />

          <Text
            style={styles.rowTextStyle}>States Licensed</Text>
          <DropDownPicker
            items={getAllStates}


            searchable={true}
            searchablePlaceholder="Search for an item"
            searchablePlaceholderTextColor="gray"

            searchableError={() => <Text style={{ color: "black", fontSize: fonts.fontTV, textShadowColor: "black" }}>Not Found</Text>}

            placeholder="Select States Licensed"
            multiple={true}
            multipleText="%d items have been selected."
            min={0}

            containerStyle={{ marginTop: 8, marginBottom: 8, width: "92%", alignSelf: "center", }}

            onChangeItem={item => {
              console.log("getStates", item);
              formjson(item, true);

            }
            } />

          <View style={styles.checkboxContainer}>
            <CheckBox
              value={isSelected}
              onValueChange={setSelection}
              style={styles.checkbox}
            />
            <Text style={styles.label}>Compact License</Text>
          </View>

          <Text
            style={styles.rowTextStyle}>Preferred Destination States</Text>
          <DropDownPicker
            items={getAllStates}

            searchable={true}
            searchablePlaceholder="Search for an item"
            searchablePlaceholderTextColor="gray"

            searchableError={() => <Text style={{ color: "black", fontSize: fonts.fontTV, textShadowColor: "black" }}>Not Found</Text>}

            placeholder="Select Preferred Destination States"
            multiple={true}
            multipleText="%d items have been selected."
            min={0}
            containerStyle={{ marginTop: 8, marginBottom: 8, width: "92%", alignSelf: "center", }}

            onChangeItem={item => {
              formjson(item, false);

            }
            }
          />
          <Text
            style={styles.rowTextStyle}>*Preferred Recruiter</Text>


          <DropDownPicker
            items={getRecruiters}
            defaultValue={defVal}

            searchable={true}
            searchablePlaceholder="Search for an item"
            searchablePlaceholderTextColor="gray"

            searchableError={() => <Text style={{ color: "black", fontSize: fonts.fontTV, textShadowColor: "black" }}>Not Found</Text>}

            placeholder="Select Preferred Recruiter"

            containerStyle={{ marginTop: 8, marginBottom: 8, width: "92%", alignSelf: "center", }}
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

          {/* <View style={{
            width: "92%", flexDirection: 'row',
            height: hp('4.7%'), justifyContent: "center", alignContent: "center",
            borderColor: '#337AB7', borderRadius: 2, borderWidth: 0.5, alignSelf: "center",

            marginTop: 2, marginBottom: 8, paddingLeft: 7, backgroundColor: 'rgba(255,255,255,.9)',
          }}> */}

          <CardView style={{
            flexDirection: "row",
            width: "92%", flexWrap: "wrap",
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

            <Text
              style={{ flex: 1, textAlign: "left", fontSize: fonts.fontTV, margin: 10, color: "black", }}>{filename ? filename : ''}</Text>
            {/* <Text style={{ flex: 1, justifyContent: "flex-end", textAlign: "right", margin: 10, fontSize: 14, color: "#337AB7", }}>Forgot Password?</Text> */}


            <TouchableOpacity style={{
              backgroundColor: "#337AB7",
              borderRadius: 5,
              flex: 0.5, height: 30,
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
            <Text onPress={updateDataa} style={styles.textStyle}>Submit</Text>
          </TouchableOpacity>


          <View style={{
            width: "90%", flexDirection: 'row', alignSelf: "center"
          }}>




          </View>


        </KeyboardAwareScrollView>
        {/* </ScrollView> */}
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
                if (isSubmitted) {
                  navigation.goBack(null);

                }
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


    </View>

  );
}

export default SignupScreen;


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
    marginTop: "3%",
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

  viewdivide1Stylecol: {

    width: "50%", flexDirection: 'column',
    flexWrap: "wrap", alignSelf: "center",
    paddingLeft: 10, marginTop: 3,
  },
  viewdivide1Stylecol1: {

    width: "50%", flexDirection: 'column',
    alignSelf: "center", flexWrap: "wrap",
    paddingRight: 10, marginTop: 3,
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
  }
});





