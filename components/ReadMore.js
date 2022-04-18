import { StatusBar } from "expo-status-bar";
import { StyleSheet, FlatList, Alert, ScrollView, View, Image } from "react-native";
import { useState } from "react";

import { useNavigation } from "@react-navigation/native";

import * as WebBrowser from 'expo-web-browser';

import { Icon, Text, Button } from "@rneui/themed";

//More detailed view of news

const ReadMore = ({ route }) => {
  const navigation = useNavigation();
  const [newsItem, setNewsItem] = useState(route.params.newsItem);

  const show = (url) => {
    WebBrowser.openBrowserAsync(url);
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView
    contentContainerStyle={styles.container}>
      <Icon
        reverse
        name="remove"
        type="font-awesome"
        color="#517fa4"
        onPress={goBack}
      />
      <Text style={styles.header}>{newsItem.title}</Text>
      <Text style={styles.underHeader}>{newsItem.pubDate}</Text>
      <View>
      <Image
        style={styles.image}
        source={
          newsItem.image_url !== null
            ? { uri: newsItem.image_url }
            : require("./../img/no_img.png")
        }
      />
      </View>
      <Text style={styles.bodyText}>{newsItem.full_description}</Text>
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
        onPress={() => show(newsItem.link)}
      />
    </ScrollView>
  );
};

export default ReadMore;

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
    fontSize:30,
  },
  underHeader:{
    fontSize:15
  },
  bodyText: {
    fontWeight: "200",
    fontSize:20
,  },
});
