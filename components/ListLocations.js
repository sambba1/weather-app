import {React, useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/FontAwesome';
import { APIKEY } from '../api.js';
export default function ListLocations(props){

    const [inputText, setInputText] = useState('');
    const handleInputTextChange = (text) => {
        setInputText(text);
    };

    const handleInputTextSubmit = () => {
        addLocation(inputText);
        setInputText('');
    };
    const screenWidth = Dimensions.get('window').width;

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: 'rgba(135, 206, 255,255)',
          alignItems: 'center',
          justifyContent: 'center',
        },
        textInput: {
            height: 40,
            width: screenWidth-70,
            fontSize: 20,
            borderColor: 'black',
            backgroundColor: 'rgba(20, 20, 20, 0.3)',
            borderWidth: 1,
            borderRadius: 5,
            paddingHorizontal: 10,
        },
    });
    useEffect(() => {
        props.saveLocations();
    });
    const checkValidCity = async (city) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod === 200) {
            return true;
        } else {
            return false;
        }
    };
    const addLocation = async (newLocation) => {
        const isValidCity = await checkValidCity(newLocation);
        if (isValidCity) {
            props.setLocations([...props.locations, {id: props.locations.length + 1, city: newLocation}]);
        } else {
            alert("kaupunkia ei löytynyt");
        }
    };
    const deleteLocation = (id) => {
        props.setLocations(props.locations.filter((item) => item.id !== id));
    };

    const deleteButton = (item) => {
        if(item.city !== "gps"){
            return (
                <TouchableOpacity onPress={() => deleteLocation(item.id)}>
                    <Icon name="trash-o" size={30} color="red" />
                </TouchableOpacity> 
            );
        }
    }
    const cityText = (city) => {
        if(city == "gps"){
            return (
                <Text style={{fontSize: 40, flex: 2}}>Oma sijainti</Text>
            )
        }else{
            return (
                <Text style={{fontSize: 40, flex: 2}}>{city}</Text>
            )
        }
    }

    const renderItem = ({ item }) => (
        <View style={{backgroundColor: 'rgba(60, 60, 60, 0.3)',
        borderRadius: 10,
        overflow: 'hidden',
        marginVertical: 10,
        marginHorizontal: 10,
        height:100,
        width: screenWidth-20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
        }}>
        
            <View style={{flex: 10}}>
                {cityText(item.city)}
            </View>
            <View style={{flex: 1}}>
                {deleteButton(item)}
            </View>
            
            
            
        </View>
    );



    return (
        
        <View style={styles.container}>
        <View style={{flex: 1, paddingTop: 80}}>
            <Text style={{fontSize: 50}}>Sijainnit</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TextInput
                style={styles.textInput}
                placeholder="Etsi kaupunkia"
                value={inputText}
                onChangeText={handleInputTextChange}
                onSubmitEditing={handleInputTextSubmit}
                />
                <TouchableOpacity onPress={handleInputTextSubmit}
                 style={{ 
                    borderColor: 'black',
                    backgroundColor: 'rgba(20, 20, 20, 0.3)',
                    borderWidth: 1,
                    borderRadius: 10,
                    
                  }}>
                    <Text style={{padding: 10}}>Etsi</Text>
                </TouchableOpacity>
            </View>
        </View>

        <View style={{ flex: 7 }}>
            <FlatList
            data={props.locations}
            decelerationRate="fast"
            keyExtractor={item => item.id}
            renderItem={(item) => renderItem(item)}
            />
        </View>
        <StatusBar style="auto" />
        </View>
        
    );
};

