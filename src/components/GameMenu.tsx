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
  onNewGame: (level?: number) => void;
  onSettings: () => void;
  onLeaderboard: () => void;
}

const { width, height } = Dimensions.get('window');

const GameMenu: React.FC<GameMenuProps> = ({ onNewGame, onSettings, onLeaderboard }) => {
  return (
    <ImageBackground 
      source={require('../assets/images/planeBackground.png')}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>Aviation Juego Quiz</Text>
          <Text style={styles.subtitle}>Test your aviation knowledge!</Text>
          
          <View style={styles.levelContainer}>
            <Text style={styles.levelTitle}>Choose Difficulty Level:</Text>
            
            <TouchableOpacity 
              style={[styles.levelButton, styles.easyLevel]} 
              onPress={() => onNewGame(1)}
            >
              <Text style={styles.levelButtonText}>Level 1: Easy</Text>
              <Text style={styles.levelDescription}>8 questions • 10 points each</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.levelButton, styles.mediumLevel]} 
              onPress={() => onNewGame(2)}
            >
              <Text style={styles.levelButtonText}>Level 2: Medium</Text>
              <Text style={styles.levelDescription}>8 questions • 20 points each</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.levelButton, styles.hardLevel]} 
              onPress={() => onNewGame(3)}
            >
              <Text style={styles.levelButtonText}>Level 3: Hard</Text>
              <Text style={styles.levelDescription}>8 questions • 30 points each</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.levelButton, styles.allLevels]} 
              onPress={() => onNewGame()}
            >
              <Text style={styles.levelButtonText}>All Levels</Text>
              <Text style={styles.levelDescription}>24 questions • Mixed difficulty</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.leaderboardButton]} onPress={onLeaderboard}>
              <Text style={styles.buttonText}>Leaderboard</Text>
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
  levelContainer: {
    width: '100%',
    marginBottom: 30,
  },
  levelTitle: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  levelButton: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 15,
    marginVertical: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  easyLevel: {
    backgroundColor: '#4CAF50',
  },
  mediumLevel: {
    backgroundColor: '#FF9800',
  },
  hardLevel: {
    backgroundColor: '#F44336',
  },
  allLevels: {
    backgroundColor: '#9C27B0',
  },
  levelButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  levelDescription: {
    color: '#ffffff',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 4,
    opacity: 0.9,
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
  leaderboardButton: {
    backgroundColor: '#9C27B0',
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
