import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput} from 'react-native';
import React, { useState } from 'react';

import { Picker } from '@react-native-picker/picker'

import { NavigationContainer } from'@react-navigation/native';
import { createBottomTabNavigator } from'@react-navigation/bottom-tabs';

//To select what kinda moves is looked for

const Selection = (props) => {


    const [selectedValue, setSelectedValue] = useState({
        category:'null',
        country:'null'
    });
    const [search, setSearch] = useState('');

    const setData = (event) =>{
        console.log(event)
        setSelectedValue({...selectedValue, [event.target.name]: event.target.value} )
        console.log(props.getData)
        props.getData(event)
    }
// Here I'm trying to use usestate object to pass multiple data to parent component
// It seems like I can only pass the value prop from the picker. How can I get
// the right name passed for my selectedobject as well?

return (
        <View>     
            <TextInput style={{borderBottomColor:'grey', borderWidth:1, height:'20%'}}
            textAlign='center'
            placeholder='Search by keyword'
            onChangeText={text => setSearch(text)}
            /> 
            <Picker
        selectedValue={selectedValue.category}
        prompt='Category'
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setData(itemValue)}
      > 
        <Picker.Item label="No Category" value="null" name="category" />
        <Picker.Item label="Business" value="business" name="category"/>
        <Picker.Item label="Entertainment" value="entertainment" name="category"/>
        <Picker.Item label="Environment" value="environment" name="category"/>
        <Picker.Item label="Food" value="food" name="category"/>
        <Picker.Item label="Health" value="health" name="category"/>
        <Picker.Item label="Politics" value="politics" name="category"/>
        <Picker.Item label="Science" value="science" name="category"/>
        <Picker.Item label="Sports" value="sports" name="category"/>
        <Picker.Item label="Technology" value="technology" name="category"/>
        <Picker.Item label="Top" value="top" name="category"/>
        <Picker.Item label="World" value="world" name="category"/>
        </Picker>

            <Picker
        selectedValue={selectedValue.country}
        prompt='Country'
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setData(itemValue)}
      > 
        <Picker.Item label="All countries" value="null" />
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
        fontWeight:'200'
    }
  });