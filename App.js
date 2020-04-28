import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Alert} from 'react-native';
import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator
} from 'react-navigation';
import AccountScreen from './src/screens/AccountScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import MainScreen from './src/screens/MainScreen';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { setNavigator } from './src/navigationRef';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import CreateScreen from './src/screens/CreateScreen';
import ManageScreen from './src/screens/ManageScreen';
import SubscribeScreen from './src/screens/SubscribeScreen';
import DiscoverScreen from './src/screens/DiscoverScreen';
import { FontAwesome, MaterialIcons, AntDesign} from '@expo/vector-icons';
import ThemeDetail from "./src/components/ThemeDetail";
import ThemeList from "./src/components/ThemeList";
import CameraScreen from "./src/screens/CameraScreen";
// import Expo, {Notification} from "expo/build/Notifications/Notifications.types";
import {registerRootComponent, Notifications} from 'expo';
import registerForPushNotificationsAsync from './src/services/push_notifications';
import ExpireRedirect from "./src/screens/ExpireRedirect";
export default class App extends React.Component {

    componentDidMount() {
        registerForPushNotificationsAsync(null);
        Notifications.addListener((notification) => {
            const {data: {title}, origin} = notification;
            console.log("received notification\norigin : " + origin + "\ntitle: " + title);
            if (origin === 'received' && title) {
                Alert.alert(
                    'New Push Notification',
                    title,
                    [{text: 'Ok.'}]
                );
            }
        });
    }

    render() {
        const CreateNavigator = createStackNavigator(
            {
                CreateScreenNav: { screen: CreateScreen, params: {imgUri: null}},
                CameraScreenNav: CameraScreen,

            },{
                initialRouteName: 'CreateScreenNav'
            }
        )

        const bottomTabNavigator = createBottomTabNavigator(
            {
                Subscribe: SubscribeScreen,
                Create: CreateNavigator,
                Discover: DiscoverScreen,
                Manage: ManageScreen,

            },
            {
                initialRouteName: 'Manage',
                defaultNavigationOptions: ({navigation}) => ({
                    tabBarIcon: ({focused, horizontal, tintColor}) => {
                        const {routeName} = navigation.state;
                        if(routeName === 'Subscribe'){
                            return(
                                <FontAwesome name="home" size={30}/>
                            )
                        }else if(routeName === 'Manage'){
                            return(
                                <MaterialIcons name="person-outline" size={30}/>
                            )
                        }else if(routeName === 'Discover'){
                            return(
                                <FontAwesome name="search" size={25} />
                            )
                        }else{
                            return(
                                <AntDesign name="pluscircleo" size={25} />
                            )
                        }
                    }
                })
            }
        );

        const switchNavigator = createSwitchNavigator({
                ResolveAuth: ResolveAuthScreen,
                loginFlow: createStackNavigator({
                    Signup: SignupScreen,
                    Signin: SigninScreen
                }, {
                    initialRouteName : "Signin",
                }),
                expireRedirect: ExpireRedirect,
                mainFlow: bottomTabNavigator

            }, {
                initialRouteName: 'loginFlow',
            }
        );

        const Navigator = createAppContainer(switchNavigator);

            return (
                <AuthProvider>
                    <Navigator
                        ref={navigator => {
                            setNavigator(navigator);
                        }}
                    />
                </AuthProvider>
            );

        // return (
        //             <AuthProvider>
        //                 <SwitchNavigator />
        //             </AuthProvider>
        // );
    }
}
registerRootComponent(App);

