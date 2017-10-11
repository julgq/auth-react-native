import React, { Component } from 'react';
import { Text } from 'react-native'
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common'

class LoginForm extends Component {
  state = { email: '', password: '', error: '', loading: false };

  // Button Login Action
  onButtonPress(){
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    // Login with email and password on firebase
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(this.onLoginSuccess.bind(this))
    .catch(()=> {
      // If login is fail, then try yo create and new account
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(this.onLoginSuccess.bind(this))
        .catch(this.onLoginFail.bind(this));

    });
  }

onLoginSuccess(){
  this.setState({
    email: '',
    password: '',
    loading: false,
    error: ''
  });
}

onLoginFail(){
  this.setState({
    error: 'Authentication Failed', loading: false});
}

  renderButton(){
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
      Log in
      </Button>
    );
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
          {this.renderButton()}
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
