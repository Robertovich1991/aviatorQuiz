import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Alert,
} from 'react-native';
import { PlayerDataManager, LeaderboardEntry, PlayerStats } from '../data/playerData';

interface LeaderboardScreenProps {
  onBack: () => void;
  currentPlayer?: string;
}

const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ onBack, currentPlayer }) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [playerStats, setPlayerStats] = useState<PlayerStats | null>(null);
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'stats'>('leaderboard');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [leaderboardData, stats] = await Promise.all([
        PlayerDataManager.getLeaderboard(),
        currentPlayer ? PlayerDataManager.getPlayerStats(currentPlayer) : null,
      ]);
      
      setLeaderboard(leaderboardData);
      setPlayerStats(stats);
    } catch (error) {
      console.error('Error loading data:', error);
      Alert.alert('Error', 'Failed to load leaderboard data');
    } finally {
      setLoading(false);
    }
  };

  const getLevelText = (level: number) => {
    switch (level) {
      case 1: return 'Easy';
      case 2: return 'Medium';
      case 3: return 'Hard';
      default: return 'All Levels';
    }
  };

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1: return '#4CAF50';
      case 2: return '#FF9800';
      case 3: return '#F44336';
      default: return '#9C27B0';
    }
  };

  const renderLeaderboard = () => (
    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.leaderboardContainer}>
        {leaderboard.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No games played yet!</Text>
            <Text style={styles.emptyStateSubtext}>Be the first to set a record!</Text>
          </View>
        ) : (
          leaderboard.map((entry, index) => (
            <View
              key={index}
              style={[
                styles.leaderboardEntry,
                entry.playerName === currentPlayer && styles.currentPlayerEntry,
              ]}
            >
              <View style={styles.rankContainer}>
                <Text style={styles.rankText}>
                  {index < 3 ? ['🥇', '🥈', '🥉'][index] : `#${index + 1}`}
                </Text>
              </View>
              
              <View style={styles.playerInfo}>
                <Text style={[
                  styles.playerName,
                  entry.playerName === currentPlayer && styles.currentPlayerName,
                ]}>
                  {entry.playerName}
                  {entry.playerName === currentPlayer && ' (You)'}
                </Text>
                <Text style={styles.levelText}>
                  {getLevelText(entry.level)} • {entry.totalGamesPlayed} games
                </Text>
              </View>
              
              <View style={styles.scoreContainer}>
                <Text style={styles.scoreText}>{entry.bestScore}</Text>
                <Text style={styles.pointsText}>{entry.bestPoints} pts</Text>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );

  const renderPlayerStats = () => {
    if (!playerStats) {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No player selected</Text>
          <Text style={styles.emptyStateSubtext}>Start a game to see your stats!</Text>
        </View>
      );
    }

    return (
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.statsContainer}>
          {/* Overall Stats */}
          <View style={styles.statsSection}>
            <Text style={styles.sectionTitle}>Overall Performance</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{playerStats.totalGamesPlayed}</Text>
                <Text style={styles.statLabel}>Games Played</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{playerStats.totalCorrectAnswers}</Text>
                <Text style={styles.statLabel}>Correct Answers</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{playerStats.totalPointsEarned}</Text>
                <Text style={styles.statLabel}>Total Points</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{Math.round(playerStats.averageScore * 100)}%</Text>
                <Text style={styles.statLabel}>Average Score</Text>
              </View>
            </View>
          </View>

          {/* Best Scores */}
          <View style={styles.statsSection}>
            <Text style={styles.sectionTitle}>Best Scores</Text>
            <View style={styles.bestScoresContainer}>
              <View style={styles.bestScoreItem}>
                <Text style={styles.bestScoreValue}>{playerStats.bestScore}</Text>
                <Text style={styles.bestScoreLabel}>Best Score</Text>
              </View>
              <View style={styles.bestScoreItem}>
                <Text style={styles.bestScoreValue}>{playerStats.bestPoints}</Text>
                <Text style={styles.bestScoreLabel}>Best Points</Text>
              </View>
            </View>
          </View>

          {/* Level Stats */}
          <View style={styles.statsSection}>
            <Text style={styles.sectionTitle}>Level Performance</Text>
            {Object.entries(playerStats.levelStats).map(([level, stats]) => (
              <View key={level} style={styles.levelStatsContainer}>
                <Text style={styles.levelStatsTitle}>
                  {level === 'level1' ? 'Level 1 (Easy)' :
                   level === 'level2' ? 'Level 2 (Medium)' :
                   level === 'level3' ? 'Level 3 (Hard)' : 'All Levels'}
                </Text>
                <View style={styles.levelStatsGrid}>
                  <View style={styles.levelStatItem}>
                    <Text style={styles.levelStatValue}>{stats.gamesPlayed}</Text>
                    <Text style={styles.levelStatLabel}>Games</Text>
                  </View>
                  <View style={styles.levelStatItem}>
                    <Text style={styles.levelStatValue}>{stats.bestScore}</Text>
                    <Text style={styles.levelStatLabel}>Best Score</Text>
                  </View>
                  <View style={styles.levelStatItem}>
                    <Text style={styles.levelStatValue}>{stats.bestPoints}</Text>
                    <Text style={styles.levelStatLabel}>Best Points</Text>
                  </View>
                  <View style={styles.levelStatItem}>
                    <Text style={styles.levelStatValue}>{Math.round(stats.averageScore * 100)}%</Text>
                    <Text style={styles.levelStatLabel}>Average</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* Achievements */}
          {playerStats.achievements.length > 0 && (
            <View style={styles.statsSection}>
              <Text style={styles.sectionTitle}>Achievements</Text>
              <View style={styles.achievementsContainer}>
                {playerStats.achievements.map((achievement, index) => (
                  <View key={index} style={styles.achievementItem}>
                    <Text style={styles.achievementText}>
                      🏆 {PlayerDataManager.getAchievementDescription(achievement)}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    );
  };

  if (loading) {
    return (
      <ImageBackground 
        source={require('../assets/images/planeBackground.png')}
        style={styles.container}
      >
        <View style={styles.overlay}>
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground 
      source={require('../assets/images/planeBackground.png')}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Leaderboard & Stats</Text>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'leaderboard' && styles.activeTab]}
            onPress={() => setActiveTab('leaderboard')}
          >
            <Text style={[styles.tabText, activeTab === 'leaderboard' && styles.activeTabText]}>
              Leaderboard
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'stats' && styles.activeTab]}
            onPress={() => setActiveTab('stats')}
          >
            <Text style={[styles.tabText, activeTab === 'stats' && styles.activeTabText]}>
              My Stats
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'leaderboard' ? renderLeaderboard() : renderPlayerStats()}
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#e94560',
  },
  tabText: {
    color: '#cccccc',
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeTabText: {
    color: '#e94560',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 18,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptyStateSubtext: {
    color: '#cccccc',
    fontSize: 14,
    textAlign: 'center',
  },
  leaderboardContainer: {
    paddingBottom: 20,
  },
  leaderboardEntry: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16213e',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#0f3460',
  },
  currentPlayerEntry: {
    borderColor: '#4CAF50',
    backgroundColor: '#1a3a2e',
  },
  rankContainer: {
    width: 50,
    alignItems: 'center',
  },
  rankText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  playerInfo: {
    flex: 1,
    marginLeft: 15,
  },
  playerName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  currentPlayerName: {
    color: '#4CAF50',
  },
  levelText: {
    color: '#cccccc',
    fontSize: 12,
    marginTop: 2,
  },
  scoreContainer: {
    alignItems: 'flex-end',
  },
  scoreText: {
    color: '#e94560',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pointsText: {
    color: '#FFD700',
    fontSize: 12,
  },
  statsContainer: {
    paddingBottom: 20,
  },
  statsSection: {
    backgroundColor: '#16213e',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#0f3460',
  },
  sectionTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 15,
  },
  statValue: {
    color: '#e94560',
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#cccccc',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
  bestScoresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  bestScoreItem: {
    alignItems: 'center',
  },
  bestScoreValue: {
    color: '#4CAF50',
    fontSize: 32,
    fontWeight: 'bold',
  },
  bestScoreLabel: {
    color: '#cccccc',
    fontSize: 14,
    marginTop: 5,
  },
  levelStatsContainer: {
    marginBottom: 20,
  },
  levelStatsTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  levelStatsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  levelStatItem: {
    alignItems: 'center',
    flex: 1,
  },
  levelStatValue: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
  },
  levelStatLabel: {
    color: '#cccccc',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 2,
  },
  achievementsContainer: {
    gap: 10,
  },
  achievementItem: {
    backgroundColor: '#0f3460',
    padding: 10,
    borderRadius: 8,
  },
  achievementText: {
    color: '#ffffff',
    fontSize: 14,
  },
});

export default LeaderboardScreen;
