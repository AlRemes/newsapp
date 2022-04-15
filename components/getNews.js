import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, FlatList,} from 'react-native';
import { useState, useEffect } from 'react';

import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase, push, ref, onValue } from'firebase/database';

import { Skeleton, Button, withTheme, Text, Image, Alert, ListItem, Avatar } from '@rneui/themed';


const GetNews = (props) => {
    
    const firebaseConfig = {
  apiKey: "AIzaSyCfeJ_4xvVIVpB74bZPm1cKXlGCk7VS_O4",
  authDomain: "newsapp-e63d8.firebaseapp.com",
  databaseURL: " https://newsapp-e63d8-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "newsapp-e63d8",
  storageBucket: "newsapp-e63d8.appspot.com",
  messagingSenderId: "215531470596",
  appId: "1:215531470596:web:df6853a0a8b1a458f49a51",
};
let app = null;
// Initialize Firebase
getApps().length === 0 ? app = initializeApp(firebaseConfig) : app = getApp();
//const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const saveNews = (news) => {
    push(
        ref(database, 'news/'),
        { 'News' : news}
    );
    alert('saved')
}

    const [response, setResponse] = useState([]);
    const [initial, setInitial] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [initialMessage, setInitialMessage] = useState('Press Get News to get news!')


    const news = () => { 
        setInitial(true);
        setInitialMessage(
            'Loading!'
        );
        let url = 'https://newsdata.io/api/1/news?apikey=pub_6122d8d0377c8a84047803176ddbd858a232&language=en';
        let category = props.theseNews.category;
        let country = props.theseNews.country;
        let search = props.theseNews.search;

        

        if (props.theseNews.category!=null && country == null && (search == null || search == '') ){
            url += '&category=' + category;
        }

        if (props.theseNews.category != null && country != null && (search == null || search == '')) {
            url += '&category=' + category + '&country=' + country
        }

        if (props.theseNews.category != null && country != null && (search != null && search != '')) {
            url += '&category=' + category + '&country=' + country + '&q=' +search
        }

        if (props.theseNews.category == null && country != null && (search == null || search == '')) {
            url += '&country=' + country
        }

        if (props.theseNews.category == null && country != null && (search != null && search != '')) {
            url += '&country=' + country + '&q=' +search
        }
        
        if (props.theseNews.category == null && country == null && (search != null && search != '')) {
            url += '&q=' + search
        }

        fetch(url)
        .then(response => response.json()
       )
        .then(data => setResponse(data.results))
        .then(setInitial(false))
        .catch(error => {
            Alert.alert('Error', error)
        }) 
        
    }

    const readMore = (newsData) => {
        props.navigation.navigate('ReadMore', {newsItem:newsData})
    }

            //No img source is https://www.freeiconspng.com/downloadimg/23485
    renderItem = ({ item }) => (
        <ListItem> 
            <Avatar source={item.image_url !== null ? {uri:item.image_url} : require('./../img/no_img.png')} />
            <ListItem.Content>
                <ListItem.Title>{item.title}</ListItem.Title>
                <ListItem.Subtitle numberOfLines={10}>{item.description}</ListItem.Subtitle>
            <Button
              title="Save this news"
              icon={{
                name: 'save',
                type: 'font-awesome',
                size: 15,
                color: 'white',
              }}
              iconContainerStyle={{ marginRight: 10 }}
              titleStyle={{ fontWeight: '700' }}
              buttonStyle={{
                backgroundColor: 'rgba(90, 154, 230, 1)',
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 30,
              }}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              onPress={() => readMore(item)}
        />

                <Button
              title="Read more"
              icon={{
                name: 'arrow-right',
                type: 'font-awesome',
                size: 15,
                color: 'white',
              }}
              iconRight
              iconContainerStyle={{ marginRight: 10 }}
              titleStyle={{ fontWeight: '700' }}
              buttonStyle={{
                backgroundColor: 'rgba(90, 154, 230, 1)',
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 30,
              }}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              onPress={() => saveNews(item)} />

              </ListItem.Content>
        
        </ListItem>
    )

    if (initial){
        return(
            <View>
                <Button
              title="Get News!"
              icon={{
                name: 'bullhorn',
                type: 'font-awesome',
                size: 15,
                color: 'white',
              }}
              iconContainerStyle={{ marginRight: 10 }}
              titleStyle={{ fontWeight: '700' }}
              buttonStyle={{
                backgroundColor: 'rgba(90, 154, 230, 1)',
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 30,
              }}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              onPress={news}
        />
        <Text>{initialMessage}</Text>
            </View>
        )
    }
return (
    <View>
        <Button
              title="Get News!"
              icon={{
                name: 'bullhorn',
                type: 'font-awesome',
                size: 15,
                color: 'white',
              }}
              iconContainerStyle={{ marginRight: 10 }}
              titleStyle={{ fontWeight: '700' }}
              buttonStyle={{
                backgroundColor: 'rgba(90, 154, 230, 1)',
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 30,
              }}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              onPress={news}
        />
        <FlatList 
        data={response}
        renderItem={renderItem}
        keyExctractor={(item, index) => index.toString()}
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
    header:{
        fontWeight:'bold',
    },
    bodyText:{
        fontWeight:'200',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
  });