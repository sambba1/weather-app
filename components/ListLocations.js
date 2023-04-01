import {React, useState} from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import { StatusBar } from 'expo-status-bar';


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
          backgroundColor: '#28587a',
          alignItems: 'center',
          justifyContent: 'center',
        },
        textInput: {
            height: 40,
            width: screenWidth,
            fontSize: 20,
            borderColor: 'black',
            backgroundColor: 'rgba(20, 20, 20, 0.3)',
            borderWidth: 1,
            borderRadius: 5,
            paddingHorizontal: 10,
        },
    });
    const addLocation = (newLocation) => {
        props.setLocations([...props.locations, {id: props.locations.length + 1, city: newLocation}]);
    };
    const deleteLocation = (id) => {
        props.setLocations(props.locations.filter((item) => item.id !== id));
    };

    const renderItem = ({ item }) => (
        <View style={{backgroundColor: 'rgba(60, 60, 60, 0.3)',
        borderRadius: 10,
        overflow: 'hidden',
        marginVertical: 10,
        marginHorizontal: 10,
        height:100,
        width: screenWidth-20,
        flexDirection: 'row',
        justifyContent: 'center'}}>
            <Text style={{fontSize: 40, flex: 2}}>{item.city}</Text>
            <TouchableOpacity onPress={() => deleteLocation(item.id)}>
                <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>  
            
        </View>
    );

    return (
        
        <View style={styles.container}>
        <View style={{flex: 1, paddingTop: 80}}>
            <Text style={{fontSize: 50}}>Sää</Text>
            <TextInput
            style={styles.textInput}
            placeholder="Etsi kaupunkia"
            value={inputText}
            onChangeText={handleInputTextChange}
            onSubmitEditing={handleInputTextSubmit}
            />
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

