import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Alert, Button, Image } from 'react-native';
import { useState, useEffect } from 'react';

import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase, push, ref, onValue } from'firebase/database';
import { stringify } from '@firebase/util';

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


    const news = () => {
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
        console.log(url);

        fetch(url)
        .then(response => response.json()
       )
        .then(data => setResponse(data.results))
        .catch(error => {
            Alert.alert('Error', error)
        }) 
        setInitial(false);
    console.log(props.theseNews.category)
    }

    const readMore = (newsData) => {
        props.navigation.navigate('ReadMore', {newsItem:newsData})
    }

    // if (initial){
    //     return(
    //         <View>
    //             <Button
    //         title='Get news'
    //         onPress={news}
    //     />
    //     <Text>Press button to get news!</Text>
    //         </View>
    //     )
    // }
return (
    <View>
        <Button 
            title='Get news'
            onPress={news}
        />
        <FlatList 
        data={response}
        renderItem={({item}) =>
        <View>
        <Text style={styles.header}>{item.title}</Text>
        <Image style={styles.image}
        //No img source is https://www.freeiconspng.com/downloadimg/23485
        source={ item.image_url !== null ? {uri:item.image_url} : require('./../img/no_img.png')}
        />
        <Text style={styles.bodyText} numberOfLines={10}>{item.description}</Text>
        <Button title='Read more' onPress={() => readMore(item)} />
        <Button title='Save this news' onPress={() => saveNews(item)} />
        </View>
    }
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
        fontWeight:'200'
    }
  });