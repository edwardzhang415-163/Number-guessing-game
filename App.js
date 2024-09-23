import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import StartScreen from './Screen/StartScreen';
import ConfirmScreen from './Screen/ConfirmScreen';
import GameScreen from './Screen/GameScreen';

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
    setCurrentScreen('game'); 
  };

  const handleRestart = () => {
    setCurrentScreen('start');
    setUserInfo(null);
  };
  return (
    <>
      <StatusBar style="auto" />
      {currentScreen === 'start' && <StartScreen onRegister={handleRegister} />}
      {currentScreen === 'start' && isConfirmVisible == true && 
        < ConfirmScreen
          visible = {isConfirmVisible}
          userInfo={userInfo}
          onGoBack={handleGoBack}
          onContinue={handleContinue}
        />}
        {currentScreen === 'game' && (
        <GameScreen
          userInfo={userInfo}
          onRestart={handleRestart}
        />
      )}  
    </>
  );
}