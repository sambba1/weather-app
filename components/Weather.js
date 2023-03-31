import { React, useState } from 'react';
import { View, Text, Image,StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { useEffect } from 'react';
import { APIKEY } from '../api.js';

export default function Weather() {

    const [isReady, setReady] = useState(false);
    const [location, setLocation] = useState(null);
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState('');
    const [temp, setTemp] = useState('');
    const [weatherIconUrl, setWeatherIconUrl] = useState('');


    
    useEffect(() => {
        setReady(false);
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('No permission to get location')
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            fetchData();
        })();
    }, []);

    const fetchData = async () => {
            
        
        try {
          const response = await fetch('https://api.openweathermap.org/data/2.5/weather?'+ 'lat=' + location.coords.latitude + '&lon=' + location.coords.longitude + '&units=metric&appid=' + APIKEY);
          const data = await response.json();
          setTemp(data.main.temp);
          setWeather(data.weather[0].main);
          setCity(data.name);
          setWeatherIconUrl("http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
        } catch(error){
          console.error(error);
        } finally {
          setReady(true);
        }
    };

    if(isReady){
        return (
            <View style={styles.container}>
                <Text style={{fontSize: 50}}>{ city }</Text>
                <Text style={{fontSize: 20}}>{ temp }</Text>
                <Text style={{fontSize: 20}}>{ weather }</Text>
                <Image
                    style={{ width: 100, height: 100 }}
                    source={{ uri: weatherIconUrl }}
                />
            </View>
        );
    }else{
        return(
            <View>
                <Text>Loading...</Text>
            </View>
        )
    }


};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#99EDF9',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

