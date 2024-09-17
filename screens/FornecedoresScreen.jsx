import React, {useState, useEffect} from 'react';
import {GestorDados} from '../data/GestorDados';
import {useIsFocused} from '@react-navigation/native';

import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import {styles as commonStyles} from '../styles/CommonStyles';

const FornecedoresScreen = ({navigation}) => {
  const gestor = new GestorDados();
  const [fornecedores, setFornecedores] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    gestor.getFornecedores().then(result => setFornecedores(result));
  }, [isFocused]);

  const deleteFornecedor = async code => {
    await gestor.deleteFornecedor(code);
    gestor.getFornecedores().then(result => setFornecedores(result));
  };

  return (
    <View style={commonStyles.container}>
      <TouchableOpacity
        style={commonStyles.button}
        onPress={() => navigation.navigate('NovoFornecedor')}>
        <Text style={commonStyles.buttonTextBig}>Novo Fornecedor</Text>
      </TouchableOpacity>
      <FlatList
        data={fornecedores}
        renderItem={({item}) => (
          <FornecedorItem item={item} deleteFornecedor={deleteFornecedor} />
        )}
        keyExtractor={item => item.code.toString()}
      />
    </View>
  );
};

const FornecedorItem = ({item, deleteFornecedor}) => {
  return (
    <View style={commonStyles.container} id={item.code.toString()}>
      {item.imageUri && (
        <Image source={{uri: item.imageUri}} style={{width: 50, height: 50}} />
      )}
      <Text style={commonStyles.textItem}>
        {item.code} - {item.name}
      </Text>
      <Text style={commonStyles.textItem}>Endereço: {item.address}</Text>
      <Text style={commonStyles.textItem}>Contato: {item.contact}</Text>
      {item.category && (
        <Text style={commonStyles.textItem}>
          Categoria: {item.category.name}
        </Text>
      )}
      <View style={commonStyles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => deleteFornecedor(item.code)}
          style={commonStyles.deleteButton}>
          <Text style={commonStyles.buttonText}>X</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FornecedoresScreen;
