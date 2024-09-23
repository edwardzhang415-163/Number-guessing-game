// screens/GameScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../helpers/colors';
import Card from '../components/Card';
import Input from '../components/Input';

const GameScreen = ({ userInfo, onRestart}) => {
  const [gameState, setGameState] = useState('initial'); 
  const [targetNumber, setTargetNumber] = useState(null);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(4);
  const [timeLeft, setTimeLeft] = useState(60);
  const [message, setMessage] = useState('');
  const [hintUsed, setHintUsed] = useState(false);
  const [imageUri, setImageUri] = useState('');
  const lastDigit = parseInt(userInfo.phone.slice(-1));

  useEffect(() => {
    if (gameState === 'playing') {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            endGame('Time is up!');
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameState]);

  const startGame = () => {
    const possibleNumbers = [];
    for (let i = lastDigit; i <= 100; i += lastDigit) {
      possibleNumbers.push(i);
    }
    const randomIndex = Math.floor(Math.random() * possibleNumbers.length);
    setTargetNumber(possibleNumbers[randomIndex]);
    setGameState('playing');
    setAttempts(4);
    setTimeLeft(60);
    setMessage('');
    setHintUsed(false);
  };

  const handleGuess = () => {
    const guessNum = parseInt(guess);
    if (isNaN(guessNum) || guessNum < 1 || guessNum > 100) {
      Alert.alert('Invalid Input', 'Please enter a number between 1 and 100.');
      return;
    }

    setAttempts(attempts - 1);

    if (guessNum === targetNumber) {
      setGameState('success');
      setMessage(`You guessed correct! Attempts ${5 - attempts}`);
      setImageUri(`https://picsum.photos/id/${targetNumber}/100/100`);
      console.log({imageUri});
    } else if (attempts === 1) {
      endGame('You ran out of attempts!');
    } else {
      setMessage(guessNum < targetNumber ? 'Try higher!' : 'Try lower!');
    }

    setGuess('');
  };

  const useHint = () => {
    if (!hintUsed) {
      const hint = targetNumber % 2 === 0 ? 'even' : 'odd';
      setMessage(`Hint: The number is ${hint}.`);
      setHintUsed(true);
    }
  };
  
  const endGame = (endMessage) => {
    setGameState('over');
    setMessage(endMessage);
  };

  const handleNewGame = () => {
    setGameState('initial')
  };

  const renderGameContent = () => {
    switch (gameState) {
      case 'initial':
        return (
          <Card>
            <Text style={styles.text}>guess a number between 1 & 100.</Text>
            <Text style={styles.text}>that is mutltiply of {lastDigit} </Text>
            <Button title="Start" onPress={startGame} color={colors.primary} />
          </Card>
        );
      case 'playing':
        return (
            <Card style={styles.card}>
            <Text style={styles.text}>guess a number between 1 & 100.</Text>
            <Text style={styles.text}>that is mutltiply of {lastDigit} </Text>
            <Input placeholder="Enter your guess" value={guess} onChangeText={setGuess} keyboardType="numeric" />
            <Text style={styles.text}>Time left: {timeLeft}s</Text>
            <Text style={styles.text}>Attempts left: {attempts}</Text>
            <View style={styles.buttonContainer}>
              <Button title="Use a hint" onPress={useHint} disabled={hintUsed} color={colors.secondary} />
              <Button title="Submit guess" onPress={handleGuess} color={colors.primary} />
            </View>
            <Text style={styles.message}>{message}</Text>
            </Card>
        );
      case 'over':
        return (
            <Card style={styles.card}>
            <Text style={styles.text}>The game is over</Text>
            <Image
              source={require('../assets/sad-smiley.png')}
              style={styles.image}
            />
            <Text style={styles.message}>{message}</Text>
            <Button title="New Game" onPress={handleNewGame} color={colors.primary} />
            </Card>
        );
      case 'success':
        return (
            <Card style={styles.card}>
            <Text style={styles.text}>Congratulations!</Text>
            <Image
              source={{ uri: imageUri }}
              style={styles.image}
            />
            <Text style={styles.message}>{message}</Text>
            <Button title="New Game" onPress={handleNewGame} color={colors.primary} />
            </Card>            
        );
    }
  };

  return (
    <LinearGradient colors={[colors.background, colors.secondary]} style={styles.container}>
      <View style={styles.header}>
        <Button title="Restart" onPress={onRestart} color={colors.secondary} />
      </View>
      {renderGameContent()}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '100%', 
    flexDirection: 'row',
    justifyContent: 'flex-end', 
    padding: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  card: {
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: colors.primary,
    textAlign: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 20,
    
  },
});

export default GameScreen;