import React from'react';
import { View, Text } from'react-native';

import GetNews from './getNews';

//The screen for viewing news

const location = {country : 'us', language: 'en'};

const News = () =>{
    return (
        <View>
            <Text>News</Text>
            {/* Trying to add another component to this one with one object. But I can't get the string us to show. */}
            <GetNews theseNews={location}/>
        </View>
    )
}

export default News;