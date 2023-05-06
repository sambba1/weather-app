import { React, useState, useEffect } from 'react';

import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import ListLocations from './components/ListLocations';
import ListWeather from './components/ListWeather';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';




export default function App() {





    const [locations, setLocations] = useState([
      {id: 1, city: 'gps'},
    ]);
    const saveLocations = async () => {
        try {
            await AsyncStorage.setItem('locations', JSON.stringify(locations));
        } catch (error) {
            console.error(error);
        }
    };

  useEffect(() => {
      const loadLocations = async () => {
      try {
          const savedLocations = await AsyncStorage.getItem('locations');
          if (savedLocations !== null) {
              setLocations(JSON.parse(savedLocations));
          }
      } catch (error) {
          console.error(error);
      }
      };
      loadLocations();
  }, []);

  const Tab = createBottomTabNavigator();
  const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;
      if (route.name === 'Weather') {
        iconName = 'md-partly-sunny';
      } else if (route.name === 'Locations') {
        iconName = 'md-pin';
      }
      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarStyle: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'transparent',
      elevation: 0,
      borderTopWidth: 0,
    },
    tabBarShowLabel: false
  });
  


  return (
    
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions} >
        <Tab.Screen
          name="Weather"
          options={{
            headerShown: false,
            tabBarItemStyle: { backgroundColor: 'transparent' },
          }}
        >
          {() => <ListWeather locations={locations} setLocations={setLocations} />}
        </Tab.Screen>
        <Tab.Screen
          name="Locations"
          options={{
            headerShown: false,
            tabBarItemStyle: { backgroundColor: 'transparent' },
          }}
        >
          {() => <ListLocations locations={locations} setLocations={setLocations} saveLocations={saveLocations} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#28587a',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
