import React, { useRef, useState, useEffect } from 'react';
import { Card } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontistoIcon from 'react-native-vector-icons/Fontisto';

import axios from 'axios';
import Modal, { ModalFooter, ModalButton, ModalTitle, SlideAnimation, ModalContent } from 'react-native-modals';
import CardView from 'react-native-cardview'

import {
  View, Text, TextInput, ScrollView, UIManager, TouchableWithoutFeedback,
  findNodeHandle, TouchableHighlight, Image, StyleSheet, FlatList, ActivityIndicator, Alert, BackHandler, StatusBar
} from "react-native";
import { List, ListItem, SearchBar, withTheme } from "react-native-elements";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationActions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { color } from 'react-native-reanimated';
import ProgressLoader from 'rn-progress-loader';
import moment from 'moment';
import SearchableDropdown from 'react-native-searchable-dropdown';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TouchableOpacity } from 'react-native-gesture-handler';
import fonts from './fonts';
import SmoothPicker from "react-native-smooth-picker";
import production from '../domain/production';


const FirstPage = ({ navigation }) => {
  const [profile, setProfile] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [isApply, setIsApply] = useState(false);


  const [responseList, setSlides] = useState([]);
  const [arrayholder, setarrayholder] = useState([]);

  const [fetchingStatus, setfetchingStatus] = useState(false);
  const [setOnLoad, OnLoad] = useState(0);
  // const [page, setPage] = useState(0);
  // const [searchPage, setSearchPage] = useState(0);

  const [getAllStates, setAllStates] = useState([]);
  const [getAllStatesPer, setAllStatesPer] = useState([]);
  const [formattedDate, setFormattedDate] = useState(null);

  const [searchProf, setSearchProf] = useState(null);
  const [searchSpec, setSearchSpec] = useState(null);
  const [searchCity, setSearchCity] = useState(null);
  const [searchState, setSearchState] = useState(null);
  const [searchShift, setSearchShift] = useState(null);
  const [searchDate, setSearchDate] = useState(null);
  const [searchId, setSearchid] = useState(null);
  const [isSDate, setSDateVis] = useState(false);

  const [enteredDate, setDate] = useState("")
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isJobs, setJobVis] = useState(false);


  const [isProf, setProfVis] = useState(false);
  const [isSpec, setSpecVis] = useState(false);
  const [isId, setIdVis] = useState(false);
  const [isShift, setShiftVis] = useState(false);
  const [isCity, setCityVis] = useState(false);
  // const [jobs, setJobs] = useState(0);
  // const [pagenum, setPageNum] = useState(1);
  
  const [jobs, setJobs] = useState(0);
  const [pagenum, setPageNum] = useState(1);

  const [page, setSelected] = useState(1);
  const refPicker = useRef(null);
  const opacities = {
    0: 1,
    1: 1,
    2: 0.6,
    3: 0.5,
    4: 0.4,
  };
  const sizeText = {
    0: 16,
    1: 14,
    2: 10,
  };

  const Item = React.memo(({ opacity, selected, vertical, fontSize, name }) => {
    return (


      <View
      >

        <TouchableOpacity style={[styles.OptionWrapper, { opacity, borderColor: selected ? '#337AB7' : 'transparent', width: vertical ? 190 : 'auto' }]}

          onPress={() => {
            setSelected(name)
            apiCallSearch(name - 1);
          }
          }
        >
          <Text style={{ fontSize }}>
            {name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  });




  const ItemToRender = ({ item, index }, indexSelected, vertical) => {

    const selected = index === indexSelected;
    const gap = Math.abs(index - indexSelected);

    let opacity = opacities[gap];
    if (gap > 4) {
      opacity = opacities[4];
    }
    let fontSize = sizeText[gap];
    if (gap > 1) {
      fontSize = sizeText[2.5];
    }

    return <Item
      opacity={opacity} selected={selected} vertical={vertical} fontSize={fontSize} name={item} />;
  };






  function handleBackButtonClick() {
    console.log("nav", navigation)

    Alert.alert(
      'Exit App?',
      'Are you sure you want to exit App?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
        },
        {
          text: 'OK',
          onPress: () => {
            console.log('OK Pressed')
            AsyncStorage.removeItem("login");
            BackHandler.exitApp();
          }
        },
      ],
      { cancelable: false },
    );

    return true;
    // setTitle("Exit App?")
    // setBody("Are you sure you want to exit App")
    // setalertVisiblity(true)
    // navigation.goBack();
    // return true;
  }





  // apiCall = () => {
  //   setfetchingStatus(true)

  //   try {

  //     // setPage(page + 1);
  //     var url = production.jobsSearchAPI + page + '"&query=%7B%22id%22:"' + searchId + '",%22city%22:"' + searchCity + '",%22state%22:"' + searchState + '",%22profession%22:"' + searchProf + '",%22specialty%22:"' + searchSpec + '",%22shift%22:"' + searchShift + '",%22payRate%22:null,%22startDate%22:"' + searchDate + '",%22modifiedDate%22:null,%22empType%22:null,%22jobDesc%22:null,%22rate%22:null,%22facility%22:null,%22jobSource%22:null,%22sourceJobID%22:null%7D&size=20&sort=id,desc'

  //     axios(url)
  //       .then((res) => {
  //         // console.log("RESPONSE RECEIVED1: ", res);

  //         if (res != null && res.status == 200) {
  //           // console.log("RESPONSE RECEIVED A: ", res.data);
  //           setfetchingStatus(false)

  //           setSlides(responseList.concat(res.data))
  //           setarrayholder(responseList.concat(res.data))
  //           navigation.navigate('Dashboard')

  //         }
  //       })
  //       .catch((err) => {
  //         setfetchingStatus(false)
  //         // console.log("RESPONSE ERROR: ", err);

  //         if (err.response) {
  //           // console.log(err.response.data);
  //           if (err.response.data.AuthenticationException) {
  //             // alert(err.response.data.AuthenticationException)

  //             setTitle("Error")
  //             setBody(err.response.data.AuthenticationException)
  //             setalertVisiblity(true)
  //           }
  //         }

  //         // console.log("AXIOS ERROR: ", err);
  //       })





  //   } catch (error) {
  //     setfetchingStatus(false)

  //     console.log(error)

  //   }
  // };

  handleChange = (index) => {
    setSelected(index);
    refPicker.current.scrollToIndex({
      animated: false,
      index: index,
    });
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
    var currentDate = date.getDate();

    if (currentMonth < 10) { currentMonth = '0' + currentMonth; }
    if (currentDate < 10) { currentDate = '0' + currentDate; }

    let sdate = currentMonth + "/" + currentDate + "/" + date.getFullYear();

    setDate(sdate)

    setFormattedDate(moment(sdate).format('yyyy-MM-DD'))


    search(searchProf, searchSpec, searchState, searchCity, searchShift, sdate, searchId)

  };

  setJobsDetails = (count, pages) => {

    // setJobs(2000);
    // setPageNum(20);
    // setJobVis(true)

    if (count != null) {
      setJobs(count);
      setPageNum(pages)
      setJobVis(true);
    } else {
      setJobVis(false);
    }
  };


  apiCallSearch = (page) => {
    // setfetchingStatus(true)

    try {

      setIsLoading(true);

      var url = production.jobsSearchAPI + page + '&query=%7B%22id%22:"' + searchId + '",%22city%22:"' + searchCity + '",%22state%22:"' + searchState + '",%22profession%22:"' + searchProf + '",%22specialty%22:"' + searchSpec + '",%22shift%22:"' + searchShift + '",%22payRate%22:null,%22startDate%22:"' + formattedDate + '",%22modifiedDate%22:null,%22empType%22:null,%22jobDesc%22:null,%22rate%22:null,%22facility%22:null,%22jobSource%22:null,%22sourceJobID%22:null%7D&size=20&sort=id,desc'






      // var url = production.jobsSearchAPI + page + '&query=%7B%22id%22:"' + sid + '",%22city%22:"' + city + '",%22state%22:"' + state + '",%22profession%22:"' + prof + '",%22specialty%22:"' + spec + '",%22shift%22:"' + shift + '",%22payRate%22:null,%22startDate%22:"' + formattedDate + '",%22modifiedDate%22:null,%22empType%22:null,%22jobDesc%22:null,%22rate%22:null,%22facility%22:null,%22jobSource%22:null,%22sourceJobID%22:null%7D&size=20&sort=id,desc'

      console.log(url);

      axios(url)
        .then((res) => {
          // console.log("RESPONSE RECEIVED1: ", res);
          setIsLoading(false);
          if (res != null && res.status == 200) {

            if (res.headers != null) {
              console.log("resh", res.headers);


              setJobsDetails(res.headers.totaljobs, res.headers.totalpages);

            }

            setSlides([]);
            // console.log("RESPONSE RECEIVED A: ", res.data);
            setfetchingStatus(false)
            // setSlides(responseList.concat(res.data))
            setSlides(res.data)

            //  setarrayholder(responseList.concat(res.data))
            navigation.navigate('Dashboard')

          }
        })
        .catch((err) => {
          setfetchingStatus(false)
          // console.log("RESPONSE ERROR: ", err);
          setIsLoading(false);

          if (err.response) {
            console.log(err.response.data);
            if (err.response.data.AuthenticationException) {
              setTitle("Error")
              setBody(err.response.data.AuthenticationException)
              setalertVisiblity(true)
            }
          }

          // console.log("AXIOS ERROR: ", err);
        })

    } catch (error) {
      // setfetchingStatus(false)
      setIsLoading(false);

      console.log(error)

    }
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

    // AsyncStorage.getItem('profiles')
    //   .then(req => JSON.parse(req))
    //   .then(json => {

    //     setProfile(json.profileList)
    //   }
    //   )
    //   .catch(error => console.log('error!'));



    try {

      setIsLoading(true)


      var url = production.jobsListAPI + "0" + '&size=20&sort=id,asc';
      console.log(url);
      axios(url)
        .then((res) => {


          if (res != null && res.status == 200) {
            // setIsLoading(false);
            if (res.headers != null) {

              console.log("headers", res.headers);
              setJobsDetails(res.headers.totaljobs, res.headers.totalpages);

            }

            setSlides(res.data)

            setarrayholder(res.data)

            navigation.navigate('Dashboard')

          }
        })
        .catch((err) => {
          // setIsLoading(false);

          if (err.response) {
            if (err.response.data.AuthenticationException) {

              setTitle("Error")
              setBody(err.response.data.AuthenticationException)
              setalertVisiblity(true)
            }
          }

          // console.log("AXIOS ERROR: ", err);
        })



      const fetchData = async () => {
        let drop_down_data = [];
        let drop_down_dataper = [];

        const result = await axios(production.statesAPI

        );
        drop_down_dataper.push({ label: "All States", value: -1 })

        for (var i = 0; i < result.data.length; i++) {
          // console.log(result.data[i].name + " " + result.data[i].id)
          drop_down_dataper.push({ label: result.data[i].name, value: result.data[i].id });

          drop_down_data.push({ label: result.data[i].name, value: result.data[i].id });
        }

        setAllStates(drop_down_data)
        setAllStatesPer(drop_down_dataper)
        setIsLoading(false);

      };

      fetchData();





    } catch (error) {
      setIsLoading(false);
      console.log(error)
    }
    return () => {

      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);

    }




  }, []);


  searchClear = (prof, spec, state, city, shift, date, sid) => {
    setSearchProf(prof);
    setSearchSpec(spec);
    setSearchCity(city);
    setSearchShift(shift);
    setSearchid(sid);
    setSearchDate(date);
    setDate(date);
    if (date != null) {
      // setFormattedDate(moment(date).format('yyyy-MM-DDT13:00:00.000Z'));
      setFormattedDate(moment(date).format('yyyy-MM-DD'));

    } else {
      setFormattedDate(null);
    }
    search(prof, spec, state, city, shift, date, sid);

  };



  search = (prof, spec, state, city, shift, date, sid) => {


    setSelected(1);
    try {

      console.log("sid" + sid);

      if (!isNumber(sid)) {
        sid = null;
        setSearchid(null);
      }

      if (prof == null || prof == '') {
        setProfVis(false);
      } else
        setProfVis(true);


      if (spec == null || spec == '') {
        setSpecVis(false);
      } else
        setSpecVis(true);



      if (city == null || city == '') {
        setCityVis(false);
      } else
        setCityVis(true);



      if (shift == null || shift == '') {
        setShiftVis(false);
      } else
        setShiftVis(true);

      if (date == null || date == '') {
        setSDateVis(false);
      } else
        setSDateVis(true);

      if (sid == null || sid == '') {
        setIdVis(false);
      } else
        setIdVis(true);


      setIsLoading(true)

      var url = production.jobsSearchAPI + "0" + '&query=%7B%22id%22:"' + sid + '",%22city%22:"' + city + '",%22state%22:"' + state + '",%22profession%22:"' + prof + '",%22specialty%22:"' + spec + '",%22shift%22:"' + shift + '",%22payRate%22:null,%22startDate%22:"' + formattedDate + '",%22modifiedDate%22:null,%22empType%22:null,%22jobDesc%22:null,%22rate%22:null,%22facility%22:null,%22jobSource%22:null,%22sourceJobID%22:null%7D&size=20&sort=id,desc'

      console.log("url" + url);

      axios(url)
        .then((res) => {

          setIsLoading(false)
          if (res != null && res.status == 200) {
            if (res.headers != null) {

              console.log("headers", res.headers);
              setJobsDetails(res.headers.totaljobs, res.headers.totalpages);
            }
            console.log("SEARCH RESPONSE RECEIVED: ", res.data);
            setSlides(res.data)
            navigation.navigate('Dashboard')

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



    } catch (error) {
      setIsLoading(false);
      console.log(error)
    }



    // let matchedItemsArray = []

    //   arrayholder.map((item) => {
    //       if(item.profession.includes(prof) || item.specialty.includes(prof) ){
    //         if(spec!=null && spec!='' && item.specialty!=null && item.specialty.includes(spec))
    //         if(spec!=null && spec!='' && item.specialty!=null && item.specialty.includes(spec))

    //         matchedItemsArray.push(item)
    //       }
    //   })


    // setSlides(matchedItemsArray)
  };

  isNumber = (number) => {
    var re = /(?=.*[0-9])/;
    return re.test(number);

  };


  updateSeparator = () => {
    return (

      <View
        style={{
          height: .5,
          width: "100%",
        }}
      />
    );
  };



  // SearchFilterFunction=(text)=> {
  //   //passing the inserted text in textinput
  //   const newData = arrayholder.filter(function(item) {
  //     //applying filter for the inserted text in search bar
  //     const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
  //     const textData = text.toUpperCase();
  //     return itemData.indexOf(textData) > -1;
  //   });

  // setSlides(newData)
  // }

  // bottomView = () => {
  //   return (

  //     <View>
  //       {
  //         (fetchingStatus)
  //           ?
  //           <ActivityIndicator size="large" color="#F44336" style={{ marginLeft: 6 }} />
  //           :
  //           null
  //       }

  //     </View>


  //   )
  // }





  return (
    <View style={styles.container}>

      <StatusBar backgroundColor="#337AB7"
      />




      {/* <TouchableHighlight onPress={() => { navigation.goBack() }}
        style={{ alignSelf: "flex-end", marginTop: 50, marginRight: 20 }}              >
        <Image
          source={require('../image/logout.png')}
          style={{ alignSelf: "flex-end", width: 20, height: 20, }}

        />
      </TouchableHighlight> */}
      {/* <Text style={{ width: "90%", textAlign: "center", marginTop: "15%", color: "#337AB7", fontSize: 18 }}>Genie Healthcar Jobs</Text> */}
      {/* <View style={{
        borderBottomColor: 'lightgrey', width: "90%",
        borderBottomWidth: 0.5,
        marginLeft: 5,
        marginTop: "12%",
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 10,
        marginBottom: "5%",
        marginRight: 5
      }}></View> */}

      <View style={{ marginLeft: 10, marginRight: 10, width: '100%', marginTop: "2%", flex: 1, }}>




        <FlatList style={{
          backgroundColor: '#F0F5F9',
          width: "100%",
          marginTop: wp('18%'),
          marginBottom: hp('8%'),

        }}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}

          stickyHeaderIndices={[0]}
          ListHeaderComponent={
            <View>

              {isJobs &&
                <View

                  style={styles.header_footer_style}>
                  <Text style={styles.headertextStyle}> Total Jobs: {jobs} </Text>
                </View>
              }
            </View>


          }



          data={responseList}
          renderItem={
            ({ item }) => (

              <TouchableOpacity activeOpacity={1} onPress={() => {
                if (!isApply) {
                  navigation.navigate('SecondPage', { id: item.id, prof: item.profession, specialty: item.specialty, city: item.city, startDate: item.startDate, stateName: item.stateName, shift: item.shift, jobDescription: item.jobDescription, empType: item.empType, nopositions: item.noOfPositions, duration: item.contractDuration, endDate: item.endDate }

                  )
                } else
                  setIsApply(false)
              }
              }
              >


                {/* <View style={styles.flatview}
                > */}


                <CardView
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
                    <Text
                      style={{ flex: 1, fontWeight: "bold", textAlign: "left", marginLeft: 10, marginRight: 5, marginTop: 10, fontSize: fonts.fontTV, color: "#337AB7", }}>{item.id}</Text>


                    <TouchableOpacity
                      onPress={() => {
                        setIsApply(true)
                        navigation.navigate('Registration', { id: item.id }
                        )
                      }
                      }
                    >


                      <Text style={{ flex: 1, paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, borderRadius: 5, justifyContent: "flex-end", backgroundColor: "#337AB7", textAlign: "right", marginTop: 10, fontSize: fonts.fontMedium, color: "#fff", }}>Apply</Text>
                    </TouchableOpacity>

                  </View>

                  <View style={{
                    width: "90%", flexDirection: 'row',
                  }}>

                    <Text
                      style={{ textAlign: "left", marginLeft: 10, marginRight: 5, fontSize: fonts.fontMedium, color: "#337AB7", }}>Profession:</Text>
                    <Text style={{ marginLeft: 10, marginRight: 10, fontSize: fonts.fontMedium, paddingRight: 10, alignSelf: "flex-start" }}>{item.profession}</Text>

                  </View>




                  <View style={{
                    width: "90%", flexDirection: 'row'
                  }}>
                    <Text
                      style={{ textAlign: "left", marginLeft: 10, marginRight: 5, marginTop: 10, fontSize: fonts.fontMedium, color: "#337AB7", }}>Speciality:</Text>
                    <Text style={{ width: "70%", marginLeft: 10, marginTop: 10, marginRight: 10, paddingRight: 10, fontSize: fonts.fontMedium, alignSelf: "flex-start" }}>{item.specialty}</Text>

                  </View>
                  <View style={{
                    width: "100%", flexDirection: 'row',
                  }}>
                    <View style={{
                      flex: 1, flexDirection: 'row',
                    }}>
                      <Text
                        style={{ flex: 0.3, textAlign: "left", marginLeft: 10, marginRight: 5, marginTop: 10, fontSize: fonts.fontMedium, color: "#337AB7", }}>City:</Text>
                      <Text style={{ textAlign: "left", flex: 0.8, marginLeft: 10, marginTop: 10, fontSize: fonts.fontMedium, alignSelf: "flex-start" }}>{item.city}</Text>
                    </View>
                    <View style={{
                      flex: 1, flexDirection: 'row', justifyContent: "flex-end",
                    }}>
                      <Text
                        style={{ flex: 0.3, textAlign: "left", marginLeft: 10, marginRight: 5, marginTop: 10, fontSize: fonts.fontMedium, color: "#337AB7", }}>State:</Text>
                      <Text style={{ flex: 0.8, marginLeft: 5, marginTop: 10, fontSize: fonts.fontMedium }}>{item.stateName}</Text>

                    </View>
                  </View>
                  <View style={{
                    width: "100%", flexDirection: 'row',
                  }}>



                    <View style={{
                      flex: 1, flexDirection: 'row', justifyContent: "flex-start",
                    }}>
                      <Text
                        style={{ flex: 0.9, textAlign: "left", marginLeft: 10, marginTop: 10, marginRight: 5, fontSize: fonts.fontMedium, color: "#337AB7", }}>Start Date:</Text>
                      <Text style={{ flex: 1.1, justifyContent: "flex-start", textAlign: "left", marginTop: 10, fontSize: fonts.fontMedium, color: "#000", }}>{
                        moment(item.startDate).format('MMM DD, YYYY')}</Text>
                    </View>
                    <View style={{
                      flex: 1, flexDirection: 'row', justifyContent: "flex-end",
                    }}>
                      <Text
                        style={{ flex: 1, textAlign: "right", marginLeft: 10, marginTop: 10, marginRight: 5, fontSize: fonts.fontMedium, color: "#337AB7", }}>Emp Type:</Text>
                      <Text style={{ flex: 1, marginLeft: 10, fontSize: fonts.fontMedium, marginTop: 10, alignSelf: "flex-start" }}>{item.empType}</Text>
                    </View>

                  </View>
                  <View style={{
                    width: "90%", flexDirection: 'row',
                  }}>
                    <Text
                      style={{ textAlign: "left", marginLeft: 10, marginRight: 5, marginTop: 10, fontSize: fonts.fontMedium, color: "#337AB7", }}>Shift:</Text>
                    <Text style={{
                      marginLeft: 10, marginTop: 10, paddingRight: 10,
                      fontSize: fonts.fontMedium, alignSelf: "flex-start"
                    }}>{item.shift}</Text>

                  </View>


                  {/* </View> */}
                </CardView>
              </TouchableOpacity>
            )}

          keyExtractor={(item, index) => index.toString()}
        //   ListFooterComponent={

        //     <View style={{ flexGrow: 1, justifyContent: 'flex-end' }} >
        //       {
        //         <ActivityIndicator size="large" animating={fetchingStatus}
        //           color="#337AB7" style={{ marginLeft: 6, }} />
        //       }

        //     </View>
        //   }
        //   ItemSeparatorComponent={updateSeparator}
        //   onScrollEndDrag={() => console.log(" *********end")}
        //   onScrollBeginDrag={() => console.log(" *******start")}
        //   initialNumToRender={4}
        //   maxToRenderPerBatch={1}
        //   onEndReachedThreshold={0.5}
        //   onEndReached={({ distanceFromEnd }) => {
        //     console.log(" ***************** " + distanceFromEnd);
        //     // apiCall();

        //     setSelected(selected + 1);
        //     setPage(selected);
        //     apiCallSearch();

        //   }}

        />


        <ScrollView
          style={{
            position: "absolute",
            marginBottom: 10,
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <View

          >
            <Text
              style={styles.rowTextStyle}>Profession</Text>

            <CardView
              style={{ flexDirection: "row", backgroundColor: "#EDEDED", justifyContent: "center", alignItems: "center" }}
              marginLeft={6}
              marginRight={6}
              marginBottom={3}
              marginTop={3}
              cardElevation={3}
              cardMaxElevation={3}
              cornerRadius={3}>



              <TextInput
                style={styles.searchinput}
                underlineColorAndroid="transparent"
                placeholder="Search profession"
                value={searchProf}
                onChangeText={text => {
                  setSearchProf(text)
                  search(text, searchSpec, searchState, searchCity, searchShift, searchDate, searchId)
                }
                }
              />

              {isProf &&
                <TouchableOpacity style={{ paddingTop: 0, paddingBottom: 0, justifyContent: "center", alignSelf: "center" }} onPress={searchClear.bind("", searchSpec, searchState, searchCity, searchShift, searchDate, searchId)} >
                  <FontistoIcon
                    name="close-a" size={18} color="#337AB7" style={{ paddingTop: 0, paddingBottom: 0, marginRight: 10, alignSelf: "center", alignItems: "center", }} />
                </TouchableOpacity>
              }

            </CardView>
          </View>


          <View>
            <Text
              style={styles.rowTextStyle}>Speciality</Text>

            <CardView
              style={{ flexDirection: "row", backgroundColor: "#EDEDED", justifyContent: "center", alignItems: "center" }}
              marginRight={6}
              marginBottom={3}
              marginTop={3}
              cardElevation={3}
              cardMaxElevation={3}
              cornerRadius={3}>
              <TextInput
                style={styles.searchinput}
                underlineColorAndroid="transparent"
                value={searchSpec}
                underlineColorAndroid="transparent"
                placeholder="Search speciality"
                onChangeText={text => {
                  setSearchSpec(text)
                  search(searchProf, text, searchState, searchCity, searchShift, searchDate, searchId)
                }
                }
              />



              {isSpec &&

                <TouchableOpacity style={{ paddingTop: 0, paddingBottom: 0, justifyContent: "center", alignSelf: "center" }} onPress={searchClear.bind(searchProf, "", searchState, searchCity, searchShift, searchDate, searchId)} >
                  <FontistoIcon
                    name="close-a" size={18} color="#337AB7" style={{ paddingTop: 0, paddingBottom: 0, marginRight: 10, alignSelf: "center", alignItems: "center", }} />
                </TouchableOpacity>
              }
            </CardView>


          </View>


          <View style={{
            flexDirection: 'column', minHeight: 215,

          }}>
            <Text
              style={styles.rowTextStyle}>State</Text>


            <DropDownPicker

              items={getAllStates}
              defaultIndex={0}
              placeholder="All States "
              style={{
                height: hp('5%')
                , backgroundColor: '#EDEDED', marginRight: 6, marginTop: 3
              }}
              containerStyle={{ marginBottom: 8, width: "100%", alignSelf: "center", height: hp('5%') }}
              onChangeItem={item => {

                if (item.value != -1) {
                  setAllStates(getAllStatesPer);
                  setSearchState(item.value)
                  search(searchProf, searchSpec, item.value, searchCity, searchShift, searchDate, searchId)
                } else {
                  setAllStates(getAllStatesPer);
                }

              }}
            />


          </View>
          <View>
            <Text
              style={styles.rowTextStyle}>City</Text>

            <CardView
              style={{ flexDirection: "row", backgroundColor: "#EDEDED", justifyContent: "center", alignItems: "center" }}
              marginRight={6}
              marginBottom={3}
              marginTop={3}
              cardElevation={3}
              cardMaxElevation={3}
              cornerRadius={3}>
              <TextInput
                style={styles.searchinput}
                underlineColorAndroid="transparent"
                value={searchCity}
                underlineColorAndroid="transparent"
                placeholder="Search City"
                onChangeText={text => {
                  setSearchCity(text)
                  search(searchProf, searchSpec, searchState, text, searchShift, searchDate, searchId)
                }
                }
              />

              {isCity &&


                <TouchableOpacity style={{ paddingTop: 0, paddingBottom: 0, justifyContent: "center", alignSelf: "center" }} onPress={searchClear.bind(searchProf, searchSpec, searchState, "", searchShift, searchDate, searchId)} >
                  <FontistoIcon
                    name="close-a" size={18} color="#337AB7" style={{ paddingTop: 0, paddingBottom: 0, marginRight: 10, alignSelf: "center", alignItems: "center", }} />
                </TouchableOpacity>
              }
            </CardView>




          </View>


          <View>
            <Text
              style={styles.rowTextStyle}>Shift</Text>





            <CardView
              style={{ flexDirection: "row", backgroundColor: "#EDEDED", justifyContent: "center", alignItems: "center" }}
              marginRight={6}
              marginBottom={3}
              marginTop={3}
              cardElevation={3}
              cardMaxElevation={3}
              cornerRadius={3}>
              <TextInput
                style={styles.searchinput}
                underlineColorAndroid="transparent"
                value={searchShift}
                underlineColorAndroid="transparent"
                placeholder="Search Shift"
                onChangeText={text => {
                  setSearchShift(text)
                  search(searchProf, searchSpec, searchState, searchCity, text, searchDate, searchId)
                }
                }
              />

              {isShift &&

                <TouchableOpacity style={{ paddingTop: 0, paddingBottom: 0, justifyContent: "center", alignSelf: "center" }} onPress={searchClear.bind(searchProf, searchSpec, searchState, searchCity, "", searchDate, searchId)} >
                  <FontistoIcon
                    name="close-a" size={18} color="#337AB7" style={{ paddingTop: 0, paddingBottom: 0, marginRight: 10, alignSelf: "center", alignItems: "center", }} />
                </TouchableOpacity>

              }
            </CardView>





          </View>


          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <View>
            <Text
              style={styles.rowTextStyle}>Start Date</Text>

            <View style={{
              flexDirection: 'row', backgroundColor: '#EDEDED', justifyContent: "center", alignItems: "center",
              marginRight: 6, height: hp('4.7%'), marginTop: 3, borderRadius: 3,
            }}>


              <TextInput
                style={{
                  paddingLeft: 10,
                  marginRight: 8,
                  paddingTop: 8, height: hp('4.7%'),
                  backgroundColor: 'transparent',

                }}
                underlineColorAndroid="transparent"
                placeholder="Search start date"
                editable={false}
                value={enteredDate}

                onChangeText={text => {
                  setSearchDate(text)
                  search(searchProf, searchSpec, searchState, searchCity, searchShift, text, searchId)
                }
                }
              />
              {isSDate &&



                <TouchableOpacity style={{ paddingTop: 0, paddingBottom: 0, justifyContent: "center", alignSelf: "center" }} onPress={searchClear.bind(searchProf, searchSpec, searchState, searchCity, searchShift, "", searchId)}>
                  <FontistoIcon
                    name="close-a" size={18} color="#337AB7" style={{ paddingTop: 0, paddingBottom: 0, marginRight: 10, alignSelf: "center", alignItems: "center", }} />
                </TouchableOpacity>

              }
              <Icon onPress={showDatePicker} name="calendar" size={24} color="#337AB7" style={{ alignSelf: "center", marginRight: 6, alignItems: "center", }} />

            </View>


          </View>
          <View style={{
          }}>

            <Text
              style={styles.rowTextStyle}>ID</Text>



            <CardView
              style={{ flexDirection: "row", backgroundColor: "#EDEDED", justifyContent: "center", alignItems: "center" }}
              marginRight={6}
              marginBottom={3}
              marginTop={3}
              cardElevation={3}
              cardMaxElevation={3}
              cornerRadius={3}>
              <TextInput
                style={styles.searchinput}
                underlineColorAndroid="transparent"
                value={searchId}
                keyboardType={'numeric'}
                underlineColorAndroid="transparent"
                placeholder="Search Id"
                onChangeText={text => {
                  setSearchid(text)
                  search(searchProf, searchSpec, searchState, searchCity, searchShift, searchDate, text)
                }
                }
              />

              {isId &&



                <TouchableOpacity style={{ paddingTop: 0, paddingBottom: 0, justifyContent: "center", alignSelf: "center" }} onPress={searchClear.bind(searchProf, searchSpec, searchState, searchCity, searchShift, searchDate, "")} >
                  <FontistoIcon
                    name="close-a" size={18} color="#337AB7" style={{ paddingTop: 0, paddingBottom: 0, marginRight: 10, alignSelf: "center", alignItems: "center", }} />
                </TouchableOpacity>

              }
            </CardView>

          </View>
        </ScrollView>
      </View>

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

      <View style={styles.footer}>
        <FlatList contentContainerStyle={{
          paddingLeft: 20,
          paddingRight: 20,
        }}
          horizontal={true}
          data={Array.from({ length: pagenum }, (_, i) => i + 1)}
          keyExtractor={(_, index) => (index).toString()}
          showsHorizontalScrollIndicator={false}
          initialScrollToIndex={page}

          renderItem={option => (
            ItemToRender(option, page - 1, false)
          )}

        // renderItem={({ item }) => (
        //   <TouchableHighlight style={{ backgroundColor: "white" }}
        //     onPress={() => {
        //       setSelected(item);
        //       console.log(item);
        //     }}
        //   >(
        //               ItemToRender(option, selected, false)

        //   </TouchableHighlight>
        // )}
        />



      </View>



      {/* <View style={styles.wrapperHorizontal}>
          <SmoothPicker
            refFlatList={refPicker}
            initialScrollToIndex={selected}
            magnet
            data={Array.from({ length: 16 }, (_, i) => i)}
            onSelected={({ item, index }) => handleChange(index)}
            keyExtractor={(_, index) => index.toString()}
            horizontal={true}
            scrollAnimation
            showsHorizontalScrollIndicator={false}
            renderItem={option => ItemToRender(option, selected, false)}
          />
        </View> */}


      {/* <Text
          style={{ fontWeight: "bold", marginBottom: 10, fontSize: fonts.fontMedium, color: "#337AB7", position: "absolute", bottom: 0, alignSelf: "flex-end", paddingRight: 20 }}>
          1-20/2885
               </Text> */}

      {/* </View> */}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: '#fff',
  },
  listcontainer: {
    flex: 1,
    width: "100%",
    backgroundColor: '#fff',

  },
  flatview: {
    backgroundColor: 'white',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 3,
    marginTop: 3,
    borderRadius: hp('0.4%'),
    padding: 10,

  }, textInputStyle: {
    height: hp('4.5%'),
    borderWidth: 1,
    paddingLeft: 10,
    marginRight: 8,
    alignSelf: "center", paddingTop: 0, paddingBottom: 0,
    borderColor: '#337AB7',
    fontSize: 14,
    backgroundColor: '#FFFFFF',
  },
  textInputStylesearch: {
    height: hp('4.3%'),
    marginRight: 8,
    alignSelf: "center", paddingTop: 0, paddingBottom: 0,
    fontSize: 14,
    borderColor: 'transparent',

    backgroundColor: '#FFFFFF',
  },
  textInputStylenew: {
    height: hp('4.5%'),
    borderWidth: 1,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 8,
    alignSelf: "center", paddingTop: 0, paddingBottom: 0,
    borderColor: '#337AB7',
    fontSize: 14,
    backgroundColor: '#FFFFFF',
  },

  loginBtn: {
    width: "30%",
    backgroundColor: "#337AB7",
    borderRadius: 5,
    height: 30,
    flex: 1,
    alignItems: "center",
    alignSelf: "flex-end",
    justifyContent: "center",
  },
  viewStyle: {
    height: hp('4.5%'),
    borderWidth: 1,
    paddingLeft: 10,
    marginRight: 8,
    alignSelf: "center", paddingTop: 0, paddingBottom: 0,
    borderColor: '#337AB7',
    fontSize: 14,
    backgroundColor: '#FFFFFF',
    width: "92%", flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,.9)',

  },
  viewdivide1Style: {

    flexDirection: 'row',
    height: 40, borderColor: 'white',
    backgroundColor: 'rgba(255,255,255,.9)',
    alignSelf: "center",
    paddingLeft: 5, margin: 3,
  },

  rowTextStyle: {

    fontWeight: "bold", textAlign: "center", marginRight: 5, fontSize: fonts.fontMedium, color: "#337AB7", fontSize: fonts.fontMedium,
  },

  searchOuter: {
    flexDirection: 'row', backgroundColor: 'rgba(255,255,255,.9)', justifyContent: "center",
    borderColor: '#337AB7', borderWidth: 1, marginRight: 6, height: hp('4.5%'), paddingRight: 5,

  },
  searchinput: {
    paddingLeft: 10,
    marginRight: 8,
    fontSize: fonts.fontMedium,
    alignSelf: "center", paddingTop: 0, paddingBottom: 0,
    height: hp('4.5%'),
    backgroundColor: 'transparent',
  }, wrapperHorizontal: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    alignSelf: 'center',
  },

  footer: {
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    position: "absolute",
    backgroundColor: "white",
    bottom: 0,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: '#337AB7',
    color: '#337AB7',
  },

  OptionWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    height: hp('5%'), borderWidth: 3,
    borderRadius: 10,
  }, header_footer_style: {

    width: '100%',
    height: hp('4%'),
    backgroundColor: 'slategrey',
    alignItems: 'center',
    justifyContent: 'center'

  },

  headertextStyle: {

    textAlign: 'center',
    color: '#fff',
    fontSize: fonts.fontTV

  }
});





export default FirstPage;