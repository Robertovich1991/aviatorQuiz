import AsyncStorage from '@react-native-async-storage/async-storage';

export interface GameResult {
  id: string;
  playerName: string;
  level: number;
  score: number;
  points: number;
  totalQuestions: number;
  maxPoints: number;
  percentage: number;
  date: string;
  timeSpent: number; // in seconds
}

export interface PlayerStats {
  playerName: string;
  totalGamesPlayed: number;
  totalQuestionsAnswered: number;
  totalCorrectAnswers: number;
  totalPointsEarned: number;
  bestScore: number;
  bestPoints: number;
  averageScore: number;
  averagePoints: number;
  levelStats: {
    level1: { gamesPlayed: number; bestScore: number; bestPoints: number; averageScore: number };
    level2: { gamesPlayed: number; bestScore: number; bestPoints: number; averageScore: number };
    level3: { gamesPlayed: number; bestScore: number; bestPoints: number; averageScore: number };
    allLevels: { gamesPlayed: number; bestScore: number; bestPoints: number; averageScore: number };
  };
  achievements: string[];
  lastPlayed: string;
}

export interface LeaderboardEntry {
  playerName: string;
  bestScore: number;
  bestPoints: number;
  totalGamesPlayed: number;
  level: number;
  date: string;
}

// Storage keys
const STORAGE_KEYS = {
  GAME_RESULTS: 'game_results',
  PLAYER_STATS: 'player_stats',
  LEADERBOARD: 'leaderboard',
  CURRENT_PLAYER: 'current_player',
};

// Player Data Manager Class
export class PlayerDataManager {
  // Save game result
  static async saveGameResult(result: GameResult): Promise<void> {
    try {
      const existingResults = await this.getGameResults();
      const updatedResults = [...existingResults, result];
      await AsyncStorage.setItem(STORAGE_KEYS.GAME_RESULTS, JSON.stringify(updatedResults));
      
      // Update player stats
      await this.updatePlayerStats(result);
      
      // Update leaderboard
      await this.updateLeaderboard(result);
    } catch (error) {
      console.error('Error saving game result:', error);
    }
  }

  // Get all game results
  static async getGameResults(): Promise<GameResult[]> {
    try {
      const results = await AsyncStorage.getItem(STORAGE_KEYS.GAME_RESULTS);
      return results ? JSON.parse(results) : [];
    } catch (error) {
      console.error('Error getting game results:', error);
      return [];
    }
  }

  // Get game results for specific player
  static async getPlayerGameResults(playerName: string): Promise<GameResult[]> {
    try {
      const allResults = await this.getGameResults();
      return allResults.filter(result => result.playerName === playerName);
    } catch (error) {
      console.error('Error getting player game results:', error);
      return [];
    }
  }

  // Update player statistics
  static async updatePlayerStats(result: GameResult): Promise<void> {
    try {
      const existingStats = await this.getPlayerStats(result.playerName);
      const updatedStats = await this.calculateUpdatedStats(existingStats, result);
      await AsyncStorage.setItem(
        `${STORAGE_KEYS.PLAYER_STATS}_${result.playerName}`, 
        JSON.stringify(updatedStats)
      );
    } catch (error) {
      console.error('Error updating player stats:', error);
    }
  }

  // Get player statistics
  static async getPlayerStats(playerName: string): Promise<PlayerStats | null> {
    try {
      const stats = await AsyncStorage.getItem(`${STORAGE_KEYS.PLAYER_STATS}_${playerName}`);
      return stats ? JSON.parse(stats) : null;
    } catch (error) {
      console.error('Error getting player stats:', error);
      return null;
    }
  }

  // Get or create player stats
  static async getOrCreatePlayerStats(playerName: string): Promise<PlayerStats> {
    const existingStats = await this.getPlayerStats(playerName);
    if (existingStats) {
      return existingStats;
    }

    // Create new player stats
    const newStats: PlayerStats = {
      playerName,
      totalGamesPlayed: 0,
      totalQuestionsAnswered: 0,
      totalCorrectAnswers: 0,
      totalPointsEarned: 0,
      bestScore: 0,
      bestPoints: 0,
      averageScore: 0,
      averagePoints: 0,
      levelStats: {
        level1: { gamesPlayed: 0, bestScore: 0, bestPoints: 0, averageScore: 0 },
        level2: { gamesPlayed: 0, bestScore: 0, bestPoints: 0, averageScore: 0 },
        level3: { gamesPlayed: 0, bestScore: 0, bestPoints: 0, averageScore: 0 },
        allLevels: { gamesPlayed: 0, bestScore: 0, bestPoints: 0, averageScore: 0 },
      },
      achievements: [],
      lastPlayed: new Date().toISOString(),
    };

    await AsyncStorage.setItem(
      `${STORAGE_KEYS.PLAYER_STATS}_${playerName}`, 
      JSON.stringify(newStats)
    );

    return newStats;
  }

  // Calculate updated stats
  private static async calculateUpdatedStats(existingStats: PlayerStats | null, result: GameResult): Promise<PlayerStats> {
    if (!existingStats) {
      return await this.getOrCreatePlayerStats(result.playerName);
    }

    const updatedStats = { ...existingStats };
    
    // Update basic stats
    updatedStats.totalGamesPlayed += 1;
    updatedStats.totalQuestionsAnswered += result.totalQuestions;
    updatedStats.totalCorrectAnswers += result.score;
    updatedStats.totalPointsEarned += result.points;
    updatedStats.lastPlayed = result.date;

    // Update best scores
    if (result.score > updatedStats.bestScore) {
      updatedStats.bestScore = result.score;
    }
    if (result.points > updatedStats.bestPoints) {
      updatedStats.bestPoints = result.points;
    }

    // Update averages
    updatedStats.averageScore = updatedStats.totalCorrectAnswers / updatedStats.totalQuestionsAnswered;
    updatedStats.averagePoints = updatedStats.totalPointsEarned / updatedStats.totalGamesPlayed;

    // Update level-specific stats
    const levelKey = result.level === 0 ? 'allLevels' : `level${result.level}` as keyof typeof updatedStats.levelStats;
    const levelStats = updatedStats.levelStats[levelKey];
    
    levelStats.gamesPlayed += 1;
    if (result.score > levelStats.bestScore) {
      levelStats.bestScore = result.score;
    }
    if (result.points > levelStats.bestPoints) {
      levelStats.bestPoints = result.points;
    }
    levelStats.averageScore = (levelStats.averageScore * (levelStats.gamesPlayed - 1) + result.score) / levelStats.gamesPlayed;

    // Check for achievements
    updatedStats.achievements = this.checkAchievements(updatedStats, result);

    return updatedStats;
  }

  // Check for new achievements
  private static checkAchievements(stats: PlayerStats, result: GameResult): string[] {
    const achievements = [...stats.achievements];
    const newAchievements: string[] = [];

    // First game
    if (stats.totalGamesPlayed === 1 && !achievements.includes('first_game')) {
      newAchievements.push('first_game');
    }

    // Perfect score
    if (result.percentage === 100 && !achievements.includes('perfect_score')) {
      newAchievements.push('perfect_score');
    }

    // High score achievements
    if (result.percentage >= 90 && !achievements.includes('expert_pilot')) {
      newAchievements.push('expert_pilot');
    }

    // Level-specific achievements
    if (result.level === 1 && result.percentage >= 80 && !achievements.includes('level1_master')) {
      newAchievements.push('level1_master');
    }
    if (result.level === 2 && result.percentage >= 80 && !achievements.includes('level2_master')) {
      newAchievements.push('level2_master');
    }
    if (result.level === 3 && result.percentage >= 80 && !achievements.includes('level3_master')) {
      newAchievements.push('level3_master');
    }

    // Streak achievements
    if (stats.totalGamesPlayed >= 10 && !achievements.includes('dedicated_pilot')) {
      newAchievements.push('dedicated_pilot');
    }
    if (stats.totalGamesPlayed >= 50 && !achievements.includes('aviation_enthusiast')) {
      newAchievements.push('aviation_enthusiast');
    }

    return [...achievements, ...newAchievements];
  }

  // Update leaderboard
  static async updateLeaderboard(result: GameResult): Promise<void> {
    try {
      const existingLeaderboard = await this.getLeaderboard();
      const playerEntry = existingLeaderboard.find(entry => entry.playerName === result.playerName);
      
      if (playerEntry) {
        // Update existing entry if this is a better score
        if (result.score > playerEntry.bestScore || 
            (result.score === playerEntry.bestScore && result.points > playerEntry.bestPoints)) {
          playerEntry.bestScore = result.score;
          playerEntry.bestPoints = result.points;
          playerEntry.date = result.date;
        }
        playerEntry.totalGamesPlayed += 1;
      } else {
        // Add new entry
        existingLeaderboard.push({
          playerName: result.playerName,
          bestScore: result.score,
          bestPoints: result.points,
          totalGamesPlayed: 1,
          level: result.level,
          date: result.date,
        });
      }

      // Sort leaderboard by best score, then by best points
      existingLeaderboard.sort((a, b) => {
        if (b.bestScore !== a.bestScore) {
          return b.bestScore - a.bestScore;
        }
        return b.bestPoints - a.bestPoints;
      });

      // Keep only top 50 entries
      const topEntries = existingLeaderboard.slice(0, 50);
      
      await AsyncStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(topEntries));
    } catch (error) {
      console.error('Error updating leaderboard:', error);
    }
  }

  // Get leaderboard
  static async getLeaderboard(): Promise<LeaderboardEntry[]> {
    try {
      const leaderboard = await AsyncStorage.getItem(STORAGE_KEYS.LEADERBOARD);
      return leaderboard ? JSON.parse(leaderboard) : [];
    } catch (error) {
      console.error('Error getting leaderboard:', error);
      return [];
    }
  }

  // Set current player
  static async setCurrentPlayer(playerName: string): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.CURRENT_PLAYER, playerName);
    } catch (error) {
      console.error('Error setting current player:', error);
    }
  }

  // Get current player
  static async getCurrentPlayer(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.CURRENT_PLAYER);
    } catch (error) {
      console.error('Error getting current player:', error);
      return null;
    }
  }

  // Clear all data (for testing/reset)
  static async clearAllData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.GAME_RESULTS,
        STORAGE_KEYS.LEADERBOARD,
        STORAGE_KEYS.CURRENT_PLAYER,
      ]);
      
      // Clear all player stats
      const keys = await AsyncStorage.getAllKeys();
      const playerStatsKeys = keys.filter(key => key.startsWith(STORAGE_KEYS.PLAYER_STATS));
      if (playerStatsKeys.length > 0) {
        await AsyncStorage.multiRemove(playerStatsKeys);
      }
    } catch (error) {
      console.error('Error clearing all data:', error);
    }
  }

  // Get achievement descriptions
  static getAchievementDescription(achievement: string): string {
    const descriptions: { [key: string]: string } = {
      'first_game': 'First Flight - Completed your first quiz!',
      'perfect_score': 'Perfect Landing - Got 100% on a quiz!',
      'expert_pilot': 'Expert Pilot - Scored 90% or higher!',
      'level1_master': 'Level 1 Master - Mastered the easy level!',
      'level2_master': 'Level 2 Master - Mastered the medium level!',
      'level3_master': 'Level 3 Master - Mastered the hard level!',
      'dedicated_pilot': 'Dedicated Pilot - Played 10+ games!',
      'aviation_enthusiast': 'Aviation Enthusiast - Played 50+ games!',
    };
    return descriptions[achievement] || achievement;
  }
}
