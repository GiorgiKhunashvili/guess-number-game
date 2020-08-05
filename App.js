import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';

export default function App() {
  const [userNumber, setUserNumber] = useState();

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  }

  let contnet = <StartGameScreen onStartGame={startGameHandler} />;

  if (userNumber) {
    contnet = <GameScreen userChoice={userNumber} />;
  }

  return (
    <View style={styles.container}>
      <Header title="Guess a Number" />
      {contnet}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
