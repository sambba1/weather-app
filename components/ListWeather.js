import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import  Weather  from './Weather';
import { StatusBar } from 'expo-status-bar';

export default function ListLocations(props){


    const screenWidth = Dimensions.get('window').width;

    const renderItem = ({ item }) => (
      <View style={{ width: screenWidth, height: '100%', backgroundColor: 'rgba(135, 206, 250,255)',}}>
        <Weather city={item.city}/>
      </View>
    );

    return (
        
        <View style={styles.container}>
            <FlatList
            data={props.locations}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToInterval={screenWidth}
            decelerationRate="fast"
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ justifyContent: 'center' }}
            snapToAlignment='start'
            />

            <StatusBar style="auto" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgba(135, 206, 250,255)',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });