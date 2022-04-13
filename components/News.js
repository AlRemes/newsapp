import React from'react';
import { View, Text } from'react-native';

import GetNews from './GetNews'
import Selection from './Selection';

//The screen for viewing news

const location = {country : 'us', language: 'en'};

const News = ( {navigation} ) =>{
    return (
        // Add style, flex for each 
        <View style={{flex:1}}>
            <View style={{flex:1}}>
            <Selection  />
            </View>
            <View style={{flex:6}}>
            <GetNews theseNews={location} navigation={navigation}/>
            </View>
        </View>
    )
}

export default News;