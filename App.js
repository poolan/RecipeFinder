import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, Image, TextInput, Button, View, Alert, FlatList } from 'react-native';

export default function App() {

  const [keyword, setKeyword] = useState('');
  const [meals, setMeals] = useState([]);

  const fetchMeals = () => 
  {  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)  
  .then(response => response.json())  
  .then(data => setMeals(data.meals))  
  .catch(error => {         Alert.alert('Error', error);   });
} 

const listSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: "80%",
        backgroundColor: "#CED0CE",
        marginLeft: "10%"
      }}
    />
  );
};

  return (
    <View style={styles.container}>
      <FlatList
        data= {meals}
        renderItem={({item}) =>
        <View style={{margin: 10}}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>{item.strMeal}</Text>
        <Image source={{ uri: item.strMealThumb }} style={styles.pictures}></Image>
        </View>
      }
      ItemSeparatorComponent={listSeparator} /> 
      <TextInput
      style={{fontSize: 18}}
        placeholder='keyword'
        onChangeText={text => setKeyword(text)}
      />
      <Button
        title='find'
        onPress={fetchMeals}
        />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  pictures: {
    height:70,
    width:70,
    borderWidth:2,
    borderColor:'#d35647',
    resizeMode:'contain',
  },
});