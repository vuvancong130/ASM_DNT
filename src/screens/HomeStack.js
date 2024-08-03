import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Register from './RegisterScreen';
import Login from './LoginScreen';
import Welcome from './WelcomeScreen';
import Home from './HomeScreen';
import ForgotPassword from './FogotPassWordScreen';
import BMI from './BMIScreen';
import VD from './VDScreen';
import SKTT from './SKTTScreen';
import Menu from './MenuScreen';
import Poststatus from './PostStatusScreen';
import Profile from './ProfileScreen';
import EditProfile from './EditProfileScreen';
import Music from './Music';
import {useAuth, AuthProvider} from './AuthContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStackNavigator = () => {
  const {isAuthenticated} = useAuth();
  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? 'HomeScreen' : 'WelcomeScreen'}>
      <Stack.Screen
        name="RegisterScreen"
        component={Register}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginScreen"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WelcomeScreen"
        component={Welcome}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeReal}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BMIScreen"
        component={BMI}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SKTTScreen"
        component={SKTT}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="VDScreen"
        component={VD}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MenuScreen"
        component={Menu}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PostStatusScreen"
        component={Poststatus}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MusicScreen"
        component={Music}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const HomeReal = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'BMI':
              iconName = 'cutlery';
              break;
            case 'Menu':
              iconName = 'reorder';
              break;
            case 'SKTT':
              iconName = 'headphones';
              break;
            case 'VD':
              iconName = 'heartbeat';
              break;
            default:
              iconName = 'home';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#F98921',
        tabBarInactiveTintColor: 'white',
        tabBarStyle: {
          display: 'flex',
          backgroundColor: '#282A51',
          height: 60,
        },
        headerShown: false,
        tabBarShowLabel: false,
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="SKTT" component={SKTT} />
      <Tab.Screen name="VD" component={VD} />
      <Tab.Screen name="BMI" component={BMI} />

      <Tab.Screen name="Menu" component={Menu} />
    </Tab.Navigator>
  );
};

const MainTabs = () => {
  const {isAuthenticated} = useAuth();
  return isAuthenticated ? (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'BMI':
              iconName = 'cutlery';
              break;
            case 'Menu':
              iconName = 'reorder';
              break;
            case 'SKTT':
              iconName = 'headphones';
              break;
            case 'VD':
              iconName = 'heartbeat';
              break;
            default:
              iconName = 'home';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#F98921',
        tabBarInactiveTintColor: 'white',
        tabBarStyle: {
          display: 'flex',
          backgroundColor: '#282A51',
          height: 60,
        },
        headerShown: false,
        tabBarShowLabel: false,
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="SKTT" component={SKTT} />
      <Tab.Screen name="VD" component={VD} />
      <Tab.Screen name="BMI" component={BMI} />

      <Tab.Screen name="Menu" component={Menu} />
    </Tab.Navigator>
  ) : (
    <HomeStackNavigator />
  );
};

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <HomeStackNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
