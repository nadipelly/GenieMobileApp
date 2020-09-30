import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, BackHandler, TouchableHighlight, ActivityIndicator, TouchableWithoutFeedback, FlatList, ListItem, TextInput, SafeAreaView, StatusBar, ScrollView, View, Text, Image, ImageBackground } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import CardView from 'react-native-cardview'

import CheckBox from '@react-native-community/checkbox';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';
import fonts from './fonts';

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

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { sin } from 'react-native-reanimated';
import FilePickerManager from 'react-native-file-picker';
import Modal, { ModalFooter, ModalButton, ModalTitle, SlideAnimation, ModalContent } from 'react-native-modals';
import production from '../domain/production';

const ForgotPassword = ({ route, navigation }) => {

    const [emailid, setEmail] = useState(null)
    const [Title, setTitle] = useState(null)
    const [alertVisiblity, setalertVisiblity] = useState(false)
    const [Body, setBody] = useState(null)

    const [isLoading, setIsLoading] = useState(false);
    const [isNotRegistered, setIsNotRegistered] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);



    function handleBackButtonClick() {
        try {
            if (navigation != null)
                navigation.navigate('Login');
            return true;
        } catch (error) {
            console.log(error)
            return false;
        }
    };


    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        }

    }, []);

    async function submitData() {
        try {
            setIsLoading(true);
            let axiosConfig = {
                headers: {
                    'Content-Type': 'application/json',
                }
            };
            try {

                console.log(production.forgotPasswordAPI);
                console.log(emailid);
                axios.post(production.forgotPasswordAPI, emailid, axiosConfig)
                    .then((res) => {
                        setIsLoading(false);
                        if (res.status != null && res.data != null) {
                            setIsNotRegistered(false);
                            setIsRegistered(true);

                            console.log("RESPONSE RECEIVED1: ", res.data);
                        } else {
                            setIsNotRegistered(true);


                        }

                    })
                    .catch((err) => {
                        setIsLoading(false);
                        setIsNotRegistered(true);

                        if (err.response) {

                            console.log("err" + err.response.data);
                            if (err.response.data.AuthenticationException) {
                                // alert(err.response.data.AuthenticationException)
                                setTitle("Error")
                                setBody(err.response.data.AuthenticationException)
                                setalertVisiblity(true)
                            }
                        }

                    })


            } catch (error) {
            }



        } catch (error) {
            setIsNotRegistered(true);

            setIsLoading(false);
            console.log("RESPONSE err2: ", error);

        }

    };



    updateDataa = () => {
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





    validateEmail = (emailid) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(emailid);
    };




    return (

        <View
            style={styles.backgroundImage}>
            <StatusBar backgroundColor="#337AB7"
            />


            <SafeAreaView
                style={styles.container}
                contentContainerStyle={{ flex: 1, justifyContent: "center" }} >


                {
                    isNotRegistered &&

                    <View>
                        <View style={{ marginTop: 20, marginLeft: 10, marginRight: 10, backgroundColor: "#e1cee1", padding: 10, }}>
                            <Text
                                style={{
                                    width: "92%", alignSelf: "center",
                                    fontWeight: "bold", marginRight: 5, fontSize: fonts.fontMedium, color: "#337AB7",
                                }}>Email address isn't registered! Please check and try again.</Text>

                        </View>

                        <View style={{ marginTop: 20, marginBottom: 20, marginLeft: 10, marginRight: 10, backgroundColor: "#F2DEDE", padding: 10, }}>
                            <Text
                                style={{
                                    width: "92%", alignSelf: "center",
                                    marginRight: 5, fontSize: fonts.fontMedium, color: "#337AB7",
                                }}>Enter the email address you used to register.</Text>
                        </View>
                    </View>
                }


                <KeyboardAwareScrollView
                    extraScrollHeight={40}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    enableOnAndroid={true}
                    keyboardShouldPersistTaps='handled'

                    keyboardVerticalOffset={100}
                >


                    {
                        isRegistered &&

                        <View style={{ marginTop: 20, marginLeft: 10, marginRight: 10, backgroundColor: "#DFF0D8", padding: 10, }}>
                            <Text
                                style={{
                                    width: "92%", alignSelf: "center",
                                    fontWeight: "bold", marginRight: 5, fontSize: fonts.fontMedium, color: "#337AB7",
                                }}>Check your emails for details on how to reset your password.</Text>

                        </View>
                    }


                    {
                        !isRegistered &&
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
                                        setEmail(text)
                                    }
                                    }
                                    style={styles.textInputStyle} />
                            </CardView>



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

export default ForgotPassword;


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
        fontSize: fonts.fontMedium,
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
        fontSize: fonts.fontMedium,
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
    }, rowTextStyle: {
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





