import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-Vindo!</Text>
      <Text style={styles.subtitle}>
        Utilize o menu de "hamburguer" para acessar as opções
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Home;
