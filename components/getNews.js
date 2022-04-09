import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Alert, Button } from 'react-native';
import { useState } from 'react';

import { NavigationContainer } from'@react-navigation/native';
import { createBottomTabNavigator } from'@react-navigation/bottom-tabs';

//Intented for connecting to API

const GetNews = (props) => {

    const [response, setResponse] = useState([]);

    const news = () => {
        fetch(`https://newsdata.io/api/1/news?apikey=pub_6122d8d0377c8a84047803176ddbd858a232&country=${props.theseNews.country}`)
        .then(response => response.json())
        .then(data => setResponse(data.results))
        .catch(error => {
            Alert.alert('Error', error)
        })
    }
    console.log(response)
return (
    <View>
        <Button
            title='Pressme'
            onPress={news}
        />
        <Text>hi{props.theseNews.country}</Text>
        <FlatList 
        data={response}
        renderItem={({item}) =>
        <View>
        <Text>{item.title}</Text>
        </View>
    }
        keyExctractor={(item, index) => index}
        />
        
    </View>
);

}

export default GetNews;