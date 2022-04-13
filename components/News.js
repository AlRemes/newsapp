import React, { useState } from'react';
import { View, Text } from'react-native';

import GetNews from './GetNews'
import Selection from './Selection';

//The screen for viewing news




const News = ( {navigation} ) =>{
    
    const [dataToShow, setDataToShow] = useState({
        search: null,
        category:null,
        country:null
});

const handleCallBack = (data) => {
    setDataToShow({
        search:data.search,
        category:data.category,
        country:data.country
    });
}

    return (
        // Add style, flex for each to keep the size right in screen 
        <View style={{flex:1}}>
            <View style={{flex:2}}>
            <Selection getData = {handleCallBack} />
            </View>
            <View style={{flex:6}}>
            <GetNews  theseNews={dataToShow} navigation={navigation}/>
            </View>
        </View>
    )
}

export default News;