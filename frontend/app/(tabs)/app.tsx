import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function App() {
  const [message, setMessage] = useState<string>('');
  const [prices, setPrices] = useState<any[]>([]);
  const [error, setError] = useState<string>('');

  const comparePrices = async () => {
    try {
      console.log('Iniciando comparação de preços...');
      const response = await fetch('http://localhost:3000/products/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: 1 }),
      });
      
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Dados recebidos:', data);
      setMessage(data.message);
      setPrices(data.prices);
      setError('');
    } catch (error) {
      console.error('Erro detalhado:', error);
      setError(`Erro ao comparar preços: ${error.message}`);
      setMessage('');
      setPrices([]);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Buscando produtos...');
        const response = await fetch('http://localhost:3000/products');
        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`);
        }
        const data = await response.json();
        console.log('Produtos recebidos:', data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        setError(`Erro ao buscar produtos: ${error.message}`);
      }
    };

    fetchProducts();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PetFoodCompare</Text>
      <Button title="Comparar Preços" onPress={comparePrices} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {message ? <Text style={styles.message}>{message}</Text> : null}
      {prices.map((price, index) => (
        <Text key={index} style={styles.priceText}>
          Loja: {price.store}, Preço: R${price.price}, Envio: R${price.shipping}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  message: {
    marginTop: 10,
    color: 'green'
  },
  error: {
    marginTop: 10,
    color: 'red'
  },
  priceText: {
    marginTop: 10,
    fontSize: 16
  }
});