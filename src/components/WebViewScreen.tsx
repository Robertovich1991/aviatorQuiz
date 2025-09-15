import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { WebView } from 'react-native-webview';

interface WebViewScreenProps {
  onClose: () => void;
}

const WebViewScreen: React.FC<WebViewScreenProps> = ({ onClose }) => {
  const [showClose, setShowClose] = useState(false);

  const injectedJS = `
    window.onscroll = function() {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (scrollY >= height) {
        window.ReactNativeWebView.postMessage("bottom");
      }
    };
    true;
  `;

  const handleMessage = (event: any) => {
    if (event.nativeEvent.data === 'bottom') {
      setShowClose(true);
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://policymines.homes/' }}
        injectedJavaScript={injectedJS}
        onMessage={handleMessage}
        style={styles.webview}
      />
      {showClose && (
        <View style={styles.closeContainer}>
          <Text onPress={onClose} style={styles.closeText}>
            Close
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  webview: {
    flex: 1,
  },
  closeContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(26, 26, 46, 0.9)',
    borderTopWidth: 1,
    borderTopColor: '#0f3460',
  },
  closeText: {
    textAlign: 'center',
    padding: 15,
    backgroundColor: '#e94560',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default WebViewScreen;

