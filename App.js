import 'react-native-gesture-handler';
// import * as React from 'react';
// import React, { useState, useEffect } from 'react';
import React, { Component } from 'react';


import { Button, StyleSheet, Dimensions, TouchableHighlight, TextInput, SafeAreaView, StatusBar, ScrollView, View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerGestureContext } from '@react-navigation/drawer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LoginScreen from './pages/LoginScreen';
import SplashScreen from './pages/SplashScreen';

import DeepLinking from 'react-native-deep-linking';
import { Linking } from 'react-native';

import SignupScreen from './pages/SignupScreen';
import ForgotPassword from './pages/ForgotPassword';
import Icon from 'react-native-vector-icons/FontAwesome';

import AsyncStorage from '@react-native-community/async-storage'

const DEVICE_WIDTH = Dimensions.get('screen').width;
const LOGOTYPE_WIDTH = 70;
const TITLE_OFFSET_CENTER_ALIGN = DEVICE_WIDTH / 2 - LOGOTYPE_WIDTH / 2;
const TITLE_OFFSET_CENTER_ALIGN_RESET = DEVICE_WIDTH / 2 - LOGOTYPE_WIDTH;


import FirstPage from './pages/FirstPage';
import SecondPage from './pages/SecondPage';
import ThirdPage from './pages/ThirdPage';
import ChangePassword from './pages/ChangePassword';
import About from './pages/About';
import Settings from './pages/Settings';
import fonts from './pages/fonts';

import Registration from './pages/Registration';
// global.Domain = 'http://geniehealthjobs.com/api/';




const NavigationDrawerStructure = (props) => {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={() => toggleDrawer()}>
        <Image
          source={{ uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png' }}
          style={{ width: 25, height: 25, marginLeft: 5, tintColor: "#fff", }}
        />
      </TouchableOpacity>
    </View>
  );
}



function firstScreenStack({ navigation }) {


  return (
    <Stack.Navigator
      initialRouteName="FirstPage">

      <Stack.Screen
        name="FirstPage"
        component={FirstPage}
        options={{
          title: 'Genie Healthcare Jobs',
          headerRight: () =>
            <TouchableHighlight onPress={() => {
              AsyncStorage.removeItem('token');
              AsyncStorage.removeItem('uname');
              navigation.replace('Login', { login: true })

            }}
              style={{ alignSelf: "flex-end", marginTop: 6, marginRight: 20 }}              >
              <Image
                source={require('./image/logout.png')}
                resizeMode={'cover'}

                style={{ alignSelf: "flex-end", width: 20, tintColor: "#fff", height: 20, backgroundColor: "#337AB7" }}

              />
            </TouchableHighlight>,
          headerLeft: () => <NavigationDrawerStructure navigationProps={navigation}
            headerStyle={{
              tintColor: "#fff"
            }}
          />,
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: '#337AB7' },
          headerTitleStyle: {
            fontSize: fonts.fontNormal,
            fontWeight: 'bold',
          },
          headerTitleContainerStyle: {
            fontSize: fonts.fontNormal,
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="SecondPage" options={{
          title: "Job Details",
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: '#337AB7' },
          headerTitleStyle: {
            fontSize: fonts.fontNormal,
            fontWeight: 'bold',
          },
          headerTitleContainerStyle: {
            left: TITLE_OFFSET_CENTER_ALIGN - 20, // THIS RIGHT HERE
          },

        }}
        component={SecondPage}
      />

      <Stack.Screen
        name="Registration" options={{
          title: "Apply Job",
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: '#337AB7' },
          headerTitleStyle: {
            fontSize: fonts.fontNormal,
            fontWeight: 'bold',
          },
          headerTitleContainerStyle: {
            left: TITLE_OFFSET_CENTER_ALIGN - 20, // THIS RIGHT HERE
          },

        }}
        component={Registration}
      />

    </Stack.Navigator>
  );
}


function secondScreenStack({ route, navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="ThirdPage"

      screenOptions={{
        headerLeft: () => <NavigationDrawerStructure navigationProps={route, navigation} />,
        headerStyle: {
          backgroundColor: 'transparent', //Set Header color
        },
        headerTintColor: "#fff",
        headerStyle: { backgroundColor: '#337AB7' },
        headerTitleStyle: {
          fontSize: fonts.fontNormal,
          fontWeight: 'bold',
        },
        headerTitleContainerStyle: {
          fontSize: fonts.fontNormal,
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="ThirdPage"
        options={{
          title: "Profile",
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: '#337AB7' },
          headerTitleStyle: {
            fontSize: fonts.fontNormal,
            fontWeight: 'bold',
          },

          headerTitleContainerStyle: {
            left: TITLE_OFFSET_CENTER_ALIGN - 20, // THIS RIGHT HERE
          },
        }}
        component={ThirdPage}
      />
      <Stack.Screen
        name="First Page"
        component={FirstPage}
        options={{
          title: 'Third Page',

          //Set Header Title
        }} />
    </Stack.Navigator>
  );
}



function ThirdScreenStack({ route, navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="ChangePassword"

      screenOptions={{
        headerLeft: () => <NavigationDrawerStructure navigationProps={route, navigation} />,
        headerStyle: {
          backgroundColor: 'transparent', //Set Header color
        },
        headerTintColor: "#fff",
        headerStyle: { backgroundColor: '#337AB7' },
        headerTitleStyle: {
          fontSize: fonts.fontNormal,
          fontWeight: 'bold',
        },
        headerTitleContainerStyle: {
          fontSize: fonts.fontNormal,
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="ChangePassword"
        options={{
          title: "Change Password",
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: '#337AB7' },
          headerTitleStyle: {
            fontSize: fonts.fontNormal,
            fontWeight: 'bold',
          },
          headerTitleContainerStyle: {
            left: TITLE_OFFSET_CENTER_ALIGN - 20, // THIS RIGHT HERE
          },
        }}
        component={ChangePassword}
      />
      <Stack.Screen
        name="Second Page"
        component={SecondPage}
        options={{
          title: 'Change Password', //Set Header Title
        }} />
    </Stack.Navigator>
  );
}


function AboutScreenStack({ route, navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="About"

      screenOptions={{
        headerLeft: () => <NavigationDrawerStructure navigationProps={route, navigation} />,

        headerTintColor: "#fff",
        headerStyle: { backgroundColor: '#337AB7' },
        headerTitleStyle: {
          fontSize: fonts.fontNormal,
          fontWeight: 'bold',
        },
        headerTitleContainerStyle: {
          fontSize: fonts.fontNormal,
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="About"
        options={{
          title: "About",
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: '#337AB7' },
          headerTitleStyle: {
            fontSize: fonts.fontNormal,
            fontWeight: 'bold',
          },
          headerTitleContainerStyle: {
            left: TITLE_OFFSET_CENTER_ALIGN - 20, // THIS RIGHT HERE
          },
        }}
        component={About}
      />
      <Stack.Screen
        name="Second Page"
        component={SecondPage}
        options={{
          title: 'About', //Set Header Title
        }} />
    </Stack.Navigator>
  );
}

function FourthScreenStack({ route, navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Settings"

      screenOptions={{
        headerLeft: () => <NavigationDrawerStructure navigationProps={route, navigation} />,

        headerTintColor: "#fff",
        headerStyle: { backgroundColor: '#337AB7' },
        headerTitleStyle: {
          fontSize: fonts.fontNormal,
          fontWeight: 'bold',
        },
        headerTitleContainerStyle: {
          fontSize: fonts.fontNormal,
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Settings"
        options={{
          title: "Settings",
          headerTintColor: "#fff",
          headerStyle: { backgroundColor: '#337AB7' },
          headerTitleStyle: {
            fontSize: fonts.fontNormal,
            fontWeight: 'bold',
          },
          headerTitleContainerStyle: {
            left: TITLE_OFFSET_CENTER_ALIGN - 20, // THIS RIGHT HERE
          },
        }}
        component={Settings}
      />
      <Stack.Screen
        name="Third Page"
        component={ThirdPage}
        options={{
          title: 'Settings', //Set Header Title
        }} />
      <Stack.Screen
        name="About"
        component={About}
        options={{
          title: 'About', //Set Header Title
        }} />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


function Dashboard() {
  return (

    <Drawer.Navigator

      drawerContentOptions={{
        activeTintColor: '#337AB7',
        tintColor: "#337AB7",
        inactiveTintColor: '#337AB7',
        marginTop: 10,

        labelStyle: {
          fontFamily: 'Roboto',
          fontSize: fonts.fontHeader,
          fontWeight: "bold",
        },
        itemStyle: { marginVertical: 5 },
      }}>
      <Drawer.Screen
        name="FirstPage" options={{
          drawerIcon: config => <Icon name="home" size={20} color="#337AB7" style={{ alignSelf: "center", alignItems: "center" }} />,
          headerTintColor: '#337AB7',
          tintColor: '#337AB7',
          activeTintColor: "#337AB7",
          headerTransparent: "true",
          headerTintColor: "#337AB7",
          drawerLabel: 'Home  ',
          headerTitleContainerStyle: {
            left: TITLE_OFFSET_CENTER_ALIGN,
          },
        }}
        component={firstScreenStack} />
      <Drawer.Screen

        name="ThirdPage"
        options={{
          drawerIcon: config =>
            <Icon name="user" size={20} color="#337AB7" style={{ alignSelf: "center", alignItems: "center" }} />
          ,
          drawerLabel: 'Profile'
        }}
        component={secondScreenStack} />

      <Drawer.Screen

        name="ChangePassword"
        options={{
          drawerIcon: config =>
            <Icon name="lock" size={20} color="#337AB7" style={{ alignSelf: "center", alignItems: "center" }} />
          ,
          drawerLabel: 'Change Password'
        }}
        component={ThirdScreenStack} />

      <Drawer.Screen

        name="Settings"
        options={{

          drawerIcon: config =>
            <Icon name="cog" size={20} color="#337AB7" style={{ alignSelf: "center", alignItems: "center" }} />
          ,
          drawerLabel: 'Settings  '
        }}
        component={FourthScreenStack} />

      <Drawer.Screen

        name="About"

        options={{

          drawerIcon: config =>
            <Icon name="info-circle" size={20} color="#337AB7" style={{ alignSelf: "center", alignItems: "center" }} />
          ,
          drawerLabel: 'About  ',
        }}
        component={AboutScreenStack} />


    </Drawer.Navigator>
  );
}


// export default function App() {
export default class App extends Component {

  state = {
    response: {},
  };
 
  componentDidMount() {
    DeepLinking.addScheme('genie://');
    Linking.addEventListener('url', this.handleUrl);
 
    DeepLinking.addRoute('/app.com', (response) => {
      // example://test
      
      this.setState({ response });
    });
 
    // DeepLinking.addRoute('/test/:id', (response) => {
    //   // example://test/23
    //   this.setState({ response });
    // });
 
    // DeepLinking.addRoute('/test/:id/details', (response) => {
    //   // example://test/100/details
    //   this.setState({ response });
    // });
 
    Linking.getInitialURL().then((url) => {
      if (url) {
        Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }
 
  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleUrl);
  }
 
  // componentDidMount() { // B
  //   if (Platform.OS === 'android') {
  //     Linking.getInitialURL().then(url => {
  //       this.navigate(url);
  //     });
  //   } else {
  //     Linking.addEventListener('url', this.handleOpenURL);
  //   }
  // }

  // componentWillUnmount() { // C
  //   Linking.removeEventListener('url', this.handleOpenURL);
  // }
  // handleUrl = (event) => { // D
  //   this.navigate(event.url);
  // }
  // navigate = (url) => { // E
  //   const { navigate } = this.props.navigation;
  //   const route = url.replace(/.*?:\/\//g, '');
  //   const id = route.match(/\/([^\/]+)\/?$/)[1];
  //   const routeName = route.split('/')[0];

  //   if (routeName === 'splash') {
  //     navigate('Splash')
  //   };
  // }


  handleUrl = ({ url }) => {
          // navigate('Splash')
            // this.navigate('Splash')
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        DeepLinking.evaluateUrl(url);
      }

            // alert('Url Clicked')

    });
  }

  // componentDidMount() {
  //   Linking.addEventListener('url', this.handleOpenURL);
  // }
  // componentWillUnmount() {
  //   Linking.removeEventListener('url', this.handleOpenURL);
  // }
  // handleOpenURL(event) {
  //   console.log(event.url);
  //   const route = e.url.replace(/.*?:\/\//g, '');
  //   // do something with the url, in our case navigate(route)
  // }

  // const [response, setDresponse] = useState({});

  // DeepLinking.addScheme('example://');

  // Linking.addEventListener('url', handleUrl);

  // const handleUrl = ({ url }) => {
  //   Linking.canOpenURL(url).then((supported) => {
  //     if (supported) {
  //       DeepLinking.evaluateUrl(url);
  //     }
  //   });
  // };
  // useEffect(() => {
  //   DeepLinking.addScheme('example://');
  //   Linking.addEventListener('url', handleUrl);

  //   DeepLinking.addRoute('/test', (response) => {
  //     // example://test
  //     setDResponse({ response });
  //   });



  //   Linking.getInitialURL().then((url) => {
  //     if (url) {
  //       Linking.openURL(url);
  //     }
  //   }).catch(err => console.error('An error occurred', err));



  //   return () => {
  //     Linking.removeEventListener('url', handleUrl);
  //   }
  // }, []);


  // useEffect(() => {
  //   DeepLinking.addScheme('example://');
  //   Linking.addEventListener('url', handleUrl);

  //   DeepLinking.addRoute('/test', (response) => {
  //     this.setState({ response });

  //     Linking.getInitialURL().then((url) => {
  //       if (url) {
  //         Linking.openURL(url);
  //       }
  //     }).catch(err => console.error('An error occurred', err));




  //     return () => {
  //       Linking.removeEventListener('url', handleUrl);
  //     }


  // }, []);

  // handleUrl = ({ url }) => {
  //   Linking.canOpenURL(url).then((supported) => {
  //     if (supported) {
  //       DeepLinking.evaluateUrl(url);
  //     }
  //   });
  // }

  render() {


    return (
      
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Splash" component={SplashScreen} options={{
            headerTintColor: "#fff",
            headerStyle: { backgroundColor: '#337AB7' },
            headerTitleStyle: {
              fontSize: fonts.fontNormal,
              fontWeight: 'bold',
            },
            headerTitleContainerStyle: {
              left: TITLE_OFFSET_CENTER_ALIGN - 30, // THIS RIGHT HERE
            }, headerShown: false,
          }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{
            headerTintColor: "#fff",
            headerStyle: { backgroundColor: '#337AB7' },
            headerTitleStyle: {
              fontSize: fonts.fontNormal,
              fontWeight: 'bold',
            },
            headerTitleContainerStyle: {
              left: TITLE_OFFSET_CENTER_ALIGN, // THIS RIGHT HERE
            },
          }} />
          <Stack.Screen name="Signup" component={SignupScreen} options={{
            headerTintColor: "#fff",
            headerStyle: { backgroundColor: '#337AB7' },
            headerTitleStyle: {
              fontSize: fonts.fontNormal,
              fontWeight: 'bold',
            },
            headerTitleContainerStyle: {
              left: TITLE_OFFSET_CENTER_ALIGN, // THIS RIGHT HERE
            },
          }} />
          <Stack.Screen name="Reset Password" component={ForgotPassword} options={{
            headerTintColor: "#fff",
            headerStyle: { backgroundColor: '#337AB7' },
            headerTitleStyle: {
              fontSize: fonts.fontNormal,
              fontWeight: 'bold',
            },
            headerTitleContainerStyle: {
              left: TITLE_OFFSET_CENTER_ALIGN_RESET, // THIS RIGHT HERE
            },
          }} />
          <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>

    );
  }
}


// import React, { Component } from 'react';
// import { Alert, Button, Linking, StyleSheet, Text, View } from 'react-native';
 
// import DeepLinking from 'react-native-deep-linking';
 
// export default class App extends Component {
//   state = {
//     response: {},
//   };
 
//   componentDidMount() {
//     DeepLinking.addScheme('genie://');
//     Linking.addEventListener('url', this.handleUrl);
 
//     DeepLinking.addRoute('/app', (response) => {
//       // example://test
//       this.setState({ response });
//     });
 
//     DeepLinking.addRoute('/app/:id', (response) => {
//       // example://test/23
//       this.setState({ response });
//     });
 
//     DeepLinking.addRoute('/app/:id/details', (response) => {
//       // example://test/100/details
//       this.setState({ response });
//     });
 
//     Linking.getInitialURL().then((url) => {
//       if (url) {
//         Linking.openURL(url);
//       }
//     }).catch(err => console.error('An error occurred', err));
//   }
 
//   componentWillUnmount() {
//     Linking.removeEventListener('url', this.handleUrl);
//   }
 
//   handleUrl = ({ url }) => {
//     Linking.canOpenURL(url).then((supported) => {
//       // if (supported) {
//       //   DeepLinking.evaluateUrl(url);
//       // }

//       alert('Url Clicked')
//     });
//   }
 
//   render() {
//     return (
//       <View style={styles.container}>
//         <View style={styles.container}>
//           <Button
//             onPress={() => Linking.openURL('genie://app')}
//             title="Open genie://app"
//           />
//           <Button
//             onPress={() => Linking.openURL('genie://app/23')}
//             title="Open genie://app/23"
//           />
//           <Button
//             onPress={() => Linking.openURL('genie://app/100/details')}
//             title="Open genie://app/100/details"
//           />
//         </View>
//         <View style={styles.container}>
//           <Text style={styles.text}>{this.state.response.scheme ? `Url scheme: ${this.state.response.scheme}` : ''}</Text>
//           <Text style={styles.text}>{this.state.response.path ? `Url path: ${this.state.response.path}` : ''}</Text>
//           <Text style={styles.text}>{this.state.response.id ? `Url id: ${this.state.response.id}` : ''}</Text>
//         </View>
//       </View>
//     );
//   }
// }
 
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 18,
//     margin: 10,
//   },
// });