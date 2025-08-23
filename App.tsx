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

type Screen = 'menu' | 'webview' | 'game' | 'settings';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [currentScreen, setCurrentScreen] = useState<Screen>('menu');

  const handleNewGame = () => {
    setCurrentScreen('webview');
  };

  const handleSettings = () => {
    setCurrentScreen('settings');
  };

  const handleBackToMenu = () => {
    setCurrentScreen('menu');
  };

  const handleWebViewClose = () => {
    setCurrentScreen('game');
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.container}>
        {currentScreen === 'menu' ? (
          <GameMenu onNewGame={handleNewGame} onSettings={handleSettings} />
        ) : currentScreen === 'webview' ? (
          <WebViewScreen onClose={handleWebViewClose} />
        ) : currentScreen === 'game' ? (
          <GameScreen onBackToMenu={handleBackToMenu} />
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
