import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../helpers/colors';

const ConfirmScreen = ({ visible, userInfo, onGoBack, onContinue }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
    >
      <LinearGradient colors={[colors.fadeBackground, colors.fadeBackground]} style={styles.modalBackground}>
        <View style={styles.card}>
          <Text style={styles.title}>Confirm Your Information</Text>
          <Text>Name: {userInfo.name}</Text>
          <Text>Email: {userInfo.email}</Text>
          <Text>Phone: {userInfo.phone}</Text>
          <View style={styles.buttonContainer}>
            <Button title="Go Back" onPress={onGoBack} />
            <Button title="Continue" onPress={onContinue} />
          </View>
        </View>
      </LinearGradient>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default ConfirmScreen;