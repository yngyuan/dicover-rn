import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import Spacer from './Spacer';

const AuthForm = ({ props, headerText, errorMessage, onSubmit, submitButtonText }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const isSignUp = (submitButtonText === "Sign Up");
  const nameBlock = (
  <Input
    label="Name"
    value={name}
    onChangeText={setName}
    autoCapitalize="none"
    autoCorrect={false}
  />);
  return (
    <>
      <Spacer>
        <Text h3>{headerText}</Text>
      </Spacer>
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {(isSignUp? nameBlock : null)}
      <Input
        secureTextEntry
        label="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
      <Spacer>
        <Button
          title={submitButtonText}
          onPress={() => {
            isSignUp ? onSubmit({email, name, password}) :onSubmit({ props, email, password })
          }}
        />
      </Spacer>
    </>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginTop: 15
  }
});

export default AuthForm;
