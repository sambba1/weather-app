import { React, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import * as Location from 'expo-location';
import { useEffect } from 'react';
import { APIKEY } from '../api.js';

export default function Weather(props) {

    const [isReady, setReady] = useState(true);
    const [weatherData, setWeatherData] = useState('');
    const [forecastData, setForecastData] = useState('');


    const getGpsWeatherData = async () => {
        setReady(false);

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('No permission to get location')
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?' + 'lat=' + location.coords.latitude + '&lon=' + location.coords.longitude + '&units=metric&appid=' + APIKEY + "&lang=fi");
        const data = await response.json();
        setWeatherData(data);

        const updatedLocations = props.locations.map(location => {
            if (location.city === props.city) {
                return { ...location, weather: data };
            } else {
                return location;
            }
        });
        props.setLocations(updatedLocations);

        const response2 = await fetch('https://api.openweathermap.org/data/2.5/forecast?' + 'lat=' + location.coords.latitude + '&lon=' + location.coords.longitude + '&units=metric&appid=' + APIKEY);
        const data2 = await response2.json();

        let weatherDataWithKeys = data2.list.map((data, index) => {
            let key = index;
            return { key: key, ...data };
        });
        setForecastData(weatherDataWithKeys);
        setReady(true);

        console.log("gps data fetched");

    };
    const getWeatherData = async () => {
        setReady(false);
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + props.city + '&units=metric&appid=' + APIKEY + "&lang=fi");
        const data = await response.json();
        setWeatherData(data);
        const updatedLocations = props.locations.map(location => {
            if (location.city === props.city) {
                return { ...location, weather: data };
            } else {
                return location;
            }
        });
        console.log(updatedLocations);
        props.setLocations(updatedLocations);

        const response2 = await fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + props.city + '&units=metric&appid=' + APIKEY);
        const data2 = await response2.json();

        let weatherDataWithKeys = data2.list.map((data, index) => {
            let key = index;
            return { key: key, ...data };
        });
        setForecastData(weatherDataWithKeys);
        setReady(true);
        console.log("city data fetched");
    };

    const forecast = () => {
        forecastData.forEach((data, index) => {
            const key = `{index}`;
        });
        return (
            <View style={{
                backgroundColor: 'rgba(60, 60, 60, 0.3)',
                borderRadius: 10,
                overflow: 'hidden',
                marginVertical: 20,
                marginHorizontal: 10,
                height: 120,
                width: "90%"
            }}>
                <Text style={{ marginLeft: 20, fontSize: 15 }}>Kolmen tunnin ennuste</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>

                        {forecastData.slice(1, 20).map(item =>
                            <View key={item.key} style={{ marginLeft: 20, alignItems: 'center' }}>
                                <Text style={{ fontSize: 20 }}>{new Date(item.dt_txt).getHours()}</Text>
                                {DrawIcon(item.weather[0].icon, 50)}
                                <Text style={{ fontSize: 20 }}>{Math.round(item.main.temp) + "°"}</Text>
                            </View>
                        )}
                    </View>
                </ScrollView>
            </View>

        );
    }



    const DrawIcon = (iconName, size) => {
        weatherIconUrl = "http://openweathermap.org/img/w/" + iconName + ".png"
        return (
            <Image
                style={{ width: size, height: size }}
                source={{ uri: weatherIconUrl }}
            />
        );

    }



    if (isReady) {
        if (weatherData.length == 0) {
            if (props.city === 'gps') {
                getGpsWeatherData();
            } else {
                getWeatherData();
            }
            return;
        }
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 50 }}>{weatherData.name}</Text>
                    <Text style={{ fontSize: 50 }}>{Math.round(weatherData.main.temp) + "°"}</Text>
                    <Text style={{ fontSize: 20 }}>{weatherData.weather[0].description}</Text>
                    <Text>Y: {Math.round(weatherData.main.temp_max) + "°"}    A: {Math.round(weatherData.main.temp_min) + "°"}</Text>
                    {DrawIcon(weatherData.weather[0].icon, 100)}
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    {forecast()}
                </View>
                <View style={{
                    flex: 2,

                }}>

                </View>
            </View>
        );
    } else {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 50 }}>{"-"}</Text>
                    <Text style={{ fontSize: 50 }}>{"-" + "°"}</Text>
                    <Text style={{ fontSize: 20 }}>{"-"}</Text>
                    <Text>Y: {"-" + "°"}    A: {"-" + "°"}</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                </View>
                <View style={{
                    flex: 2,

                }}>

                </View>
            </View>
        )
    }


};


