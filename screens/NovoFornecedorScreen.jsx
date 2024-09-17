import React, {useState} from 'react';
import {GestorDados} from '../data/GestorDados';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {Picker} from '@react-native-picker/picker';
import {styles as commonStyles} from '../styles/CommonStyles';

const NovoFornecedorScreen = ({navigation}) => {
  const gestor = new GestorDados();

  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {id: 'cosmetics', name: 'Cosméticos'},
    {id: 'household', name: 'Casa'},
    {id: 'electronics', name: 'Eletrônicos'},
    {id: 'furniture', name: 'Móveis'},
    {id: 'clothing', name: 'Roupas'},
  ];

  const categoryMap = categories.reduce((map, category) => {
    map[category.id] = category;
    return map;
  }, {});

  const selectImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];
        setImageUri(selectedImage.uri);
      }
    });
  };

  const save = async () => {
    const fornecedor = {
      code,
      name,
      address,
      contact,
      imageUri,
      category: selectedCategory,
    };

    await gestor.addFornecedor(fornecedor);
    navigation.navigate('Fornecedores');

    reset();
  };

  const reset = () => {
    setCode('');
    setName('');
    setAddress('');
    setContact('');
    setImageUri(null);
    setSelectedCategory(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TextInput
          style={commonStyles.input}
          placeholder="Código"
          keyboardType="number-pad"
          value={code}
          onChangeText={setCode}
        />
        <TextInput
          style={commonStyles.input}
          placeholder="Nome"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={commonStyles.input}
          placeholder="Endereço"
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          style={commonStyles.input}
          placeholder="Contato"
          value={contact}
          onChangeText={setContact}
        />
        <Picker
          selectedValue={selectedCategory?.id} // Usa o ID do objeto selecionado
          onValueChange={itemValue =>
            setSelectedCategory(categoryMap[itemValue])
          }
          style={commonStyles.input}>
          <Picker.Item label="Selecione uma categoria" value={null} />
          {categories.map(category => (
            <Picker.Item
              key={category.id}
              label={category.name}
              value={category.id}
            />
          ))}
        </Picker>

        <TouchableOpacity style={commonStyles.button} onPress={selectImage}>
          <Text style={commonStyles.buttonText}>Selecionar Imagem</Text>
        </TouchableOpacity>
        {imageUri && (
          <Image
            source={{uri: imageUri}}
            style={{width: 100, height: 100, marginVertical: 10}}
          />
        )}

        <TouchableOpacity style={commonStyles.button} onPress={() => save()}>
          <Text style={commonStyles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    width: '80%',
    height: '80%',
    backgroundColor: '#fff',
  },
});

export default NovoFornecedorScreen;
