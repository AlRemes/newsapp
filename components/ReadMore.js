import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Alert, Button, Image } from 'react-native';
import { useState } from 'react';

import { NavigationContainer } from'@react-navigation/native';
import { createBottomTabNavigator } from'@react-navigation/bottom-tabs';

//More detailed view of news

const ReadMore = ({route}) => {

    const [newsItem, setNewsItem] = useState(route.params.newsItem)

const show = () => {
  console.log(newsItem)
}

return (
    <View>
        <Text>{newsItem.title}</Text>
        <Image style={styles.image}
           source={ newsItem.image_url!==null ? {uri:newsItem.image_url} : require('./../img/no_img.png')}
           />
        <Text>{newsItem.full_description}</Text>
        <Button
        title='Go to source'
        onPress={show}
        />

    </View>
);

}

export default ReadMore;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image:{
      alignContent:'center',
      width:400,
      height:300,
    },
    header:{
        fontWeight:'bold',
    },
    bodyText:{
        fontWeight:'200'
    }
  });