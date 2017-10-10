import React, { Component } from 'react';
import { Text } from 'react-native'
import firebase from 'firebase';
import { Button, Card, CardSection, Input } from './common'

class LoginForm extends Component {
  state = { email: '', password: '', error: '' };
  onButtonPress(){
    const { email, password } = this.state;

    this.setState({ error: '' });

    // Login with email and password on firebase
    firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(()=> {
      // If login is fail, then try yo create and new account
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(()=> {
          // If create an account fail, then show an error.
          this.setState({ error: 'Authentication Failed.' });
        });
    });
  }

  render(){
    return (
      <Card>
        <CardSection>
          <Input
          label="Email"
          placeholder="user@gmail.com"
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
          secureTextEntry={false}
          />
        </CardSection>
        <CardSection>
          <Input
            placeholder="password"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            label="Password"
            secureTextEntry
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Log in
          </Button>
        </CardSection>
      </Card>
    );
  };
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
}


export default LoginForm;
