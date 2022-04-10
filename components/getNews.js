import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Alert, Button, Image } from 'react-native';
import { useState } from 'react';

import { NavigationContainer } from'@react-navigation/native';
import { createBottomTabNavigator } from'@react-navigation/bottom-tabs';

//Intented for connecting to API

const GetNews = (props) => {

    const [response, setResponse] = useState([]);
    const [defaultImg, setDefaultImg] = useState(false);

    const news = () => {
        fetch(`https://newsdata.io/api/1/news?apikey=pub_6122d8d0377c8a84047803176ddbd858a232&country=${props.theseNews.country}&language=${props.theseNews.language}`)
        .then(response => response.json())
        .then(data => setResponse(data.results))
        .catch(error => {
            Alert.alert('Error', error)
        })
    }
return (
    <View>
        <Button
            title='Pressme'
            onPress={news}
        />
        <FlatList 
        data={response}
        renderItem={({item}) =>
        <View>
        <Text>{item.title}</Text>
        <Image style={styles.image}
        //No img source is https://www.freeiconspng.com/downloadimg/23485
        source={ item.image_url!==null ? {uri:item.image_url} : require('./../img/no_img.png')}
        />
        </View>
    }
        keyExctractor={(item, index) => index}
        />
        
    </View>
);

}

export default GetNews;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image:{
      width:100,
      height:100,
    },
  });