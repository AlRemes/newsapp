import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, ScrollView, Image, Alert } from "react-native";

import * as WebBrowser from "expo-web-browser";

import { Button, Dialog } from "@rneui/themed";

//Will be the starting screen

const HomeScreen = () => {
  const show = (url) => {
    WebBrowser.openBrowserAsync(url);
  };

  const [response, setResponse] = useState([]);
  const [display, setDisplay] = useState(false);

  const TextType = () =>{
    if (!response.full_description){
      if(!response.description){
        return (<Text style={styles.bodyText}>No text available</Text>)
      } else {
        return (<Text style={styles.bodyText}>{response.description}</Text>)
      }
    } else {
      return (<Text style={styles.bodyText}>{response.full_description}</Text>)
    }
  }

  useEffect(() => {
    fetch(
      "https://newsdata.io/api/1/news?apikey=pub_66174091fe7a04f32b72b464153aa5f50fdf&language=en"
    )
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .then((data) => setResponse(data.results[Math.floor(Math.random() * 8)]))
      .then((_) => setDisplay("flex"))
      .catch((error) => {
        if(error.message==='429'){
          Alert.alert('Cannot connect to news source right now..')
          console.log('Too many requests error')
        } else{
        Alert.alert("Error", error.message);}
      });
  }, []);

  if (!display) {
    return (
      <View>
        <Dialog isVisible={"true"}>
          <Dialog.Loading />
        </Dialog>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <Text style={styles.header}>
        Welcome to news app. Here's a random news piece for you!
      </Text>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>{response.title}</Text>
        <Text style={styles.underHeader}>{response.pubDate}</Text>
        <View>
          <Image
            style={styles.image}
            source={
              response.image_url !== null
                ? { uri: response.image_url }
                : require("./../img/no_img.png")
            }
          />
        </View>
        <TextType />
        <Button
          title="Go to source"
          icon={{
            name: "globe",
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
          onPress={() => show(response.link)}
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 400,
    height: 300,
  },
  header: {
    fontWeight: "bold",
    fontSize: 30,
  },
  underHeader: {
    fontSize: 15,
  },
  bodyText: {
    fontWeight: "200",
    fontSize: 20,
  },
});
