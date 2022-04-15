import React, { useState, useEffect } from'react';
import { View, Text, Button, FlatList, StyleSheet } from'react-native';

import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase, push, ref, onValue, deleteObject } from'firebase/database';


const SavedNews = (props) =>{    

    const [news, setNews] = useState();

    

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

const showNews = () =>{
    console.log(Object.values(news));
}

const readMore = (newsData) => {
    console.log(newsData);
    props.navigation.navigate('ReadMoreOld', {newsItem:newsData.News})
}

const deleteNews = (item) => {
    const deleteRef = ref(database, 'news/')
}

useEffect(() => {
        const itemsRef = ref(database, 'news/');
        
        onValue(itemsRef, (snapshot) => {
            const data = snapshot.val();
            Object.keys(data).forEach(key => {
                console.log(key);
            });
            setNews(Object.values(data));
        })
    }, []);

//Will show saved news

    return (
        <View>
            <Text>Here are your saved news!</Text>
            <Button 
            title='test'
            onPress={showNews}/>

<FlatList 
        data={news}
        renderItem={({item}) =>
        <View>
        <Text style={styles.header}>{item.News.title}</Text>
        <Text style={styles.bodyText} numberOfLines={10}>{item.News.pubDate}</Text>
        <Button title='Read more' onPress={() => readMore(item)} />
        <Button title='Delete this news' onPress={() => deleteNews(item)} />
        </View>}
        keyExctractor={(item, index) => index.toString()}
        />
            
        </View>
    )
}

export default SavedNews;

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
        fontWeight:'200'
    }
  });