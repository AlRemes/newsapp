import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './components/HomeScreen';
import News from './components/News';
import ReadMore from './components/ReadMore';
import SavedNews from './components/SavedNews';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationContainer } from'@react-navigation/native';
import { createBottomTabNavigator } from'@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LogBox } from 'react-native'
import Db from './database/Db.js'

//To ignore database warning which is not relevant to this app
LogBox.ignoreLogs(['Setting a timer for a long period of time'])



const NewsStack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function NewsStackScreen() {
  return (
    <NewsStack.Navigator screenOptions={{ headerShown: false }}>
      <NewsStack.Screen name='NewsScreen' component={News} />
      <NewsStack.Screen name='ReadMore' component={ReadMore} />
    </NewsStack.Navigator>
  )
}

function SavedNewsStackScreen() {
  return (
    <NewsStack.Navigator screenOptions={{ headerShown: false }}>
      <NewsStack.Screen name='OldNewsScreen' component={SavedNews} />
      <NewsStack.Screen name='ReadMoreOld' component={ReadMore} />
    </NewsStack.Navigator>
  )
}

export default function App() {
  return (
    <SafeAreaProvider>
      {/* <Db/> */}
    <NavigationContainer>
      <Tab.Navigator
    
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) =>{
          let iconName;

          if (route.name === 'Home'){
            iconName = 'md-home';
          } else if (route.name === 'News'){
            iconName = 'md-newspaper';
          } else if (route.name === 'Saved'){
            iconName = 'md-save'
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="News" component={NewsStackScreen}/>
        <Tab.Screen name="Saved" component={SavedNewsStackScreen}/>
      </Tab.Navigator>
    </NavigationContainer> 
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
