import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
} from 'react-native';
import { PlayerDataManager } from '../data/playerData';

interface PlayerNameInputProps {
  onPlayerSelected: (playerName: string) => void;
  onBack: () => void;
}

const PlayerNameInput: React.FC<PlayerNameInputProps> = ({ onPlayerSelected, onBack }) => {
  const [playerName, setPlayerName] = useState('');
  const [recentPlayers, setRecentPlayers] = useState<string[]>([]);

  useEffect(() => {
    loadRecentPlayers();
  }, []);

  const loadRecentPlayers = async () => {
    try {
      const currentPlayer = await PlayerDataManager.getCurrentPlayer();
      if (currentPlayer) {
        setPlayerName(currentPlayer);
      }
      
      // Get recent players from game results
      const gameResults = await PlayerDataManager.getGameResults();
      const uniquePlayers = [...new Set(gameResults.map(result => result.playerName))];
      setRecentPlayers(uniquePlayers.slice(0, 5)); // Show last 5 players
    } catch (error) {
      console.error('Error loading recent players:', error);
    }
  };

  const handleSubmit = async () => {
    const trimmedName = playerName.trim();
    
    if (!trimmedName) {
      Alert.alert('Error', 'Please enter a player name');
      return;
    }

    if (trimmedName.length < 2) {
      Alert.alert('Error', 'Player name must be at least 2 characters long');
      return;
    }

    if (trimmedName.length > 20) {
      Alert.alert('Error', 'Player name must be less than 20 characters');
      return;
    }

    try {
      // Save as current player
      await PlayerDataManager.setCurrentPlayer(trimmedName);
      
      // Initialize player stats if new player
      await PlayerDataManager.getOrCreatePlayerStats(trimmedName);
      
      onPlayerSelected(trimmedName);
    } catch (error) {
      console.error('Error saving player name:', error);
      Alert.alert('Error', 'Failed to save player name. Please try again.');
    }
  };

  const selectRecentPlayer = (name: string) => {
    setPlayerName(name);
  };

  return (
    <ImageBackground 
      source={require('../assets/images/planeBackground.png')}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>Enter Player Name</Text>
          <Text style={styles.subtitle}>Choose your pilot name to track your progress!</Text>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value={playerName}
              onChangeText={setPlayerName}
              placeholder="Enter your name..."
              placeholderTextColor="#999"
              maxLength={20}
              autoCapitalize="words"
              autoCorrect={false}
              returnKeyType="done"
              onSubmitEditing={handleSubmit}
            />
          </View>

          {recentPlayers.length > 0 && (
            <View style={styles.recentPlayersContainer}>
              <Text style={styles.recentPlayersTitle}>Recent Players:</Text>
              {recentPlayers.map((name, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.recentPlayerButton}
                  onPress={() => selectRecentPlayer(name)}
                >
                  <Text style={styles.recentPlayerText}>{name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Start Game</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <Text style={styles.backButtonText}>Back to Menu</Text>
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
    width: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 30,
  },
  textInput: {
    backgroundColor: '#16213e',
    borderWidth: 2,
    borderColor: '#0f3460',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
  },
  recentPlayersContainer: {
    width: '100%',
    marginBottom: 30,
  },
  recentPlayersTitle: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: 'bold',
  },
  recentPlayerButton: {
    backgroundColor: '#0f3460',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  recentPlayerText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: 15,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backButton: {
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
  backButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PlayerNameInput;
