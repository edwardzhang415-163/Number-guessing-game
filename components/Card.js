import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = ({ children, style }) => {
  return <View style={{ ...styles.card, ...style }}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    width: '90%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginBottom: 60,
    // alignItems: 'center',
  },
});

export default Card;