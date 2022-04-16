import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, Alert } from "react-native";

import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getDatabase,
  push,
  ref,
  onValue,
  deleteObject,
} from "firebase/database";

import { Input, Button, Divider, Text, ListItem, Dialog } from "@rneui/themed";

const SavedNews = (props) => {
  const [news, setNews] = useState();

  const [visible, setVisible] = useState(false);

  const toggleDialog = () => {
    setVisible(!visible);
  };

  const firebaseConfig = {
    apiKey: "AIzaSyCfeJ_4xvVIVpB74bZPm1cKXlGCk7VS_O4",
    authDomain: "newsapp-e63d8.firebaseapp.com",
    databaseURL:
      " https://newsapp-e63d8-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "newsapp-e63d8",
    storageBucket: "newsapp-e63d8.appspot.com",
    messagingSenderId: "215531470596",
    appId: "1:215531470596:web:df6853a0a8b1a458f49a51",
  };
  let app = null;
  // Initialize Firebase
  getApps().length === 0
    ? (app = initializeApp(firebaseConfig))
    : (app = getApp());
  //const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  const readMore = (newsData) => {
    props.navigation.navigate("ReadMoreOld", { newsItem: newsData.News });
  };

  const confirm = (item) => 
  
  Alert.alert(
    "Confirmation",
    "Are you sure you want to delete this news from saved?",
    [
      {
        text: "Cancel",
        
        style: "cancel"
      },
      { text: "OK", onPress: () => deleteitem(item) }
    ]
  );

  const deleteitem = (item) => {
    ref(database, "news/")
  }

  useEffect(() => {
    const itemsRef = ref(database, "news/");

    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      Object.keys(data).forEach((key) => {
        console.log(key);
      });
      setNews(Object.values(data));
    });
  }, []);

  const renderItem = ({ item }) => (
    <ListItem>
      <ListItem.Content>
        <ListItem.Title>{item.News.title}</ListItem.Title>
        <Divider orientation="vertical" width={1} />
        <ListItem.Title style={{textAlign:'center'}}>{item.News.pubDate}</ListItem.Title>
        <View style={styles.vertical}>
          <Button
            title="Read more"
            icon={{
              name: "arrow-right",
              type: "font-awesome",
              size: 15,
              color: "white",
            }}
            iconRight
            iconContainerStyle={{ marginRight: 10 }}
            titleStyle={{ fontWeight: "700" }}
            buttonStyle={{
              backgroundColor: "rgba(90, 154, 230, 1)",
              borderColor: "transparent",
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
          <Divider orientation="vertical" width={1} />
          <Button
            title="Delete from saved"
            icon={{
              name: "remove",
              type: "font-awesome",
              size: 15,
              color: "white",
            }}
            iconContainerStyle={{ marginRight: 10 }}
            titleStyle={{ fontWeight: "700" }}
            buttonStyle={{
              backgroundColor: "red",
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 30,
            }}
            containerStyle={{
              width: 200,
              marginHorizontal: 50,
              marginVertical: 10,
            }}
            onPress={() => confirm(item)}
          />
        </View>
      </ListItem.Content>
    </ListItem>
  );

  //Will show saved news

  return (
    <View>
      <Text style={styles.header}>Here are your saved news!</Text>

      <FlatList
        data={news}
        renderItem={renderItem}
        keyExctractor={(item, index) => index.toString()}
      />
      <Dialog
      isVisible={visible}
      onBackdropPress={toggleDialog}
    >
      <Dialog.Title title="Really delete?"/>
      <Dialog.Actions>
        <Dialog.Button
          title="CONFIRM"
          onPress={() => {
              return(true)
          }}
        />
        <Dialog.Button title="CANCEL" onPress={toggleDialog} />
      </Dialog.Actions>
    </Dialog>
    </View>
  );
};

export default SavedNews;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
  header: {
      fontSize:30,
    fontWeight: "bold",
    textAlign:'center'
  },
  bodyText: {
    fontWeight: "200",
  },
  vertical: {
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
