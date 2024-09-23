

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Checkbox from 'expo-checkbox';
import { colors } from '../helpers/colors';

const StartScreen = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  

  const validateName = (text) => {
    if (text.length <= 1 || /\d/.test(text)) {
      setNameError('Name must be non-numeric and more than 1 character');
    } else {
      setNameError('');
    }
    setName(text);
  };

  const validateEmail = (text) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(text)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
    setEmail(text);
  };

  const validatePhone = (text) => { 
    if (text.length !== 10 || !/^\d+$/.test(text) || ['0', '1'].includes(text[9])) {
      setPhoneError('Phone must be 10 digits and not end with 0 or 1');
    } else {
      setPhoneError('');
    }
    setPhone(text);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setIsChecked(false);
    setNameError('');
    setEmailError('');
    setPhoneError('');
  };

  const handleRegister = () => {
    if (name && email && phone && isChecked && !nameError && !emailError && !phoneError) {
      onRegister({ name, email, phone });
    } else {
      Alert.alert('Invalid Input', 'Please fill all fields correctly and accept the terms.');
    }
  };

  return (
    <LinearGradient colors={[colors.background, colors.secondary]} style={styles.container}>
      <Text style={styles.welcomeHeader}>Welcome</Text>
      <View style={styles.card}>
        <Text style={styles.title}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={validateName}
        />
        {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={validateEmail}
          keyboardType="email-address"
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={phone}
          onChangeText={validatePhone}
          keyboardType="name-phone-pad"
        />
        {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? colors.primary : undefined}
          />
          <Text style={styles.label}>I am not a robot</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Reset" onPress={handleReset} color={colors.secondary} />
          <Button title="Register" onPress={handleRegister} disabled={!isChecked} color={colors.primary} />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
    padding: 20,
    width: '80%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  errorText: {
    color: colors.error,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  label: {
    margin: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  welcomeHeader: {  // Added style for welcome header
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: -120,
    marginBottom: 120,
  },
});

export default StartScreen;
