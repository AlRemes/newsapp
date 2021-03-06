import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View,} from 'react-native';
import React, { useState } from 'react';

import { Input, Button, Divider, Text, SearchBar } from '@rneui/themed';

import { Picker } from '@react-native-picker/picker'

import { NavigationContainer } from'@react-navigation/native';
import { createBottomTabNavigator } from'@react-navigation/bottom-tabs';

//To select what kinda news is looked for

const Selection = (props) => {


    const [selectedValue, setSelectedValue] = useState({
        search: null,
        category:null,
        country:null
    });
    const [search, setSearch] = useState(null);

    const changeValue = (item) => {
        props.getData({value:item.value, type:item.type})
        setSelectedValue({...selectedValue, [item.type]:item.value})
    }


return (
        <View>     
            <SearchBar style={{borderWidth:1, height:'20%'}}
            textAlign='center'
            placeholder='Add keyword to filter news'
            onChangeText={text => changeValue({value:text, type:'search'})}
            value={selectedValue.search}
            lightTheme={true}
            /> 

      <View style={styles.vertical}>

      <View
  style={{flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'stretch',
  borderWidth: 1,
  borderRadius: 10
}}>

      <Picker
        selectedValue={selectedValue.category}
        prompt='Category'
        style={{ height: 50, width: '100%' }}
        onValueChange={(itemValue, itemIndex) => changeValue({value:itemValue, type:'category'})}
      > 
        <Picker.Item label="No Category" value={null} />
        <Picker.Item label="Business" value="business" />
        <Picker.Item label="Entertainment" value="entertainment" />
        <Picker.Item label="Environment" value="environment" />
        <Picker.Item label="Food" value="food" />
        <Picker.Item label="Health" value="health" />
        <Picker.Item label="Politics" value="politics" />
        <Picker.Item label="Science" value="science" />
        <Picker.Item label="Sports" value="sports"/>
        <Picker.Item label="Technology" value="technology" />
        <Picker.Item label="Top" value="top"/>
        <Picker.Item label="World" value="world"/>
        </Picker>

        </View>

        <Divider orientation="vertical" width={1} />

        <View
  style={{flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'stretch',
  borderWidth: 1,
  borderRadius: 10
}}>
        <Picker
        selectedValue={selectedValue.country}
        prompt='Country'
        style={{ height: 50, width: '100%',}}
        onValueChange={(itemValue, itemIndex) => changeValue({value:itemValue, type:'country'})}
      > 
        <Picker.Item label="All countries" value={null} />
        <Picker.Item label="Australia" value="au" />
        <Picker.Item label="Brazil" value="br" />
        <Picker.Item label="Canada" value="ca" />
        <Picker.Item label="France" value="fr" />
        <Picker.Item label="Germany" value="de" />
        <Picker.Item label="Netherland" value="nl" />
        <Picker.Item label="Poland" value="pl" />
        <Picker.Item label="South Korea" value="kr" />
        <Picker.Item label="Sweden" value="se" />
        <Picker.Item label="United Kingdom" value="gb" />
        <Picker.Item label="United States" value="us" />
        </Picker>
        </View>
      </View>
    </View>
);

}

export default Selection;

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
        fontWeight:'200',
    },
    vertical: {
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
      },
  });