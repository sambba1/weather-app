import { React, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import  Weather  from './components/Weather';

export default function App() {


  const data = [
    { id: '1', text: 'Page 1' },
    { id: '2', text: 'Page 2' },
  ];

  const screenWidth = Dimensions.get('window').width;

  const renderItem = ({ item }) => (
    <View style={{ width: screenWidth, height: '100%', backgroundColor: '#28587a',}}>
      <Weather/>
    </View>
  );

  return (
      <View style={styles.container}>
        <FlatList
          data={data}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToInterval={screenWidth+50}
          decelerationRate="fast"
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ justifyContent: 'center' }}
        />

      <StatusBar style="auto" />
    </View>
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
