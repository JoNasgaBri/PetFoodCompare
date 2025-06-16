import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function App() {
  const [message, setMessage] = useState('');
  const [prices, setPrices] = useState([]);

  const comparePrices = () => {
    fetch('http://localhost:3000/products/compare', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: 1 })
    })
      .then(res => res.json())
      .then(data => {
        setMessage(data.message);
        setPrices(data.prices);
      })
      .catch(error => setMessage('Erro ao comparar preços'));
  };

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then(res => res.json())
      .then(data => console.log(data)); // Apenas para verificar os produtos
  }, []);

  return (
    <View style={styles.container}>
      <Text>PetFoodCompare</Text>
      <Button title="Comparar Preços" onPress={comparePrices} />
      <Text>{message}</Text>
      {prices.map((price, index) => (
        <Text key={index}>Loja: {price.store}, Preço: R${price.price}, Envio: R${price.shipping}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});