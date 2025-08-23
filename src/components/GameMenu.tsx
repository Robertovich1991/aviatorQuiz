import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';

interface GameMenuProps {
  onNewGame: () => void;
  onSettings: () => void;
}

const { width, height } = Dimensions.get('window');

const GameMenu: React.FC<GameMenuProps> = ({ onNewGame, onSettings }) => {
  return (
    <ImageBackground 
      source={require('../assets/images/planeBackground.png')}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>Aviation Juego Quiz</Text>
          <Text style={styles.subtitle}>Test your aviation knowledge!</Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onNewGame}>
              <Text style={styles.buttonText}>New Game</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.button, styles.settingsButton]} onPress={onSettings}>
              <Text style={styles.buttonText}>Settings</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(26, 26, 46, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    color: '#cccccc',
    textAlign: 'center',
    marginBottom: 60,
  },
  buttonContainer: {
    width: '100%',
    gap: 20,
  },
  button: {
    backgroundColor: '#e94560',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  settingsButton: {
    backgroundColor: '#0f3460',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default GameMenu;
