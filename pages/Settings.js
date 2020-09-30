import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, BackHandler, TouchableHighlight, ActivityIndicator, FlatList, ListItem, TextInput, SafeAreaView, StatusBar, ScrollView, View, Text, TouchableOpacity, Image, ImageBackground, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';
import moment from 'moment';
import Modal, { ModalFooter, ModalButton, ModalTitle, SlideAnimation, ModalContent } from 'react-native-modals';
import fonts from './fonts';
import CardView from 'react-native-cardview'

import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Card } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage'
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import production from '../domain/production';

const Settings = ({ route, navigation }) => {
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
    const [getProfessions, setProfessions] = useState([]);
    const [getSpeciality, setSpeciality] = useState([]);

    const [base64Resume, setResume] = useState("")
    const [singleFile, SingleFile] = useState('');
    const [filename, setFileName] = useState("sars");
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
    const [tokenStr, setTokenStr] = useState("")

    const [selrecruiter, setSelectedRecruiter] = useState(null);
    const [profid, setProfid] = useState(null);
    const [specid, setSpecid] = useState(null);
    const [statelicid, setstatelicid] = useState(null);
    const [deststateid, setdeststateid] = useState(null);

    const [Title, setTitle] = useState(null)
    const [alertVisiblity, setalertVisiblity] = useState(false)
    const [Body, setBody] = useState(null)
    const [isLogin, setLoginFlag] = useState(true)


    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {

        var currentMonth = date.getMonth() + 1;
        if (currentMonth < 10) { currentMonth = '0' + currentMonth; }
        let sdate = date.getFullYear() + "-" + currentMonth + "-" + date.getDate();
        setDate(sdate)

        hideDatePicker();
    };



    navigateLogin = () => {
        navigation.replace('Login', { login: true })
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


        console.log("first" + firstname);
        try {
            setIsLoading(true);

            let axiosConfig = {
                headers: {
                    'Content-Type': 'application/json',
                }
            };



            var postData = {

                firstName: firstname,
                lastName: lastname,
                email: emailid,
                langKey: "en",
                login: emailid,

            };

            try {

                axios.post(production.saveSettingsAPI, postData, { headers: { Authorization: tokenStr } })
                    .then((res) => {
                        console.log("RESPONSE RECEIVED: ", res.status);
                        setIsLoading(false);

                        if (res != null && res.status == 200) {
                            setIsLoading(false);
                            console.log("Details have been saved");


                            setTitle("Success")
                            setBody("Details have been saved")
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

        if (firstname == null || firstname == '') {
            alert('Please enter first name')
            return
        }

        if (lastname == null || lastname == '') {
            alert('Please enter last name')
            return
        }

        if (emailid == null || emailid == '') {
            alert('Please enter email id')
            return
        }

        if (!validateEmail(emailid)) {
            alert('Please enter valid email id')
            return
        }



        submitData();

    };



    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);


        setIsLoading(true);



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
                        // const AuthStr = str; 
                        console.log(AuthStr);

                        setTokenStr(AuthStr)

                        axios.get(production.saveSettingsAPI, { headers: { Authorization: AuthStr } })
                            .then((res) => {
                                console.log("RESPONSE1: ", res);

                                if (res != null && res.status == 200) {
                                    console.log("RESPONSE: ", res.data);

                                    setIsLoading(false);


                                    setEmail(res.data.email);
                                    setName(res.data.firstName);
                                    setLName(res.data.lastName);



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
                        console.log('error!')
                        alert('User doesnt exist')
                    }
                    );


                setIsLoading(false);






            } catch (error) {
                setIsLoading(false);
                console.log(error)
            }
        } else {
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
            {/* 
            <StatusBar
                backgroundColor="#041E2F"
            /> */}
            <SafeAreaView
                style={styles.container}
                contentContainerStyle={{ flex: 1, justifyContent: "center" }} >

                <ScrollView
                    contentInsetAdjustmentBehavior="automatic"
                >


                    {!isLogin &&

                        <View style={{ marginTop: "5%", marginLeft: 10, marginRight: 10, backgroundColor: "#EDEDED", padding: 20, }}>
                            <Text
                                style={{
                                    width: "92%", alignSelf: "center",
                                    fontWeight: "bold", marginRight: 5, fontSize: fonts.fontNormal, color: "#337AB7", lineHeight: 30,
                                }}>You haven't logged in yet. Please login to Change Password</Text>



                            <TouchableOpacity onPress={navigateLogin} style={styles.loginBtn}>
                                <Text style={styles.textStyle}>Login</Text>
                            </TouchableOpacity>

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


                            <TouchableOpacity style={styles.loginBtn}>
                                <Text onPress={updateDataa} style={styles.textStyle}>Save Settings</Text>
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
                    <Text style={{ alignSelf: "center", fontSize: fonts.fontTV }}>{Body}</Text>
                </ModalContent>
            </Modal>







        </View>

    );
}

export default Settings;


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

    }
});





