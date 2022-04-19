import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, FlatList } from "react-native";
import { useState, useEffect } from "react";

import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase, push, ref, onValue } from "firebase/database";

import {
  Divider,
  Skeleton,
  Button,
  withTheme,
  Text,
  Image,
  Alert,
  ListItem,
  Avatar,
  Dialog,
} from "@rneui/themed";

const GetNews = (props) => {
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

  const saveNews = (news) => {
    push(ref(database, "news/"), { News: news });
    alert("saved");
  };

  const [response, setResponse] = useState([]);
  const [initial, setInitial] = useState(true);

  //For showing message incase news aren't found
  const [found, setFound] = useState("none");

  const [visible, setVisible] = useState(false);
  const toggleDialog = () => {
    setVisible(!visible);
  };
  const [initialMessage, setInitialMessage] = useState(
    "Press Get News to get news!"
  );

  const news = () => {
    setResponse([]);
    setInitial(true);
    setVisible(true);
    setFound('none')
    let url =
      "https://newsdata.io/api/1/news?apikey=pub_66174091fe7a04f32b72b464153aa5f50fdf&language=en";
    let category = props.theseNews.category;
    let country = props.theseNews.country;
    let search = props.theseNews.search;

    //have to check string null and not normal null for some reason..
    if (category) {
      url += "&category=" + category;
    }

    if (country) {
      url += "&country=" + country;
    }

    if (search) {
      url += "&q=" + search;
    }
    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .then((data) => {
        if (data.results.length > 0) {
          setResponse(data.results);
        } else {
          setFound("flex");
        }
      })
      .then((_) => {
        if (found === 'flex'){
          setInitial(true);
          setVisible(false);
        } else{
        setInitial(false);
        setVisible(false);
      }
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  const readMore = (newsData) => {
    props.navigation.navigate("ReadMore", { newsItem: newsData });
  };

  //No img source is https://www.freeiconspng.com/downloadimg/23485
  const renderItem = ({ item }) => (
    <ListItem>
      <Avatar
        style={styles.image}
        source={
          item.image_url !== null
            ? { uri: item.image_url }
            : require("./../img/no_img.png")
        }
      />
      <ListItem.Content>
        <ListItem.Title>{item.title}</ListItem.Title>

        <Divider orientation="vertical" width={5} />

        <ListItem.Subtitle numberOfLines={10}>
          {item.description}
        </ListItem.Subtitle>

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
              width: "45%",
              marginHorizontal: 50,
              marginVertical: 10,
            }}
            onPress={() => readMore(item)}
          />
          <Divider orientation="vertical" width={1} />
          <Button
            title="Save this news"
            icon={{
              name: "save",
              type: "font-awesome",
              size: 15,
              color: "white",
            }}
            iconContainerStyle={{ marginRight: 10 }}
            titleStyle={{ fontWeight: "700" }}
            buttonStyle={{
              backgroundColor: "rgba(140, 144, 230, 1)",
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 30,
            }}
            containerStyle={{
              width: 150,
              marginHorizontal: 50,
              marginVertical: 10,
            }}
            onPress={() => saveNews(item)}
          />
        </View>
      </ListItem.Content>
    </ListItem>
  );

  if (initial) {
    return (
      <View style={styles.container}>
        <Dialog isVisible={visible} onBackdropPress={toggleDialog}>
          <Dialog.Loading />
        </Dialog>
        <Button
          title="Get News!"
          icon={{
            name: "bullhorn",
            type: "font-awesome",
            size: 15,
            color: "white",
          }}
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
          onPress={news}
        />
        <Text style={styles.header}>{initialMessage}</Text>
        <View style={{ display: found, marginTop:150 }}>
          <Text style={{color:'red', fontSize:30, textAlign:'center'}}>
            "No news found... Try different search filters?"
          </Text>
        </View>
      </View>
    );
  }
  return (
    <View style={{flex: 1}}>
      <Dialog isVisible={visible} onBackdropPress={toggleDialog}>
        <Dialog.Loading />
      </Dialog>

      <View style={styles.container}>
        <Button
          title="Get News!"
          icon={{
            name: "bullhorn",
            type: "font-awesome",
            size: 30,
            color: "white",
          }}
          iconContainerStyle={{ marginRight: 10 }}
          titleStyle={{ fontWeight: "700" }}
          buttonStyle={{
            backgroundColor: "rgba(90, 154, 230, 1)",
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 30,
          }}
          containerStyle={{
            width: 270,
            marginHorizontal: 100,
            marginVertical: 20,
          }}
          onPress={news}
        />
      </View>
      <FlatList
        data={response}
        renderItem={renderItem}
        keyExctractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default GetNews;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 75,
    height: 100,
  },
  header: {
    fontSize: 40,
    textAlign: "center",
  },
  bodyText: {
    fontWeight: "200",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  vertical: {
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});
