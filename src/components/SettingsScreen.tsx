import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  ScrollView,
  Dimensions,
} from 'react-native';

interface SettingsScreenProps {
  onBackToMenu: () => void;
}

const { width, height } = Dimensions.get('window');

const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBackToMenu }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [showHints, setShowHints] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBackToMenu}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Game Settings</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Sound Effects</Text>
              <Text style={styles.settingDescription}>Play sound effects during the quiz</Text>
            </View>
            <Switch
              value={soundEnabled}
              onValueChange={setSoundEnabled}
              trackColor={{ false: '#767577', true: '#e94560' }}
              thumbColor={soundEnabled ? '#ffffff' : '#f4f3f4'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Vibration</Text>
              <Text style={styles.settingDescription}>Vibrate on answer selection</Text>
            </View>
            <Switch
              value={vibrationEnabled}
              onValueChange={setVibrationEnabled}
              trackColor={{ false: '#767577', true: '#e94560' }}
              thumbColor={vibrationEnabled ? '#ffffff' : '#f4f3f4'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Show Hints</Text>
              <Text style={styles.settingDescription}>Display helpful hints during questions</Text>
            </View>
            <Switch
              value={showHints}
              onValueChange={setShowHints}
              trackColor={{ false: '#767577', true: '#e94560' }}
              thumbColor={showHints ? '#ffffff' : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Dark Mode</Text>
              <Text style={styles.settingDescription}>Use dark theme for better visibility</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#767577', true: '#e94560' }}
              thumbColor={darkMode ? '#ffffff' : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <View style={styles.aboutItem}>
            <Text style={styles.aboutLabel}>Version</Text>
            <Text style={styles.aboutValue}>1.0.0</Text>
          </View>
          
          <View style={styles.aboutItem}>
            <Text style={styles.aboutLabel}>Questions</Text>
            <Text style={styles.aboutValue}>11</Text>
          </View>
          
          <View style={styles.aboutItem}>
            <Text style={styles.aboutLabel}>Aircraft Types</Text>
            <Text style={styles.aboutValue}>10</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <TouchableOpacity style={styles.supportButton}>
            <Text style={styles.supportButtonText}>Rate the App</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.supportButton}>
            <Text style={styles.supportButtonText}>Send Feedback</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.supportButton}>
            <Text style={styles.supportButtonText}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#0f3460',
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
    fontSize: 24,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 44,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 30,
  },
  sectionTitle: {
    color: '#e94560',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#0f3460',
  },
  settingInfo: {
    flex: 1,
    marginRight: 15,
  },
  settingLabel: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  settingDescription: {
    color: '#cccccc',
    fontSize: 14,
  },
  aboutItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#0f3460',
  },
  aboutLabel: {
    color: '#ffffff',
    fontSize: 16,
  },
  aboutValue: {
    color: '#e94560',
    fontSize: 16,
    fontWeight: 'bold',
  },
  supportButton: {
    backgroundColor: '#16213e',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#0f3460',
  },
  supportButtonText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default SettingsScreen;

