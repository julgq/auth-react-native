import React, { Component } from 'react';
import {View, Text } from 'react-native';
import firebase from 'firebase';
import { Header, Button } from './components/common';


class App extends Component {
  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBb5aAZR7U31aPt-8-IUlCZsjx0CyL10Dk',
      authDomain: 'auth-98942.firebaseapp.com',
      databaseURL: 'https://auth-98942.firebaseio.com',
      projectId: 'auth-98942',
      storageBucket: 'auth-98942.appspot.com',
      messagingSenderId: '892416382931'
    });

  }

  render(){
    return (
      <View>
      <Header headerText='Authentication' />
        <Text>An App!</Text>
      </View>
    );
  };
}

export default App;
