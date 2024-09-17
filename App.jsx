import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
// import {createStackNavigator} from '@react-navigation/stack';

//Screens
import Home from './screens/HomeScreen';
import FornecedoresScreen from './screens/FornecedoresScreen';
import NovoFornecedorScreen from './screens/NovoFornecedorScreen';

const Drawer = createDrawerNavigator();
// const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" options={{title: 'Home'}} component={Home} />
        <Drawer.Screen
          name="Fornecedores"
          options={{title: 'Fornecedores'}}
          component={FornecedoresScreen}
        />
        <Drawer.Screen
          name="NovoFornecedor"
          options={{
            title: 'Novo Fornecedor',
            drawerItemStyle: {display: 'none'},
          }}
          component={NovoFornecedorScreen}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
