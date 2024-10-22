import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Alert } from 'react-native';
import useFetchData from './useFetchData';

const App: React.FC = () => {
  const { data, loading, error } = useFetchData('https://simple-grocery-store-api.online/products'); // Replace with your API URL

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    Alert.alert('Error', error.message);
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Fruits</Text>
      <View style={styles.itemsContainer}>
        {data.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>${item.price}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card: {
    width: '45%',
    backgroundColor: '#f0f0f0',
    margin: 10,
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    color: '#888',
  },
});

export default App;
