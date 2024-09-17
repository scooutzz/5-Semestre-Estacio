import AsyncStorage from '@react-native-async-storage/async-storage';

export class GestorDados {
  async getFornecedores() {
    const fornecedores = await AsyncStorage.getItem('fornecedores').then(
      result => JSON.parse(result),
    );

    return fornecedores;
  }

  async addFornecedor(fornecedor) {
    let fornecedores = await this.getFornecedores();
    if (fornecedores == null) fornecedores = [];

    fornecedores.push(fornecedor);
    await AsyncStorage.setItem('fornecedores', JSON.stringify(fornecedores));
  }

  async deleteFornecedor(code) {
    let fornecedores = await this.getFornecedores();

    fornecedores = fornecedores.filter(fornecedor => fornecedor.code !== code);
    await AsyncStorage.setItem('fornecedores', JSON.stringify(fornecedores));
  }
}
