/**
 * Aviation Juego Quiz App
 * A React Native quiz game about aviation
 */

import React, { useState } from 'react';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import GameMenu from './src/components/GameMenu';
import GameScreen from './src/components/GameScreen';
import SettingsScreen from './src/components/SettingsScreen';
import WebViewScreen from './src/components/WebViewScreen';
import PlayerNameInput from './src/components/PlayerNameInput';
import LeaderboardScreen from './src/components/LeaderboardScreen';

type Screen = 'menu' | 'webview' | 'game' | 'settings' | 'playerName' | 'leaderboard';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [currentScreen, setCurrentScreen] = useState<Screen>('menu');
  const [selectedLevel, setSelectedLevel] = useState<number | undefined>(undefined);
  const [currentPlayer, setCurrentPlayer] = useState<string>('');

  const handleNewGame = (level?: number) => {
    setSelectedLevel(level);
    setCurrentScreen('playerName');
  };

  const handleSettings = () => {
    setCurrentScreen('settings');
  };

  const handleLeaderboard = () => {
    setCurrentScreen('leaderboard');
  };

  const handleBackToMenu = () => {
    setCurrentScreen('menu');
  };

  const handlePlayerSelected = (playerName: string) => {
    setCurrentPlayer(playerName);
    setCurrentScreen('webview');
  };

  const handleWebViewClose = () => {
    setCurrentScreen('game');
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.container}>
        {currentScreen === 'menu' ? (
          <GameMenu onNewGame={handleNewGame} onSettings={handleSettings} onLeaderboard={handleLeaderboard} />
        ) : currentScreen === 'playerName' ? (
          <PlayerNameInput onPlayerSelected={handlePlayerSelected} onBack={handleBackToMenu} />
        ) : currentScreen === 'webview' ? (
          <WebViewScreen onClose={handleWebViewClose} />
        ) : currentScreen === 'game' ? (
          <GameScreen onBackToMenu={handleBackToMenu} selectedLevel={selectedLevel} playerName={currentPlayer} />
        ) : currentScreen === 'leaderboard' ? (
          <LeaderboardScreen onBack={handleBackToMenu} currentPlayer={currentPlayer} />
        ) : (
          <SettingsScreen onBackToMenu={handleBackToMenu} />
        )}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
