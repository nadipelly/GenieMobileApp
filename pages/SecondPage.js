import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, TouchableHighlight, BackHandler, StatusBar, Image, ScrollView, View, Text, SafeAreaView } from 'react-native';
import { Card } from 'react-native-elements';
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import fonts from './fonts';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CardView from 'react-native-cardview'



function SecondPage({ route, navigation }) {


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

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

    return () => {

      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);

    }




  }, []);



  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#337AB7"
      />


      {/* <Card
        containerStyle={{

          borderRadius: 10,
          justifyContent: "center",
          alignContent: "center",
          paddingBottom: "30%",
          width: "92%",
        }}> */}


      <CardView style={{
        flexWrap: "wrap",
      }}
        marginLeft={10}
        marginRight={10}
        marginBottom={"4%"}
        padding={10}
        marginTop={"4%"}
        cardElevation={5}
        cardMaxElevation={5}
        cornerRadius={5}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
        >

          <KeyboardAwareScrollView
            extraScrollHeight={40}
            resetScrollToCoords={{ x: 0, y: 0 }}
            enableOnAndroid={true}
            keyboardVerticalOffset={100}
          >


            <View style={{
              width: "100%", flexDirection: 'row',
            }}>

              <Text
                style={{ fontFamily: 'Roboto', fontWeight: "bold", textAlign: "left", marginLeft: 10, marginRight: 5, fontSize: fonts.fontTV, color: "#337AB7", }}>Job</Text>
              <Text style={{ fontFamily: 'Roboto', width: wp('70%'), alignSelf: "flex-start", fontWeight: "bold", marginRight: 10, fontSize: fonts.fontTV, paddingRight: 10, color: "#337AB7", alignSelf: "flex-start" }}>{route.params.id}</Text>

            </View>
            <View style={styles.divider
            }></View>

            <View style={{
              width: "100%", flexDirection: 'row', marginTop: 10,
            }}>

              <Text
                style={{ fontFamily: 'Roboto', fontWeight: "bold", textAlign: "left", marginLeft: 10, marginRight: 5, fontSize: fonts.fontMedium, color: "#337AB7", }}>Profession:</Text>
              <Text style={{ fontFamily: 'Roboto', marginLeft: 10, fontSize: fonts.fontMedium, }}>{route.params.prof}</Text>

            </View>

            <View style={styles.divider
            }></View>
            <View style={{
              width: "100%", flexDirection: 'row', marginTop: 10,
            }}>
              <Text
                style={{ fontFamily: 'Roboto', fontWeight: "bold", textAlign: "left", marginLeft: 10, marginRight: 5, fontSize: fonts.fontMedium, color: "#337AB7", }}>Speciality:</Text>
              <Text style={{ fontFamily: 'Roboto', marginLeft: 10, marginRight: 10, width: "65%", fontSize: fonts.fontMedium, }}>{route.params.specialty}</Text>

            </View>

            <View style={styles.divider
            }></View>
            <View style={{
              width: "100%", flexDirection: 'row', marginTop: 10,
            }}>
              <Text
                style={{ fontFamily: 'Roboto', fontWeight: "bold", textAlign: "left", marginLeft: 10, marginRight: 5, fontSize: fonts.fontMedium, color: "#337AB7", }}>City:</Text>
              <Text style={{ fontFamily: 'Roboto', marginLeft: 10, marginRight: 10, paddingRight: 10, fontSize: fonts.fontMedium, alignSelf: "flex-start" }}>{route.params.city}</Text>

            </View>
            <View style={styles.divider
            }></View>
            <View style={{
              width: "100%", flexDirection: 'row', marginTop: 10,
            }}>
              <Text
                style={{ fontFamily: 'Roboto', fontWeight: "bold", textAlign: "left", marginLeft: 10, marginRight: 5, fontSize: fonts.fontMedium, color: "#337AB7", }}>State:</Text>
              <Text style={{ fontFamily: 'Roboto', marginLeft: 10, marginRight: 10, paddingRight: 10, fontSize: fonts.fontMedium, alignSelf: "flex-start" }}>{route.params.stateName}</Text>


            </View>
            <View style={styles.divider
            }></View>
            <View style={{
              width: "100%", flexDirection: 'row',
            }}>



              <View style={{
                flex: 1, flexDirection: 'row', marginTop: 10,
              }}>
                <Text
                  style={{ fontFamily: 'Roboto', fontWeight: "bold", textAlign: "left", marginLeft: 10, marginRight: 5, fontSize: fonts.fontMedium, color: "#337AB7", }}>Start Date:</Text>
                <Text style={{ fontFamily: 'Roboto', textAlign: "right", fontSize: fonts.fontMedium, color: "#000", }}>{
                  moment(route.params.startDate).format('MMM DD, YYYY')


                }</Text>
              </View>

              {/* <View style={{
                  flex: 1, flexDirection: 'row', justifyContent: "flex-end",
                }}>
                  <Text
                    style={{ textAlign: "right", marginLeft: 10, marginTop: 10, marginRight: 5, fontSize: 14, color: "#337AB7", }}>Pay:</Text>
                  <Text style={{ marginLeft: 10, fontSize: 14, marginTop: 10, alignSelf: "flex-start" }}>{item.rate}</Text>
                </View> */}

            </View>
            <View style={styles.divider
            }></View>
            <View style={{
              width: "100%", flexDirection: 'row', marginTop: 10,
            }}>
              <Text
                style={{ fontFamily: 'Roboto', fontWeight: "bold", textAlign: "left", marginLeft: 10, marginRight: 5, fontSize: fonts.fontMedium, color: "#337AB7", }}>End Date:</Text>

              <Text style={{ fontFamily: 'Roboto', textAlign: "right", fontSize: fonts.fontMedium, color: "#000", }}>{
                moment(route.params.endDate).format('MMM DD, YYYY')


              }</Text>
            </View>

            <View style={styles.divider
            }></View>

            <View style={{
              width: "100%", flexDirection: 'row', marginTop: 10,
            }}>
              <Text
                style={{ fontFamily: 'Roboto', fontWeight: "bold", textAlign: "left", marginLeft: 10, marginRight: 5, fontSize: fonts.fontMedium, color: "#337AB7", }}>Contract Duration:</Text>
              <Text style={{
                fontFamily: 'Roboto',
                fontSize: fonts.fontMedium, alignSelf: "flex-start", paddingRight: 10,
              }}>{route.params.duration}</Text>

            </View>

            <View style={styles.divider
            }></View>

            <View style={{
              width: "100%", flexDirection: 'row', marginTop: 10,
            }}>
              <Text
                style={{ fontFamily: 'Roboto', fontWeight: "bold", textAlign: "left", marginLeft: 10, marginRight: 5, fontSize: fonts.fontMedium, color: "#337AB7", }}>No. Of Positions:</Text>
              <Text style={{
                marginLeft: 10,
                fontSize: fonts.fontMedium, alignSelf: "flex-start", paddingRight: 10,
              }}>{route.params.nopositions}</Text>

            </View>

            <View style={styles.divider
            }></View>

            <View style={{
              width: "100%", flexDirection: 'row', marginTop: 10,
            }}>
              <Text
                style={{ fontFamily: 'Roboto', fontWeight: "bold", textAlign: "left", marginLeft: 10, marginRight: 5, fontSize: fonts.fontMedium, color: "#337AB7", }}>Emp Type:</Text>
              <Text style={{
                fontFamily: 'Roboto',
                marginLeft: 10,
                fontSize: fonts.fontMedium, alignSelf: "flex-start", paddingRight: 10,
              }}>{route.params.empType}</Text>

            </View>

            <View style={styles.divider
            }></View>


            <View style={{
              width: "100%", flexDirection: 'row', marginTop: 10,
            }}>
              <Text
                style={{ fontFamily: 'Roboto', fontWeight: "bold", textAlign: "left", marginLeft: 10, marginRight: 5, fontSize: fonts.fontMedium, color: "#337AB7", }}>Shift:</Text>
              <Text style={{
                fontFamily: 'Roboto',
                marginLeft: 10,
                fontSize: fonts.fontMedium, alignSelf: "flex-start", paddingRight: 10,
              }}>{route.params.shift}</Text>

            </View>

            <View style={styles.divider
            }></View>






            <View style={{
              width: "100%", flexDirection: 'row', marginTop: 10,
            }}>

              <Text
                style={{ fontFamily: 'Roboto', fontWeight: "bold", textAlign: "left", marginLeft: 10, fontSize: fonts.fontMedium, color: "#337AB7", }}>Job Description:</Text>
              <Text style={{
                fontFamily: 'Roboto',
                marginLeft: 10,
                fontSize: fonts.fontMedium, paddingRight: 40,
                width: "65%",
              }}>{route.params.jobDescription}</Text>

            </View>



            {/* <Card 
          containerStyle={{
            backgroundColor:"translucent",
            padding: 10,
          }}>
          <Text>Email: {route.params.email}</Text>
          </Card>
          <Card 
          containerStyle={{
            backgroundColor:"translucent",
            padding: 10,
          }}>
          <Text>Mobile: {route.params.mobile}</Text>
          </Card>
          <Card 
          containerStyle={{
            backgroundColor:"translucent",
            padding: 10,
          }}>
          <Text>Address: {route.params.address}</Text> */}
            {/* </Card> */}


          </KeyboardAwareScrollView>
        </ScrollView>
        {/* </Card> */}
      </CardView>


    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: '#F0F5F9',
  },

  divider: {
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 0.5,
    marginTop: "5%",
  }, headerSt: {
    fontFamily: 'Roboto',
    fontWeight: "bold", textAlign: "left", marginLeft: 10, marginRight: 5, fontSize: fonts.fontMedium, color: "#337AB7",
  }
});


export default SecondPage;