import 'react-native-gesture-handler';
import React, { useState, useEffect, useCallback } from 'react';
import { Button, StyleSheet, TouchableHighlight, ActivityIndicator, BackHandler, FlatList, ListItem, TextInput, SafeAreaView, StatusBar, ScrollView, View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';
import moment from 'moment';
import FontistoIcon from 'react-native-vector-icons/Fontisto';

import RNFetchBlob from 'react-native-fetch-blob';
import FilePickerManager from 'react-native-file-picker';
import Modal, { ModalFooter, ModalButton, ModalTitle, SlideAnimation, ModalContent } from 'react-native-modals';
import RNFS from 'react-native-fs';
import Base64 from 'Base64';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Card } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import MultiSelect from 'react-native-multiple-select';
import CardView from 'react-native-cardview'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { abs, not } from 'react-native-reanimated';
import fonts from './fonts';
import production from '../domain/production';

const ThirdPage = ({ route, navigation }) => {
  const [empId, setEID] = useState("")
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [defVal, setDefaultVal] = useState(0);
  const [defValProf, setDefaultValProf] = useState(0);
  const [userID, setUSerID] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const [defValSpec, setDefaultValSpec] = useState(0);
  const [defValStateLic, setDefaultValStateLic] = useState([0]);
  const [defValDestState, setDefaultValDestState] = useState([0]);
  const [formattedDate, setFormattedDate] = useState(null);
  const [notes, setNotes] = useState("")
  const [isSubmitted, setSubmitted] = useState(false)

  const [getRecruiters, setRecruiters] = useState([]);
  const [getAllStates, setAllStates] = useState([]);
  const [getProfessions, setProfessions] = useState([]);
  const [getSpeciality, setSpeciality] = useState([]);

  const [isDStateVis, setDStateVis] = useState(false);
  const [isDDesStateVis, setDDesStateVis] = useState(false);

  const [isDProfVis, setDProfVis] = useState(false);
  const [isDSpecVis, setDSpecVis] = useState(false);
  const [isDRecVis, setDRecVis] = useState(false);

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
  const [haddress, setAddress] = useState(null)
  const [passwordd, setPassword] = useState("")
  const [profile, setProfile] = useState([])
  const [avatarurl, setSelectedIm] = useState(null)
  const [listd, setListd] = useState([]);
  const [isSelected, setSelection] = useState(false);
  const [enteredDate, setDate] = useState("")
  const [token, setToken] = useState("")
  const dirs = RNFetchBlob.fs.dirs;

  const [selrecruiter, setSelectedRecruiter] = useState(null);
  const [profid, setProfid] = useState(null);
  const [specid, setSpecid] = useState(null);
  const [statelicid, setstatelicid] = useState(null);
  const [deststateid, setdeststateid] = useState(null);
  const [isLogin, setLoginFlag] = useState(true)

  const [getlcStates, setlcStates] = useState([]);
  const [getpStates, setpStates] = useState([]);




  const [Title, setTitle] = useState(null)
  const [alertVisiblity, setalertVisiblity] = useState(false)
  const [Body, setBody] = useState(null)

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {

    var currentMonth = date.getMonth() + 1;
    if (currentMonth < 10) { currentMonth = '0' + currentMonth; }
    let sdate = currentMonth + "/" + date.getDate() + "/" + date.getFullYear();
    setDate(sdate)

    hideDatePicker();
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
        navigation.goBack(null);

      return true;
    } catch (error) {
      console.log(error)
      return false;
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


  async function submitData() {


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
        jobId: userID,
        jobSource: null,
        sourceJobId: null,
        jobClosed: null,
        firstName: firstname,
        middleName: "",
        lastName: lastname,
        emailAddress: emailid,
        phoneNumber: phone,
        yearsOfExperience: null,
        compactLicense: isSelected,
        resume: base64Resume,
        resumeContentType: type,
        resumeName: filename,
        notes: null,
        userId: null,
        candidateProfessionId: profid,
        candidateProfessionName: null,
        candidateSpecialtyId: specid,
        candidateSpecialtyName: null,
        candidateLeadSourceId: 2,
        candidateLeadSourceName: null,
        statesLicenseds: getlcStates,
        preferredDestinationStates: getpStates,
        password: "",
        createdBy: null,
        createdDate: null,
        lastModifiedBy: null,
        lastModifiedDate: null,
        candidateDetailsForEmail: "First Name: Last Name: Email Address: " + emailid + " Phone Number: "
      };

      try {

        axios.put(production.submitprofileAPI, postData, axiosConfig)
          .then((res) => {
            console.log("RESPONSE RECEIVED: ", res);
            setIsLoading(false);
            if (res != null && res.status == 200) {
              setIsLoading(false);

              console.log("RESPONSE RECEIVED DATA: ", res.data);
              setSubmitted(true);
              setIsLoading(false);

              setTitle("Success")
              setBody("Your profile has been successfully updated!")
              setalertVisiblity(true)

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

    if (phone.length != 10) {
      alert('Please enter valid phone number')
      return
    }

    if (enteredDate.length != 10) {
      alert('Please enter valid phone number')
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



  isEmailValid = (text) => {

    if (validateEmail(text)) {

      isCandidateAlreadyApplied(text);
    } else {
      setRegistered(false);
    }

  };

  validateEmail = (emailid) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(emailid);
  };

  navigateLogin = () => {
    navigation.replace('Login', { login: true })
  };
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
      // setLicStates(drop_down_data)


    })

    if (isLic) {
      setlcStates(drop_down_data);
      console.log("lcstates", getlcStates);
    } else {
      setpStates(drop_down_data);
      console.log("pstates", getpStates);
    }

  };


  const fetchDatas = useCallback(() => {
    setToken(AsyncStorage.getItem("token"));
    setRefresh(false);

    if (AsyncStorage.getItem("token") != null && AsyncStorage.getItem("token") != '') {
      setIsLoading(true);


      try {
        AsyncStorage.getItem("token")
          .then(req => {
            var str = JSON.parse(req)
            console.log("token" + str);

            if (str != null && str != '') {
              setLoginFlag(true);


              console.log("loginflag" + str);



              setToken(AsyncStorage.getItem("token"));

              if (AsyncStorage.getItem("token") != null && AsyncStorage.getItem("token") != '') {


                try {

                  AsyncStorage.getItem("token")
                    .then(req => {
                      setLoginFlag(true);

                      var str = JSON.parse(req)
                      const AuthStr = 'Bearer '.concat(str);
                      console.log("Auth" + AuthStr);
                      console.log(production.profileDetailsAPI);


                      axios.get(production.profileDetailsAPI, { headers: { Authorization: AuthStr } })
                        .then((res) => {
                          // console.log("RESPONSE1: ", res);

                          if (res != null && res.status == 200) {
                            console.log("RESPONSE: ", res.data);




                            setEmail(res.data.emailAddress);
                            setName(res.data.firstName);
                            setLName(res.data.lastName);
                            setPhone(res.data.phoneNumber);
                            console.log("RESPONSE RECEIVED1: ", res.data.notes);

                            if (res.data.availableToStart != null)
                              setDate(moment(res.data.availableToStart).format('MM/DD/yyyy'));
                            console.log("RESPONSE RECEIVED2: ", res.data.availableToStart);
                            setUSerID(res.data.id);






                            // if(res.data.notes!=null){
                            //   console.log("notes", res.data.notes);
                            //   setNotes(res.data.notes);
                            // }






                            const fetchData = async () => {
                              let drop_down_data = [];

                              const result = await axios(
                                production.recruitersAPI,
                              );


                              for (var i = 0; i < result.data.length; i++) {
                                drop_down_data.push({ label: result.data[i].name, value: result.data[i].id });
                              }

                              setRecruiters(drop_down_data)
                              if (res.data.recruiterProfileId != null) {
                                console.log("rid", res.data.recruiterProfileId)
                                setSelectedRecruiter(res.data.recruiterProfileId);
                                setDefaultVal(res.data.recruiterProfileId);
                                setDRecVis(true);
                              } else {
                                setDRecVis(false);
                              }

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

                              if (res.data.candidateProfessionId != null) {
                                console.log("rid", res.data.candidateProfessionId)
                                setProfid(res.data.candidateProfessionId);
                                setDefaultValProf(res.data.candidateProfessionId);
                                setDProfVis(true);

                              } else {
                                setDProfVis(false);

                              }

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


                              if (res.data.candidateSpecialtyId != null) {
                                console.log("rid", res.data.candidateSpecialtyId)
                                setSpecid(res.data.candidateSpecialtyId);
                                setDefaultValSpec(res.data.candidateSpecialtyId);
                                setDSpecVis(true);
                              } else {
                                setDSpecVis(false);
                              }

                            };

                            fetchSpecData();







                            const fetchStateData = async () => {
                              let drop_down_data = [];


                              const result = await axios(
                                production.statesAPI,
                              );


                              if (result.data != null && result.data.length > 0) {
                                await result.data.map(data => {
                                  console.log(data.name + data.id + data.shortName);

                                  drop_down_data.push({ label: data.name, value: data.id, shortName: data.shortName });
                                })

                                console.log("dropdown", drop_down_data);

                                setAllStates(drop_down_data);
                                console.log("state", getAllStates);


                                try {

                                  let lcSt = [];


                                  if (res.data.statesLicenseds != null) {

                                    if (res.data.statesLicenseds.length > 0) {

                                      res.data.statesLicenseds.map(data => {

                                        lcSt.push(data.id)

                                      })

                                    }



                                    setDefaultValStateLic(lcSt);
                                    console.log("lcst" + lcSt);

                                    console.log(isDStateVis + " " + defValStateLic);


                                    if (lcSt.length > 0) {
                                      setDStateVis(true);
                                    } else
                                      setDStateVis(false)


                                  }


                                } catch (e) {
                                  console.error(e);
                                  setIsLoading(false);
                                }

                              }
                              try {
                                let prSt = [];


                                if (res.data.preferredDestinationStates != null) {
                                  if (res.data.preferredDestinationStates.length > 0) {

                                    res.data.preferredDestinationStates.map(data => {

                                      prSt.push(data.id)

                                    })

                                  }



                                  setDefaultValDestState(prSt);
                                  console.log("prSt" + prSt);
                                  if (prSt.length > 0) {
                                    setDDesStateVis(true);

                                  } else
                                    setDDesStateVis(false)
                                }

                              } catch (e) {
                                setIsLoading(false);
                                console.error(e);
                              }





                            };



                            fetchStateData();









                            if (res.data.resumeName != null) {
                              console.log("RESPONSE RECEIVED: ", res.data.resumeName);
                              setFileName(res.data.resumeName);
                            }


                            if (res.data.resumeContentType != null)
                              setFileType(res.data.resumeContentType);


                            if (res.data.resume != null) {
                              // console.log("RESPONSE RECEIVED res: ", res.data.resume);
                              setResume(res.data.resume);

                            }

                            if (res.data.notes != null) {
                              setNotes(res.data.notes);
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

                          // console.log("AXIOS ERROR: ", err);
                        })

                    })
                    .catch(error => {
                      setIsLoading(false);

                      console.log('error!')
                      alert('User doesnt exist')
                    }
                    );


                  setIsLoading(false);

                  // setDefaultValDestState([2]);


                } catch (error) {
                  setIsLoading(false);
                  console.log(error)
                }

              }

            } else {
              setLoginFlag(false);
            }
          })

      } catch (error) {
        setIsLoading(false);
        console.log(error)
      }
    } else
      setLoginFlag(false);

    setIsLoading(false);
  }, []);

  //   useEffect( ()=>{

  //  });

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    console.log("refre" + refresh);
    if (!refresh) { fetchDatas() }

    return () => {

      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);

    }

  }, [fetchDatas]);

       

  return (


    <View
      style={styles.backgroundImage}>

      <StatusBar backgroundColor="#337AB7"
      />
      {
        !isLogin &&

        <View style={{ position: "absolute", top: 0, marginTop: "5%", marginLeft: 10, marginRight: 20, backgroundColor: "#EDEDED", padding: 20, }}>
          <Text
            style={{
              alignSelf: "center",
              fontWeight: "bold", marginRight: 5, fontSize: fonts.fontNormal, color: "#337AB7", lineHeight: 30,
            }}>You haven't logged in yet. Please login to View/Edit your Profile</Text>

          <TouchableOpacity onPress={navigateLogin} style={styles.loginBtn}>
            <Text  style={styles.textStyle}>Login</Text>
          </TouchableOpacity>
        </View>
      }

      {isLogin &&
        <SafeAreaView
          style={styles.container}
          contentContainerStyle={{ flex: 1, justifyContent: "center" }} >

          {/* <ScrollView
          contentInsetAdjustmentBehavior="automatic"
        > */}


          <KeyboardAwareScrollView
            extraScrollHeight={40}
            resetScrollToCoords={{ x: 0, y: 0 }}
            enableOnAndroid={true}
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

                onChangeText={text => setPhone(text)}
                value={phone}
                style={styles.textInputStyle} />

            </CardView>


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
              <TextInput
                value={enteredDate}
                placeholder="Available to Start" style={{ paddingTop: 0, paddingBottom: 0, width: "90%", fontSize: fonts.fontMedium, height: hp('4.7%'), alignSelf: "center", color: 'black', alignItems: "center", }}
              />
              <Icon onPress={showDatePicker} name="calendar" size={20} color="#337AB7" style={{ marginLeft: 10, alignSelf: "center", alignItems: "center", }} />

            </CardView>


            <Text
              style={styles.rowTextStyle}>Profession</Text>
            {isDProfVis && getProfessions != null && getProfessions.length > 0 && defValProf != null &&

              <DropDownPicker
                items={getProfessions}
                defaultValue={defValProf}
                searchable={true}
                searchablePlaceholder="Search for an item"
                searchablePlaceholderTextColor="gray"

                searchableError={() => <Text style={{ color: "black", fontSize: fonts.fontMedium, textShadowColor: "black" }}>Not Found</Text>}

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
            }
            {!isDProfVis &&

              <DropDownPicker
                items={getProfessions}
                searchable={true}
                searchablePlaceholder="Search for an item"
                searchablePlaceholderTextColor="gray"

                searchableError={() => <Text style={{ color: "black", fontSize: fonts.fontMedium, textShadowColor: "black" }}>Not Found</Text>}

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
            }

            <Text
              style={styles.rowTextStyle}>Speciality</Text>
            {isDSpecVis && getSpeciality != null && getSpeciality.length > 0 && defValSpec != null &&

              <DropDownPicker
                items={getSpeciality}
                defaultValue={defValSpec}
                placeholder="Select Speciality"
                searchable={true}
                searchablePlaceholder="Search for an item"
                searchablePlaceholderTextColor="gray"

                searchableError={() => <Text style={{ color: "black", fontSize: fonts.fontMedium, textShadowColor: "black" }}>Not Found</Text>}

                containerStyle={{ flex: 1, marginTop: 8, marginBottom: 8, width: "92%", alignSelf: "center", }}
                onChangeItem={item => {
                  setSpecid(item.value)

                  console.log(item.label, item.value)
                }
                } />

            }

            {!isDSpecVis &&

              < DropDownPicker
                items={getSpeciality}
                placeholder="Select Speciality"
                searchable={true}
                searchablePlaceholder="Search for an item"
                searchablePlaceholderTextColor="gray"

                searchableError={() => <Text style={{ color: "black", fontSize: fonts.fontMedium, textShadowColor: "black" }}>Not Found</Text>}

                containerStyle={{ flex: 1, marginTop: 8, marginBottom: 8, width: "92%", alignSelf: "center", }}
                onChangeItem={item => {
                  setSpecid(item.value)

                  console.log(item.label, item.value)
                }
                } />

            }

            {/* <MultiSelect
            hideTags
            items={getAllStates}
            uniqueKey="id"
            multiSelect={true}
            // ref={component => {
            //   multiSelect = component;
            // }}
            // onSelectedItemsChange={formjson(item, true)}
            selectedItems={getlcStates}
            selectText="Pick Items"
            searchInputPlaceholderText="Search Items..."
            onChangeInput={text => console.log(text)}
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            selectedItemTextColor="#CCC"
            selectedItemIconColor="#CCC"
            itemTextColor="#000"
            displayKey="name"
            searchInputStyle={{ color: '#CCC' }}
            submitButtonColor="#48d22b"
            submitButtonText="Submit"
          />  */}

            <Text
              style={styles.rowTextStyle}>States Licensed</Text>


            {isDStateVis && getAllStates != null && getAllStates.length > 0 && defValStateLic != null && defValStateLic.length > 0 &&
              <DropDownPicker
                items={getAllStates}
                defaultValue={getAllStates != null && getAllStates.length > 0 ? defValStateLic : [0]}
                searchable={true}
                searchablePlaceholder="Search for an item"
                searchablePlaceholderTextColor="gray"
                placeholder="Select States Licensed"
                multiple={true}
                multipleText="%d items have been selected."
                containerStyle={{ marginTop: 8, marginBottom: 8, width: "92%", alignSelf: "center", }}
                onChangeItem={item => {
                  // console.log("getStates", item);
                  formjson.bind(item, true);

                }
                } />

            }

            {!isDStateVis &&
              <DropDownPicker
                items={getAllStates}
                searchable={true}
                searchablePlaceholder="Search for an item"
                searchablePlaceholderTextColor="gray"
                placeholder="Select States Licensed"
                multiple={true}
                multipleText="%d items have been selected."
                containerStyle={{ marginTop: 8, marginBottom: 8, width: "92%", alignSelf: "center", }}
                onChangeItem={item => {
                  console.log("getStates", item);
                  formjson(item, true);

                }
                } />

            }


            {/* <Text
              style={styles.rowTextStyle}>States Licensed</Text>
            <DropDownPicker
              items={getAllStates}
              defaultIndex={0}
              placeholder="Select States Licensed"

              containerStyle={{ marginTop: 8, marginBottom: 8, width: "92%", alignSelf: "center", height: 40 }}
              onChangeItem={item => {
                setstatelicid(item.value)
                
                console.log(item.label, item.value)}
          }            /> */}

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


            {isDDesStateVis && getAllStates != null && getAllStates.length > 0 && defValDestState != null && defValDestState.length > 0 &&
              <DropDownPicker
                items={getAllStates}
                defaultValue={getAllStates != null && getAllStates.length > 0 ? defValDestState : [0]}
                searchable={true}
                searchablePlaceholder="Search for an item"
                searchablePlaceholderTextColor="gray"

                placeholder="Select Preferred Destination States"
                multiple={true}
                multipleText="%d items have been selected."

                containerStyle={{ marginTop: 8, marginBottom: 8, width: "92%", alignSelf: "center", }}

                onChangeItem={item => {
                  formjson(item, false);

                }
                }
              />
            }



            {!isDDesStateVis &&
              <DropDownPicker
                items={getAllStates}
                searchable={true}
                searchablePlaceholder="Search for an item"
                searchablePlaceholderTextColor="gray"

                // searchableError={() => <Text style={{color:"black" , fontSize:fonts.fontTV, textShadowColor:"black"}}>Not Found</Text>}

                placeholder="Select Preferred Destination States"
                multiple={true}
                multipleText="%d items have been selected."
                min={0}
                max={10}
                containerStyle={{ marginTop: 8, marginBottom: 8, width: "92%", alignSelf: "center", }}

                onChangeItem={item => {
                  formjson(item, false);

                }
                }
              />
            }

            {/* <Text
              style={styles.rowTextStyle}>Preferred Destination States</Text>
            <DropDownPicker
              items={getAllStates}
              defaultIndex={0}
              placeholder="Select Preferred Destination States"

              containerStyle={{ marginTop: 8, marginBottom: 8, width: "92%", alignSelf: "center", height: 40 }}
              onChangeItem={item => {
                setdeststateid(item.value)
                
                console.log(item.label, item.value)}
          }
            /> */}
            <Text
              style={styles.rowTextStyle}>Preferred Recruiter</Text>
            {isDRecVis && getRecruiters != null && getRecruiters.length > 0 && defVal != null &&
              <DropDownPicker
                items={getRecruiters}
                defaultValue={defVal}
                searchable={true}
                searchablePlaceholder="Search for an item"
                searchablePlaceholderTextColor="gray"

                searchableError={() => <Text style={{ color: "black", fontSize: fonts.fontTV, textShadowColor: "black" }}>Not Found</Text>}

                placeholder="Select Preferred Recruiter"

                containerStyle={{ marginTop: 8, marginBottom: 8, width: "92%", alignSelf: "center", height: 40 }}
                onChangeItem={item => {
                  setSelectedRecruiter(item.value)
                  console.log(item.label, item.value)
                }}
              />

            }



            {!isDRecVis &&
              <DropDownPicker
                items={getRecruiters}
                searchable={true}
                searchablePlaceholder="Search for an item"
                searchablePlaceholderTextColor="gray"

                searchableError={() => <Text style={{ color: "black", fontSize: fonts.fontTV, textShadowColor: "black" }}>Not Found</Text>}

                placeholder="Select Preferred Recruiter"

                containerStyle={{ marginTop: 8, marginBottom: 8, width: "92%", alignSelf: "center", height: 40 }}
                onChangeItem={item => {
                  setSelectedRecruiter(item.value)
                  console.log(item.label, item.value)
                }}
              />

            }
            <Text

              style={styles.rowTextStyle}>Note To Recruiter</Text>
            <View style={styles.noteviewStyle}>


              <Icon name="commenting" size={20} color="#337AB7" style={{ marginTop: 12, alignSelf: "flex-start", alignItems: "flex-start" }} />
              <TextInput onChangeText={text => setAddress(text)}
                value={notes}

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
              <Text onPress={updateDataa} style={styles.textStyle}>Submit</Text>
            </TouchableOpacity>


            <View style={{
              width: "90%", flexDirection: 'row', alignSelf: "center"
            }}>




            </View>


          </KeyboardAwareScrollView>


          {/* </ScrollView> */}


        </SafeAreaView>
      }
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
                  navigation.replace('Dashboard')

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

export default ThirdPage;


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
    flexWrap: 'wrap',
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
    marginTop: 25,
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
  }
});





