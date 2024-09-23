import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import StartScreen from './screens/StartScreen';
import ConfirmScreen from './screens/ConfirmScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('start');
  const [userInfo, setUserInfo] = useState(null);
  const [isConfirmVisible, setConfirmVisible] = useState(false);

  const handleRegister = (info) => {
    setUserInfo(info);
    setConfirmVisible(true);
  };

  const handleGoBack = () => {
    setConfirmVisible(false);
    setCurrentScreen('start');
  };

  const handleContinue = () => {
    setConfirmVisible(false);
    setCurrentScreen('game'); // Assuming you will add the game screen later
  };

  return (
    <>
      <StatusBar style="auto" />
      {currentScreen === 'start' && <StartScreen onRegister={handleRegister} />}
      {currentScreen === 'game' && <StartScreen onRegister={handleRegister} />}
      {currentScreen === 'start' && isConfirmVisible == true && 
        < ConfirmScreen
          visible = {isConfirmVisible}
          userInfo={userInfo}
          onGoBack={handleGoBack}
          onContinue={handleContinue}
        />}
    </>
  );
}