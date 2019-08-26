import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation'
import AllNavigations from './src/rootstack'
import { Provider } from 'mobx-react'
import stores from './src/stores/store'
import * as tools from './src/tools/tool'

tools.InitStore(stores);
const AppContainer = createAppContainer(AllNavigations)

export default class App extends Component {
  render() {
    return (
      <Provider store={stores}><AppContainer /></Provider>
    );
  }
}