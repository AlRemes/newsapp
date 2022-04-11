import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './components/HomeScreen';
import News from './components/News';
import ReadMore from './components/ReadMore';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { NavigationContainer } from'@react-navigation/native';
import { createBottomTabNavigator } from'@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


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

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) =>{
          let iconName;

          if (route.name === 'Home'){
            iconName = 'md-home';
          } else if (route.name === 'News'){
            iconName = 'md-newspaper';
            color='red';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="News" component={NewsStackScreen}/>
      </Tab.Navigator>
    </NavigationContainer>
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
